## 2024-05-04 - Native HTML5 Form Validation and Mobile Keyboards
**Learning:** Using an invalid input type like `type="mail"` instead of `type="email"` breaks native browser validation and prevents mobile devices from displaying the correct contextual keyboard (e.g., showing the `@` symbol for emails).
**Action:** Always use standard HTML5 form attributes (like `type="email"` and `type="text"`) along with the `required` attribute to handle client-side validation natively.
