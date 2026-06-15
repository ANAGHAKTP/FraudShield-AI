## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.


## 2024-05-18 - [Add Loading State to Async Operations]
**Learning:** Adding a loading state to async operations like login/registration prevents users from clicking multiple times and provides necessary feedback.
**Action:** Always add loading states to async submission buttons to improve interaction and provide visual feedback.
