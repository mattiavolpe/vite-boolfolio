
## 2024-05-28 - Optimizing Global Scroll Listeners in Vue SPAs
**Learning:** Attaching a global `window` scroll listener inside a Vue component's `mounted` hook without removing it in `unmounted` creates severe memory leaks and background processing overhead when users navigate to other routes. Additionally, calling layout-thrashing methods like `getClientRects()` on multiple DOM elements synchronously inside the scroll event blocks the main thread, severely degrading scroll performance.
**Action:** Always clean up global event listeners in `unmounted` (or `beforeUnmount`). Furthermore, when performing expensive DOM measurements inside high-frequency events like scrolling, always throttle the execution using `requestAnimationFrame` to sync the measurements with the browser's paint cycle.
