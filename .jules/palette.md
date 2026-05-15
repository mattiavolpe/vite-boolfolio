## 2024-05-15 - Required Visual Indicators
**Learning:** When adding visual required indicators (e.g., asterisks `*`) to form labels, ensure they include `aria-hidden="true"` so screen readers do not redundantly announce them.
**Action:** Always wrap visual asterisks in `<span aria-hidden="true">*</span>`.
