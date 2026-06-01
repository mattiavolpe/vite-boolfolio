## 2024-06-01 - Form Input Types and Loading States
**Learning:** Found custom incorrect input types (`type="mail"`) which bypass native HTML5 validation and mobile keyboard triggers. Missing loading states on submission buttons allow duplicate requests.
**Action:** Always ensure proper native input types (`text`, `email`, etc.) and add `isSending` data properties to disable submit buttons during async operations to prevent double submissions.
