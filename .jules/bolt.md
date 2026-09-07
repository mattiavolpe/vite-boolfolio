## 2024-05-18 - Route-Level Code Splitting in Vite Vue App
**Learning:** This codebase uses Vite. Adding dynamic imports in `src/router.js` for route components effectively enables Vite's code splitting out of the box, breaking up the bundle payload which can lead to faster initial page loads as only the active route code is downloaded.
**Action:** Apply dynamic imports (`const Comp = () => import('./Comp.vue')`) when configuring client-side routing on Vite projects rather than static imports.
