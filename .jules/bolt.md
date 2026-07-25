## 2023-10-27 - Vue App scroll event listener optimization
**Learning:** Adding passive scroll event listeners with requestAnimationFrame and getBoundingClientRect() prevents main thread blocking and improves rendering performance in Vue applications. Also, unmounting scroll event listeners is necessary to prevent memory leaks when components are destroyed.
**Action:** Use requestAnimationFrame and getBoundingClientRect() inside passive scroll event listeners, and ensure proper cleanup in the component's unmounted hook.
