## 2024-05-14 - Invalid HTML5 Types Break Validation
**Learning:** Found an instance where `type="mail"` was used instead of `type="email"` or `type="text"`. This invalid type prevents native browser validation (like requiring an '@' symbol in an email) from functioning and breaks mobile keyboard integration.
**Action:** Always ensure standard HTML5 form attributes (like `type="email"` and `type="text"`) are used correctly to handle client-side validation natively before making asynchronous API calls.
