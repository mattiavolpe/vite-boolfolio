## 2024-04-24 - Efficient Event Listeners and Safe DOM Access

**Learning:** When dealing with asynchronous global DOM access via reactive `state` properties in Vue (e.g., `state.headerEl`), components mounting or unmounting can lead to intermediate null states during high-frequency events like scrolling. Furthermore, using `getClientRects()[0]` for position checking creates unnecessary arrays and is significantly less performant than `getBoundingClientRect()`.

**Action:** Always wrap high-frequency event handlers (like scroll) in `requestAnimationFrame` to throttle execution. Always pair global state DOM access with explicit null checks (`if (state.headerEl)`), replace `getClientRects()[0]` with `getBoundingClientRect()`, mark scroll listeners as `{ passive: true }`, and strictly manage global listener lifecycle using Vue's `unmounted` hook.
