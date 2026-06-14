## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-14 - Prevent Multiple Submissions with Loading States
**Learning:** During form submission on the authentication page, noticed a lack of visual feedback and disabled states during async operations, which could lead to multiple API requests and confusing UI states.
**Action:** Always include a visual loading indicator (like a spinner) and disable submit buttons `disabled={isLoading}` along with an `aria-disabled` attribute during asynchronous operations to ensure better UX and prevent double submission.
