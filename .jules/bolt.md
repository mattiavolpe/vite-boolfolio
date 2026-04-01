
## 2024-04-01 - Global Scroll Listeners in Vue SPAs
**Learning:** Attaching a scroll event listener directly to `window` inside a component's `mounted` hook without removing it in `unmounted` creates a memory leak and continues executing the callback on irrelevant routes. In addition, performing unthrottled DOM layout measurements (like `getClientRects()`) on scroll causes layout thrashing and blocks the main thread.
**Action:** Always clean up global event listeners in the component's unmount hooks. Always throttle layout measurements tied to scroll events using `requestAnimationFrame` and specify `{ passive: true }` to optimize scrolling performance.
