## 2024-06-10 - Invalid HTML5 email input type
**Learning:** Found `<input type="mail">` which is invalid HTML5. It breaks mobile keyboard optimizations and native validation.
**Action:** Always use `<input type="email">` for email addresses and `<input type="text">` for standard text fields like names.
