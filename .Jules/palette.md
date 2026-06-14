## 2024-05-24 - Async Form Feedback & Accessibility
**Learning:** Users lack feedback during async operations like form submissions, and screen readers can overly announce mandatory field indicators.
**Action:** Always implement disabled/loading states for async form submissions and wrap visual required indicators (like '*') in `aria-hidden="true"` to prevent redundant screen reader announcements while enforcing semantic validation with `required`.
