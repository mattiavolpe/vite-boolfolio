## 2024-04-06 - [Global Event Listeners and SPA Routing]
**Learning:** Adding a global `window` event listener (like `scroll`) inside a Vue component`s `mounted` hook without removing it in `unmounted` leads to memory leaks and cross-route pollution, especially when performing DOM queries (`getBoundingClientRect`) on elements that only exist on specific routes.
**Action:** Always pair `window.addEventListener` in `mounted` with `window.removeEventListener` in `unmounted`. For scroll handlers doing layout math, throttle with `requestAnimationFrame` and `cancelAnimationFrame`.
