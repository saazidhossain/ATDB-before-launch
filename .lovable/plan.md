# Hero performance & polish — top 1% production grade

Focused on the three asks (responsive sources, lazy playback, preload + headers) plus the small polish items needed to truly hit production grade.

## 1. Responsive image & video source sets

**Stills (`HeroMedia.tsx`)**
- Pre-generate three widths per WebP still (`-768.webp`, `-1280.webp`, `-1920.webp`) using `sharp` in a one-shot script written to `/tmp` and outputting to `public/assets/hero/`.
- Render each `<img>` with `srcSet` + `sizes="100vw"` so a phone pulls ~80 KB instead of ~400 KB.
- Keep the existing single-file paths as the `src` fallback.

**Videos**
- Add a 720p variant of each clip (`-720.webm` / `-720.mp4`, ~350 kbps VP9 / ~500 kbps H.264) alongside the current 1080p.
- In `<video>`, order `<source>` tags by `media`:
  - `media="(max-width: 768px)"` → 720p webm, then 720p mp4
  - default → existing 1080p webm, then mp4
- Re-encode posters as ~1280-wide JPEGs (current ones are already small but verify <60 KB).

## 2. Viewport-gated (lazy) video playback

- Add an `IntersectionObserver` in `HeroMedia` watching the hero root.
- Track `inView` state. Videos only `play()` when `inView && active && !reduced && !lite`.
- When the hero scrolls out, `pause()` all videos and clear the rotation timer; resume on re-entry. Saves CPU + battery on long pages.
- Combine with existing "active ± 1" mount window so off-screen slides also stay unmounted.

## 3. Preload, autoplay, caching headers

**Component-level**
- Keep `preload="metadata"` for the active video; switch the neighbor (active+1) to `preload="none"` until it becomes active. This eliminates one wasted metadata fetch per cycle.
- Add `muted` + `playsInline` (already present) and a one-time silent `.play().catch()` retry on the `loadedmetadata` event for stricter mobile autoplay policies.
- Add a `<link rel="preload" as="image" imagesrcset=… imagesizes="100vw" href=…>` in `index.html` for the LCP poster only — eager hint, no JS dependency.

**`public/_headers`**
- Keep `Cache-Control: public, max-age=31536000, immutable` on `/videos/*` and `/assets/*`.
- Already sends `Accept-Ranges: bytes`; explicitly document this so range requests work for `<video>` seek/scan.
- Add `Vary: Accept-Encoding` on `/assets/*` and a short `stale-while-revalidate` on the HTML shell (`/*` block) so updates roll out without breaking the cache benefit.

## 4. Verification

- Re-run the existing `playwright` visual smoke + a fresh DevTools network audit (manually) to confirm:
  - Mobile pulls only the 720p webm and a single ~80 KB poster
  - Desktop still gets 1080p with smooth crossfade
  - Scrolling past the hero halts video network activity
- Check `prefers-reduced-motion` and lite-path branches still short-circuit before any video network request.

## Files touched

- `src/components/home/HeroMedia.tsx` — IO gating, srcSet/sizes, multi-source `<video>`, smarter preload state machine.
- `index.html` — single LCP `<link rel="preload">` for the hero poster.
- `public/_headers` — document range support, add `Vary` and SWR for HTML.
- `public/assets/hero/*` (new) — responsive WebP variants generated via a `/tmp/gen-hero.mjs` sharp script.
- `public/videos/*-720.{webm,mp4}` (new) — 720p variants via `ffmpeg`.

No design, copy, routing, or business-logic changes. Lite-path + reduced-motion behavior preserved.
