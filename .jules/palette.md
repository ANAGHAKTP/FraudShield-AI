## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-14 - Added Loading State to Async Submit Button
**Learning:** Found that submit buttons during async operations lacked loading states and feedback, which could lead to multiple submissions or user confusion. Also realized decorative loading spinners need `aria-hidden="true"` to prevent screen readers from reading meaningless structural changes.
**Action:** Always add disabled state and visual loading indicators to submit buttons for async actions, ensuring the animated loading icon includes `aria-hidden="true"`.

## 2026-06-26 - Added Keyboard Accessibility to Interactive Table Rows
**Learning:** Found that non-standard interactive HTML elements (like `<tr>` used for expanding table rows) were not keyboard-accessible, preventing users who rely on keyboard navigation from accessing detailed information.
**Action:** Always ensure non-interactive elements that have click events are made keyboard-accessible by providing `tabIndex="0"`, an `onKeyDown` event handler listening for 'Enter' and 'Space' keys, a visual focus state (e.g., `:focus-visible` in CSS), and appropriate ARIA attributes (like `aria-expanded`).
