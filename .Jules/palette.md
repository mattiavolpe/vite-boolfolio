## 2024-04-13 - [Contact Form Accessibility]
**Learning:** Adding a native HTML5 `required` attribute and explicit `role="status" aria-live="polite"` elements provides instant browser-level validation and screen reader feedback respectively without requiring external UI dependencies or complex custom Vue logic.
**Action:** Always verify form inputs have appropriate HTML5 `type` attributes (e.g. `type="email"`, not `type="mail"`) and integrate `isSending` states tied directly to disabled buttons to prevent double-submissions.
