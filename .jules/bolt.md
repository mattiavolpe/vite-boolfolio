## 2024-04-05 - Optimizing Scroll Events and Avoiding Memory Leaks

**Learning:** When attaching global event listeners for events that fire rapidly (like `scroll`), executing layout calculations such as `getBoundingClientRect()` synchronously blocks the main thread, causing significant UI jank. Furthermore, initializing variables in `data()` forces Vue to set up reactivity for them. Using `requestAnimationFrame` throttles the callback. Importantly, if the component is destroyed (e.g., changing routes) while a `requestAnimationFrame` is pending, or if the listener is not removed, it leads to memory leaks and errors when it tries to read the DOM. Using `{ passive: true }` helps by telling the browser that the default action will not be prevented. `getClientRects()[0]` will crash if the element is not rendered, while `getBoundingClientRect()` returns a safe rect (and combined with null checks avoids crashes).

**Action:**
1. Always use `requestAnimationFrame` coupled with `{ passive: true }` for scroll event listeners that measure or manipulate the DOM.
2. Store non-reactive tracking variables (like the `rafId` and the `ticking` flag) inside the `created()` lifecycle hook to avoid Vue's reactivity overhead.
3. Always store the handler function in `created()` so that the exact same reference can be passed to `window.removeEventListener` in `unmounted()`.
4. Always call `window.cancelAnimationFrame(this.rafId)` in `unmounted()` to prevent the callback from executing after the component is destroyed.
5. Always use `getBoundingClientRect()` instead of `getClientRects()[0]` for measuring elements and verify element presence (null check) before measuring.