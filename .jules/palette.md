## 2025-02-18 - Improve Contact Form Accessibility and Feedback
**Learning:** Adding visual required field indicators (like an asterisk `*`) should always be wrapped in `aria-hidden="true"` to prevent screen readers from announcing them as "star". Rely on the semantic `required` HTML attribute on the input elements themselves for proper accessibility validation.
**Action:** Always pair visual required indicators with `aria-hidden="true"` and `required` attributes on inputs for form enhancements.
