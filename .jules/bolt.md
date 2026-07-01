## 2024-05-24 - Throttled Scroll Listeners
**Learning:** The home page had an unthrottled `scroll` event listener in `AppHome.vue` that fired on every pixel scrolled, unnecessarily calculating positions and manipulating the DOM on every tick. This causes jank during scrolling.
**Action:** Always wrap high-frequency events like `scroll` or `mousemove` in `requestAnimationFrame` for performance throttling, use `{ passive: true }` so the browser does not block scrolling, and be sure to add cleanup logic in the `unmounted()` hook to prevent memory leaks during navigation.
