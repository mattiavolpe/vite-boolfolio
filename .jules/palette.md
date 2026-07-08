## 2024-07-08 - Form Submission UX Polish
**Learning:** Combining explicit form validation (required attributes with visually hidden asterisk), correct input types, loading state disabling the submit button, and clearing inputs on success significantly reduces user frustration during asynchronous submissions.
**Action:** Apply loading state and form reset logic to all async forms, explicitly correcting any malformed input types (e.g. type="mail" instead of "email") and visually distinguishing required fields with aria-hidden asterisks.
