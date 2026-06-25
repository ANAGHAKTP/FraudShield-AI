## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-14 - Added Loading State to Async Submit Button
**Learning:** Found that submit buttons during async operations lacked loading states and feedback, which could lead to multiple submissions or user confusion. Also realized decorative loading spinners need `aria-hidden="true"` to prevent screen readers from reading meaningless structural changes.
**Action:** Always add disabled state and visual loading indicators to submit buttons for async actions, ensuring the animated loading icon includes `aria-hidden="true"`.

## 2026-06-25 - Added Keyboard Navigation to Interactive Table Rows
**Learning:** Found that non-interactive elements like `<tr>` used as clickable items lacked keyboard accessibility, preventing users from interacting with expandable details. Added `onClick` handlers but forgot keyboard handlers and focus styles.
**Action:** Always provide explicit keyboard event handlers (like `onKeyDown` for Enter/Space), `tabIndex="0"`, `role="button"`, and visible focus states (e.g. `:focus-visible`) when converting non-interactive elements into actionable UI components.
