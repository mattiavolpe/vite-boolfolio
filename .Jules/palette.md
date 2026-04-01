## 2024-05-14 - Accessible Async Form Submissions
**Learning:** Found a pattern where async forms lack feedback, leaving users confused about submission status.
**Action:** Always implement an `isSending` state to disable the submit button and provide clear, accessible post-submission feedback (success or error) using `role="status"` and `aria-live="polite"`.