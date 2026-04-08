## 2024-05-18 - Throttling Scroll Event Listeners in Vue Applications

**Learning:** Unthrottled global scroll event listeners that perform DOM measurements (like `getBoundingClientRect()`) cause severe layout thrashing and performance degradation by interrupting the browser's main thread on every scroll tick. Failing to remove these global listeners during a Vue component's teardown (`unmounted` hook) results in memory leaks and unnecessary processing on other routes.

**Action:** Always throttle scroll listeners using `requestAnimationFrame` to sync execution with the browser's paint cycle. Store the frame ID and any ticking state in `created()` as non-reactive properties. Register the listener with `{ passive: true }` in `mounted()`. Always call `removeEventListener` and `cancelAnimationFrame` in the `unmounted()` hook. Also, use `getBoundingClientRect()` over `getClientRects()[0]` to prevent crashes if the element is not rendered.
