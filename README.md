# DeBait

Browser extension that replaces clickbait YouTube thumbnails with the real
first frame of the video. Works automatically after install — no popup, no
settings.

## How it works

YouTube exposes auto-generated frame grabs per video (sampled from the actual
footage) alongside the channel's displayed thumbnail. DeBait swaps the displayed
thumbnail for **auto-generated frame #1** entirely at the network layer, using a
static `declarativeNetRequest` ruleset ([public/rules.json](public/rules.json)).
The browser redirects the main thumbnail request to the frame *before it's
downloaded*, so the original (clickbait) image is **never fetched** and never
flashes:

- **Rule 1** — regular videos: `default|hqdefault|mqdefault|sddefault|hq720|maxresdefault`
  (incl. `_custom_N`, `.jpg`/`.webp`) → `hq720_1.jpg`, keeping the video id.
- **Rule 2** — Shorts: `oardefault.jpg` → `oar1.jpg`.
- **Rule 3** — `allow`s any URL containing `cbr=debait` (the recovery bypass).

Both browsers ship MV3 (Firefox built with `--mv3`, needs FF 128+ for static
rulesets) and both honor the redirect. Permissions are just
`declarativeNetRequestWithHostAccess` + `youtube.com`/`ytimg.com` host access —
host-scoped, no broad data-access warning.

### The content script is the frame-less safety net

DNR redirects *blindly* — it can't tell that a given video has no frame at the
target resolution (some live/short/old uploads), where the redirect would 404
into a broken image. The content script catches exactly that case, and nothing
else — healthy thumbnails are never hidden or touched, so the feed never blacks
out.

It does **not** trust YouTube's own `<img>` load/error events (the `ytCoreImage`
component manages its own state and races us). Instead it uses the thumbnail's
**`decode()` promise** — which resolves if the DNR-redirected frame loaded and
rejects if it 404'd. On rejection it recovers: probe the lower-res frames in
parallel (`hq1`/`mq1`, or `oar2`/`oar3` for Shorts), and if none exist, restore
the channel's original via a `?cbr=debait` URL that DNR rule #3 lets pass.

Note this means the content script relies on DNR for the actual swap — it only
fixes frame-less redirects. DNR is confirmed working on both browsers.

## Develop

```bash
npm install
npm run dev          # Chrome, live-reload
npm run dev:firefox  # Firefox, live-reload
```

## Build / package

```bash
npm run build          # Chrome  -> .output/chrome-mv3
npm run build:firefox  # Firefox -> .output/firefox-mv3
npm run zip            # zipped Chrome artifact for the Web Store
npm run zip:firefox    # zipped Firefox artifact for AMO
```

## Testing

To compare de-baited vs. original thumbnails on a live page, see
[docs/console-snippets.md](docs/console-snippets.md).

## Icons

Extension icons live in [public/icon/](public/icon/) at 16/32/48/96/128 px —
WXT auto-detects them and wires up `manifest.icons` for both browsers. They're
exported from the DeBait brand icon in Figma. To regenerate, re-export the icon
node and rasterize at each size (transparent corners, no background fill).

## Localization

The extension name and description are localized into 54 store locales. The
manifest references `__MSG_extName__` / `__MSG_extDescription__` with
`default_locale: 'en'`; the per-locale strings live in
[public/\_locales/](public/_locales/) (`<locale>/messages.json`, auto-shipped by
WXT). Longer Chrome Web Store / AMO listing copy (title + full description per
language) is in [docs/store-listings.md](docs/store-listings.md).

Both are generated from one source of truth,
[scripts/gen-i18n.mjs](scripts/gen-i18n.mjs) — edit the copy there and run
`node scripts/gen-i18n.mjs` to regenerate. The script enforces Chrome's 132-char
short-description limit. The store title carries SEO keywords (YouTube,
thumbnails, clickbait) while keeping the **DeBait** name; translations for less
common locales should be native-reviewed before submission.
