## 2023-10-27 - Form UX/Accessibility improvements
**Learning:** Adding a visual required indicator (`*`) directly into the label text causes screen readers to redundantly announce "asterisk" when navigating forms, which creates noise since the `required` attribute already semantically informs the user.
**Action:** When adding required asterisks, wrap them in a `<span aria-hidden="true">*</span>` element so they are visually present but ignored by assistive technologies, relying entirely on the native `required` attribute for semantic meaning.
