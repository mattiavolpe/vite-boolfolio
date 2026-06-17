## 2024-05-24 - Vue Component Global DOM Anti-pattern
**Learning:** The codebase manages global DOM references via src/state.js which are initialized as null. Accessing these directly in unthrottled global events like scroll without null-checks causes exceptions during navigation. Furthermore, missing unmounted hooks create multiple instances of overlapping listeners.
**Action:** When adding global events in Vue, always throttle with requestAnimationFrame, add null-checks for state DOM elements, and ensure unmounted lifecycle hooks are used for removeEventListener.
