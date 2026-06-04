## 2024-06-04 - Unoptimized Global Scroll Listeners
**Learning:** Found an anti-pattern in AppHome.vue where a global scroll listener was missing throttling, passive flag, and cleanup, which caused memory leaks and excessive DOM layout thrashing via getClientRects().
**Action:** Always throttle scroll events with requestAnimationFrame, use getBoundingClientRect() instead of getClientRects(), add { passive: true }, and clean up in unmounted() lifecycle hook.
