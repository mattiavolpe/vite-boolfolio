## 2024-05-24 - Unthrottled Global Scroll Listeners
**Learning:** This codebase uses global scroll event listeners with expensive layout calculations (`getClientRects()`) that can cause severe main thread blocking and layout thrashing.
**Action:** Always use `requestAnimationFrame` for throttling scroll handlers, `{ passive: true }` to avoid blocking scrolling, and `getBoundingClientRect()` over `getClientRects()[0]`. Remember to clean up the listener and cancel the animation frame in the `unmounted` hook.
