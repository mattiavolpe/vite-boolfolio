## 2025-02-17 - AppHome Scroll Listener
**Learning:** The `AppHome.vue` component had a global, unthrottled scroll event listener attached in the `mounted` hook that was blocking the main thread and lacked a cleanup in `unmounted`, leading to memory leaks and duplicate listeners on route changes.
**Action:** Always wrap global scroll listeners in `requestAnimationFrame`, apply the `{ passive: true }` flag to decouple from the main thread, and ensure the listener is cleaned up in the `unmounted()` hook. Use `getBoundingClientRect()` over `getClientRects()[0]` for better performance and safety.
