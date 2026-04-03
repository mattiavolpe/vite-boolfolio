## 2025-01-20 - Accessible Form Async States
**Learning:** For Vue SPAs handling forms async with axios, visual feedback loops are crucial for accessibility and UX. Without disabling the submit button or announcing state changes, screen readers don't know the submission occurred or if it succeeded.
**Action:** Always implement an `isSending` state to disable submit buttons and provide accessible post-submission feedback (using `role="status"` and `aria-live="polite"`) for async forms.
