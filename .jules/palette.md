## 2024-05-24 - Form Input Types and Loading States
**Learning:** This app's forms (e.g., ContactView) had invalid HTML5 input types (e.g., `type="mail"` instead of `type="email"` for email address and `type="text"` for name), missing `required` attributes and labels indicating required fields, and lacked loading states and feedback for async submissions. This is a common accessibility issue.
**Action:** Always check form elements for correct types, required attributes, clear labels, and add loading state/feedback mechanisms.
