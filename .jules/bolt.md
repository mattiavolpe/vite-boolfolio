## 2024-06-09 - Null-safety in Global Event Listeners
**Learning:** Global DOM elements managed via custom state (`src/state.js`) are initialized as `null` and can cause runtime errors in global event listeners (like scroll) if accessed before their respective components mount or during rapid navigation.
**Action:** Always include null-safety checks when accessing custom global DOM state elements to prevent crashes.
