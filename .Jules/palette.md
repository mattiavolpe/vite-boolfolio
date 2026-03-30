## 2025-03-30 - Accessible Async Form Feedback
**Learning:** For async form submissions without page reloads, screen reader users miss important success/error feedback if it is only visually appended to the DOM.
**Action:** Always implement an `isSending` state to disable submit buttons and add a corresponding `role="status"` with `aria-live="polite"` to dynamically added feedback messages.
