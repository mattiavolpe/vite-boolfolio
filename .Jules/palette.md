## 2024-03-26 - [Form Input Types]
**Learning:** Invalid input types like `type="mail"` fallback to `type="text"`, bypassing standard HTML validation and removing mobile keyboard UX improvements.
**Action:** Always ensure HTML inputs use valid types like `email`, `text`, `tel`, etc., to enforce proper validation and mobile typing context.