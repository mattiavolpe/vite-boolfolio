## 2024-06-27 - Loading state in form submission
**Learning:** Managing an async loading state via `isSending` in the Vue Options API and dynamically setting a button's disabled state prevents multiple submissions and improves perceived performance, giving immediate feedback. Using `.finally()` in a Promise chain is a clean way to ensure the loading state is reset regardless of a successful or failed request.
**Action:** Use a reactive boolean flag and native `:disabled` attribute coupled with visual feedback (text change or spinner) for any async operation in a Vue form.
