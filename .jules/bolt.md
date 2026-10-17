## 2023-10-24 - Vue Router Code Splitting in Vite
**Learning:** In a Vue + Vite application, static imports in the router configuration bundle all route components into a single large chunk, causing a performance bottleneck on initial load. Vite automatically creates separate chunks for each route when using dynamic import syntax.
**Action:** Always use dynamic imports (`const Component = () => import('./path')`) for route components to enable route-level code splitting and minimize initial bundle size.
