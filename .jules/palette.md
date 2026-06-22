## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-22 - Added Loading Spinner to Login Button
**Learning:** Found that async operations (like login) lacked visual feedback and double-click prevention.
**Action:** Always add an `isLoading` state to disable submit buttons during async calls and provide visual feedback with an `aria-hidden="true"` spinner to maintain accessibility while informing the user.
