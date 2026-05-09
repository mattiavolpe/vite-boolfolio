## 2024-05-09 - Throttle Scroll Events with requestAnimationFrame
**Learning:** Found an inline scroll event listener in `src/views/AppHome.vue` that fires synchronously on every scroll frame without any throttling or passive flag, which can block the main thread.
**Action:** Use `requestAnimationFrame` to decouple DOM reads/updates from raw scroll events, use `{ passive: true }` when attaching the listener, and ensure proper cleanup in `unmounted`.
