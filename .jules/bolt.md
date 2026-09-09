## 2024-05-24 - Vue Router Code Splitting
**Learning:** In this Vue application, statically importing all view components in the router configuration causes them to be bundled into the initial payload, unnecessarily increasing the initial load time.
**Action:** Always use dynamic imports (`const Component = () => import('./Component.vue')`) for route components to enable Vite route-level code splitting and reduce the initial bundle size.
