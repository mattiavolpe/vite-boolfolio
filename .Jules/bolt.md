## 2026-06-14 - Vue Scroll Event Optimization
**Learning:** Global scroll events require multiple optimizations: passive listeners, getBoundingClientRect() over getClientRects()[0], requestAnimationFrame for throttling, instance variables for non-reactive state, and explicit cleanup in unmounted() to prevent memory leaks.
**Action:** Always apply these optimizations when attaching global event listeners in Vue components.
