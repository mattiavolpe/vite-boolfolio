## 2024-05-24 - Accessible feedback states for async forms in Vue

**Learning:** When dealing with asynchronous form submissions in Vue applications, using standard HTML5 validation (`required`, correct `type`) along with an `isSending` state provides immediate micro-UX feedback. Crucially, combining this with a post-submission message using `role="status"` and `aria-live="polite"` ensures screen readers announce the success or failure of the background action without interrupting the user.

**Action:** Always implement an `isSending` state to disable submit buttons during async calls to prevent duplicate submissions and give visual feedback. Follow this up with an accessible feedback message container (`role="status"`, `aria-live="polite"`) to communicate the final result to all users, especially those using assistive technologies.
