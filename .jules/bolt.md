## 2024-03-24 - Route-Level Code Splitting
**Learning:** Found that static imports in the Vue router caused the entire app to be bundled into a single large JavaScript file (`dist/assets/index-9b2b0857.js` ~322.95 kB).
**Action:** Used dynamic imports (`() => import('./views/Component.vue')`) for Vue routes to enable Vite's built-in code splitting, separating the bundle into smaller, route-specific chunks.
