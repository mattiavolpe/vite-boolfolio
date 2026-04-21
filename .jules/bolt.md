## 2024-05-18 - Unthrottled Global Scroll Listeners in Vue Router SPAs

**Learning:** This application attached an unthrottled global scroll listener (`window.addEventListener('scroll')`) directly invoking heavy DOM calculations (`getClientRects()[0]`) without `passive: true`. Worse, it lacked an `unmounted` hook to clean up the listener, leading to severe memory leaks and unintended execution of layout calculations when navigating to other routes where those DOM elements might not exist.

**Action:** Always throttle scroll events using `requestAnimationFrame`, append `{ passive: true }` to avoid blocking scrolling performance, safely query DOM layouts using `getBoundingClientRect()` with null checks, and most critically, always use the `unmounted()` hook to explicitly `removeEventListener` and `cancelAnimationFrame` for any global listeners.
