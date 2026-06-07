## 2024-06-08 - Accessible Password Toggle
**Learning:** Password visibility toggle buttons and inputs without labels in the login form created an accessibility barrier. Screen reader users would hear "button" without context for the toggle, and inputs relied solely on visual placeholders.
**Action:** Ensure all icon-only interactive elements receive `aria-label`s and `title` attributes, and that inputs have explicit `aria-label`s when visual labels are omitted.
