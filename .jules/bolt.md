## 2024-05-19 - Vue Global Event Listener Memory Leaks
**Learning:** In Vue 3 Single Page Applications (like this Vite setup), global window event listeners (e.g., `window.addEventListener('scroll', ...)`) attached in a component's `mounted` hook will persist even after the component is destroyed (e.g., when navigating away using vue-router), leading to memory leaks and redundant processing.
**Action:** Always store the event handler reference and call `window.removeEventListener()` in the component's `unmounted` lifecycle hook to ensure proper cleanup.
