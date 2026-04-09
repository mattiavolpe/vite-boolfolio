## 2024-04-09 - Accessible Form Submission States in Vue
**Learning:** Adding `role="status"` and `aria-live="polite"` to dynamically rendered `v-if` message blocks effectively provides screen reader feedback upon async Axios submission completions without interrupting the user.
**Action:** When creating async forms in this repository, always include `isSending`, `successMessage`, and `errorMessage` state, disable the submit button during sending, and provide feedback via accessible `.alert` divs below the form.
