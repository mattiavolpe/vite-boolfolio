## 2024-05-24 - Route-Level Code Splitting
**Learning:** Static imports in Vue Router prevent Vite from performing route-level code splitting, increasing the initial bundle size.
**Action:** Use dynamic imports (e.g. const View = () => import('./View.vue')) for route components to optimize performance.
