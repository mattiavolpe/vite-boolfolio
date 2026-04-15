## 2024-04-15 - Async Form UX Improvement
**Learning:** Implemented a comprehensive asynchronous form feedback pattern. Discovered that Vue forms handling API POST requests (`axios`) need explicit `isSending` states to disable inputs and buttons to prevent double submissions. Also learned to use `role="status"` and `aria-live="polite"` for accessible post-submission feedback that screen readers announce dynamically.
**Action:** Always implement disabled states (`:disabled="isSending"`) on form elements during async operations and provide accessible live regions for success/error messages.
