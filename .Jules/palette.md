## 2024-10-24 - Form Input Types and Interaction States
**Learning:** Found a specific pattern in this app where the non-standard `type="mail"` attribute is used for various text inputs (like name and email). This breaks mobile keyboard optimizations (like the `@` key for emails) and native browser validation.
**Action:** Always verify standard HTML5 input types (`text`, `email`) are used correctly across the app's forms, explicitly mark required fields, and ensure async form submissions provide visual loading feedback via disabled states.
