## 2024-05-18 - Route-Level Code Splitting
**Learning:** In Vite/Vue applications, statically importing all route components in the router configuration bundles them into a single large initial payload, which can slow down the initial page load time. Using dynamic imports automatically enables route-level code splitting.
**Action:** Always use dynamic imports (`() => import(...)`) for Vue router components to ensure the initial bundle size remains small and components are only loaded when their respective routes are visited.
