## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-17 - Added Loading Spinner and State to Auth Button
**Learning:** When adding loading states to submit buttons, disabling the button during loading isn't enough; the decorative or animated icons shown during this state should also have `aria-hidden="true"` to avoid confusing screen readers with changing interactive content during the async operation.
**Action:** Always include `aria-hidden="true"` on loading icons (e.g., `Loader2`) and other decorative icons when swapping button content for loading states.
