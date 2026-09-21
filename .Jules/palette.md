## 2024-05-20 - Contact Form State Feedback
**Learning:** The application's async contact form lacked user feedback during and after submission, and used non-standard input types (e.g., `type="mail"`), bypassing native browser validation.
**Action:** When implementing async forms, always include a loading state, disable the submit button to prevent duplicate submissions, and provide a clear, accessible `role="alert"` status message upon completion.
