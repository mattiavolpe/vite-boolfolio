## 2024-05-24 - Unthrottled Global Scroll Event & Inefficient DOM Reads

**Learning:** Accessing centralized reactive state (e.g., `state.footerEl`) within an unthrottled global `scroll` event can severely impact scrolling performance by causing continuous main-thread blocking. Furthermore, using `getClientRects()[0]` for coordinate retrieval is less efficient than the standard `getBoundingClientRect()`, and failing to clean up global event listeners in component `unmounted` hooks leads to memory leaks across route changes.

**Action:**
1. Always throttle rapid-firing global events (like `scroll`, `wheel`, `resize`) using `requestAnimationFrame`.
2. When attaching global event listeners, ensure the `{ passive: true }` flag is set to allow the browser to optimize scrolling.
3. Prefer `getBoundingClientRect()` over `getClientRects()[0]`.
4. Always explicitly clean up global event listeners and cancel any pending animation frames in the component's `unmounted` lifecycle hook.
5. Provide null checks when accessing centralized DOM elements, as child components might not be mounted yet.