## 2026-06-13 - Contact Form Accessibility and Feedback
**Learning:** The contact form used invalid HTML input types (type="mail") which breaks native mobile keyboard support and validation. Additionally, the lack of a loading state provides a poor user experience during async submission.
**Action:** Ensure inputs use standard types (like text or email), include visual and screen-reader accessible indicators for required fields, manage button states during submission, and provide clear success/error feedback.
