# DeBait — console snippets

Handy DevTools console snippets for testing and comparing. Open the YouTube
tab, press F12 (or Cmd+Opt+I), go to the **Console**, paste, and run.

DeBait swaps thumbnails at the network layer (DNR redirects the main thumbnail
to the frame), so the `<img>` `src` in the DOM is still the *original* URL — the
redirect is transparent. To see originals you append `?cbr=debait`, the bypass
that DNR rule #3 lets through.

YouTube thumbnail variants for a video id, for reference:

| file                | what it is                                  | size      |
| ------------------- | ------------------------------------------- | --------- |
| `hqdefault.jpg`     | channel's displayed thumbnail (the "bait")  | 480×360   |
| `maxresdefault.jpg` | same, full res (HD only — may 404)          | ≤1280×720 |
| `hq720_1.jpg`       | regular-video frame #1 (DNR target)         | 1280×720  |
| `oar1.jpg`          | Shorts frame #1 (DNR target for Shorts)     | 1920×1080 |
| `hq1.jpg` / `mq1.jpg`| lower-res frame #1 (recovery fallbacks)    | 480 / 320 |

## Show the original (un-baited) thumbnails

Appends `?cbr=debait` to whatever each thumbnail's `src` already is, which
bypasses the DNR redirect and loads the channel's original image. Works for both
regular videos and Shorts since it reuses the existing URL.

```js
document.querySelectorAll('img[src*="i.ytimg.com/vi/"]').forEach(i => {
  if (!i.src.includes('cbr=debait')) {
    i.removeAttribute('srcset');
    i.src += (i.src.includes('?') ? '&' : '?') + 'cbr=debait';
  }
});
```

## Back to de-baited

**Reload the page** — the DNR redirect re-applies to every fresh request. (There's
no in-place snippet for this: once an `<img>` is showing a `?cbr=debait` original,
its DOM `src` no longer maps cleanly back through the redirect.)

## Notes

- The "show originals" snippet only reaches thumbnails currently in the DOM;
  re-run it after scrolling.
- To see the whole feed un-baited the "real" way, disable DeBait at
  `chrome://extensions` / `about:addons` and reload, or use an Incognito/Private
  window where the extension isn't active.
