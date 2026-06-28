## 2024-06-28 - Improve Form Accessibility and Feedback
**Learning:** Forms need proper semantic types (like type="email" instead of type="mail" for standard browser validation), visual indicators for required fields that are hidden from screen readers (aria-hidden="true" on an asterisk), and clear async loading states on submission buttons to prevent duplicate submits and provide feedback.
**Action:** Always check form input types and add explicit required attributes along with accessible required visual cues and disabled/loading states for submit buttons.
