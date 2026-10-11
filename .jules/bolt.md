## 2024-03-24 - Route-Level Code Splitting
**Learning:** Found that the app uses static imports for all Vue routes in `src/router.js`, which bundles the entire application (including all views and their dependencies) into a single large JavaScript file. This increases the initial load time unnecessarily.
**Action:** Implemented dynamic imports (`() => import('...')`) for Vue routes to enable route-level code splitting out of the box with Vite, which significantly reduces the initial bundle size.
