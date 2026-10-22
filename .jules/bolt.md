## 2024-05-24 - Vue Router Code Splitting
**Learning:** In Vite apps, static imports in the router load all components into a single large initial chunk.
**Action:** Use dynamic imports `() => import('...')` in Vue Router to split the code, drastically reducing the initial JavaScript and CSS payload.
