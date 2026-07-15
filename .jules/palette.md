## 2024-05-20 - Semantic Form Validation and Feedback
**Learning:** Forms using invalid HTML5 input types (like `type="mail"`) break native browser validation and semantic meaning. Asynchronous submissions without loading states or success resets leave users confused.
**Action:** Always use standard input types (`type="email"`), native `required` attributes, manage an `isSending` state to disable submit buttons, and reset form values upon success.
