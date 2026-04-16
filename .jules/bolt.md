## 2024-04-16 - Global Event Listener Leaks in SPA

**Learning:** This application previously bound a global scroll event listener in `AppHome.vue` that attempted to scope its execution using conditional logic (`if(this.$route.name === "home")`) instead of unbinding itself. This meant the scroll event fired continuously on every page across the entire site, executing route-checking logic and maintaining closures even when the component wasn't visible, causing unnecessary CPU cycles and a potential memory leak as the component could never be fully garbage collected.

**Action:** Always clean up global event listeners (like `window.addEventListener`) using the `unmounted()` lifecycle hook in Vue components to prevent them from persisting and executing across route changes.
