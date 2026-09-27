## 2024-05-24 - Route-Level Code Splitting in Vue
**Learning:** In Vue applications built with Vite, statically importing all route components in router.js bundles them into a single large initial payload, which can be a bottleneck.
**Action:** Always use dynamic imports to enable Vite code splitting and minimize initial bundle size.
