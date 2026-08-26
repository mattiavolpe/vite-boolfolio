## 2024-03-24 - Scroll Event Throttling & DOM Rect Safety
**Learning:** When attaching scroll events in Vue that perform DOM measurements (like `getClientRects`), unthrottled execution causes significant layout thrashing. Additionally, `getClientRects()[0]` is unsafe as it throws if the element is unrendered.
**Action:** Always throttle scroll/resize events using `requestAnimationFrame` and a ticking flag, and prefer `getBoundingClientRect()` over `getClientRects()[0]` for safe, guaranteed DOMRect returns.
