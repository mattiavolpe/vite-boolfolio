## 2023-10-24 - Vue Route-Level Code Splitting
**Learning:** Found a Vue 3 project using static imports for routes. This pattern prevents Vite from splitting route chunks, forcing users to download the entire application logic on initial load, creating a significant frontend bottleneck for large apps.
**Action:** Replaced static Vue route imports with dynamic import functions (`() => import(...)`) to enable Vite code splitting. Will default to this pattern for all future Vue/Vite routing setups to reduce initial bundle size.
