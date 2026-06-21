type ProbeSet = { fallbacks: readonly string[]; original: string };

const BYPASS = 'cbr=debait';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_start',
  allFrames: true,
  main() {
    const THUMB_RE =
      /^https?:\/\/i\d?\.ytimg\.com\/(?:vi|vi_webp)\/([A-Za-z0-9_-]{11})\//;

    const REGULAR: ProbeSet = { fallbacks: ['hq1.jpg', 'mq1.jpg'], original: 'hqdefault.jpg' };
    const SHORTS: ProbeSet = { fallbacks: ['oar2.jpg', 'oar3.jpg'], original: 'oardefault.jpg' };

    const MIN_REAL_WIDTH = 200;
    const inFlight = new WeakSet<HTMLImageElement>();

    const idOf = (src: string) => THUMB_RE.exec(src)?.[1];

    function isResult(src: string): boolean {
      return src.includes(BYPASS) || /\/(?:hq720_|hq|mq|oar)[123]\.jpg/.test(src);
    }

    function probeOne(url: string): Promise<string | null> {
      return new Promise((resolve) => {
        const test = new Image();
        test.onload = () => resolve(test.naturalWidth >= MIN_REAL_WIDTH ? url : null);
        test.onerror = () => resolve(null);
        test.src = url;
      });
    }

    async function recover(id: string, set: ProbeSet): Promise<string> {
      const base = `https://i.ytimg.com/vi/${id}/`;
      const hits = await Promise.all(set.fallbacks.map((f) => probeOne(base + f)));
      return hits.find((u): u is string => u !== null) ?? `${base}${set.original}?${BYPASS}`;
    }

    async function handle(img: HTMLImageElement) {
      const src = img.currentSrc || img.src;
      const id = idOf(src);
      if (!id || isResult(src) || inFlight.has(img)) return;
      if (img.complete && img.naturalWidth >= MIN_REAL_WIDTH) return;
      img.style.removeProperty('visibility');
      inFlight.add(img);
      try {
        await img.decode().catch(() => {});
        if (img.naturalWidth >= MIN_REAL_WIDTH) return;
        const sameId = () => idOf(img.currentSrc || img.src) === id;
        if (!sameId()) return;
        const set = /\/oar(?:default|[123])\./.test(src) ? SHORTS : REGULAR;
        const url = await recover(id, set);
        if (!sameId()) return;
        img.removeAttribute('srcset');
        img.addEventListener(
          'load',
          () => img.style.setProperty('visibility', 'visible', 'important'),
          { once: true },
        );
        img.src = url;
      } finally {
        inFlight.delete(img);
      }
    }

    function scan(root: ParentNode | Element) {
      if (root instanceof HTMLImageElement) {
        handle(root);
        return;
      }
      root.querySelectorAll?.('img').forEach((el) => handle(el));
    }

    new MutationObserver((muts) => {
      for (const mu of muts) {
        if (mu.type === 'attributes') {
          if (mu.target instanceof HTMLImageElement) handle(mu.target);
        } else {
          mu.addedNodes.forEach((n) => {
            if (n instanceof Element) scan(n);
          });
        }
      }
    }).observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['src'],
    });

    scan(document);
    document.addEventListener('DOMContentLoaded', () => scan(document), { once: true });
    window.addEventListener('yt-navigate-finish', () => scan(document));
  },
});
