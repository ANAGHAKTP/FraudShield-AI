## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-14 - Added Loading State to Async Submit Button
**Learning:** Found that submit buttons during async operations lacked loading states and feedback, which could lead to multiple submissions or user confusion. Also realized decorative loading spinners need `aria-hidden="true"` to prevent screen readers from reading meaningless structural changes.
**Action:** Always add disabled state and visual loading indicators to submit buttons for async actions, ensuring the animated loading icon includes `aria-hidden="true"`.

## 2026-06-27 - Keyboard Accessibility for Non-Interactive Elements
**Learning:** Found that non-interactive HTML elements (like `<tr>`) with click handlers require additional attributes and event listeners to be fully accessible and usable via keyboard navigation.
**Action:** When adding click interactions to non-interactive elements, ensure they are keyboard-accessible by providing `tabIndex="0"`, an `onKeyDown` event handler listening for 'Enter' and 'Space' keys, and a visual focus state (such as `:focus-visible` in CSS).
## 2026-06-28 - Added visual affordances to expandable rows and improved empty states
**Learning:** Interactive elements (like expandable table rows) require explicit visual affordances (like chevrons) to indicate interactivity, otherwise users might not realize they can click them. Furthermore, empty states should use muted icons and structured typography to feel intentional and guide the user, rather than looking like a missing component or broken data fetch.
**Action:** Always provide explicit visual cues (e.g., icons that change state) for non-standard interactive elements, and design empty states intentionally with icons and clear messaging.
