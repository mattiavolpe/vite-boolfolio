## 2024-05-24 - Incorrect Input Types for Text Fields
**Learning:** The application mistakenly used type="mail" for standard text inputs (like "Full name"), which incorrectly triggers the email keyboard on mobile devices and creates a frustrating data entry experience.
**Action:** Always verify that input types match the expected data format (type="text" for names) and use type="email" instead of type="mail" for email fields.
