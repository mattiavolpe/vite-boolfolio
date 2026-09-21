## 2024-05-20 - Route-Level Code Splitting in Vue
**Learning:** In a Vue 3 Vite application, static imports for route components bundle all pages into the initial payload, unnecessarily inflating bundle sizes.
**Action:** Always use dynamic imports (`() => import('./Component.vue')`) in the Vue router to enable code splitting and defer loading non-critical code.
