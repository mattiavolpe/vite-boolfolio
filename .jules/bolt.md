## 2024-05-17 - Optimize scroll listener in AppHome
**Learning:** Using `getClientRects()[0]` inside an unthrottled global scroll listener without `passive: true` is an anti-pattern that severely blocks the main thread in Vue components.
**Action:** Always throttle scroll events using `requestAnimationFrame`, use `getBoundingClientRect()` for position checks, add `{ passive: true }`, and explicitly clean up event listeners in the `unmounted()` hook to prevent memory leaks during navigation.
