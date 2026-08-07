## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-14 - Added Loading State to Async Submit Button
**Learning:** Found that submit buttons during async operations lacked loading states and feedback, which could lead to multiple submissions or user confusion. Also realized decorative loading spinners need `aria-hidden="true"` to prevent screen readers from reading meaningless structural changes.
**Action:** Always add disabled state and visual loading indicators to submit buttons for async actions, ensuring the animated loading icon includes `aria-hidden="true"`.

## 2026-06-27 - Keyboard Accessibility for Non-Interactive Elements
**Learning:** Found that non-interactive HTML elements (like `<tr>`) with click handlers require additional attributes and event listeners to be fully accessible and usable via keyboard navigation.
**Action:** When adding click interactions to non-interactive elements, ensure they are keyboard-accessible by providing `tabIndex="0"`, an `onKeyDown` event handler listening for 'Enter' and 'Space' keys, and a visual focus state (such as `:focus-visible` in CSS).
## 2024-06-29 - Empty States & Visual Affordances
**Learning:** Tables with conditionally interactive rows (e.g., expandable only on fraud) cause confusion if there is no visual cue distinguishing them from static rows. Plain text empty states in complex dashboards look broken or unfinished.
**Action:** Always add interactive icons (like chevrons) to expandable rows and design empty states with structured layout and muted iconography to provide visual polish.
## 2026-06-15 - ARIA Live Regions for Dynamic Alerts
**Learning:** Found that dynamically injected error messages on login and new transaction alerts on the dashboard were visually apparent but silent to assistive technologies because they lacked appropriate `aria-live` or `role="alert"` attributes. I also realized that dynamically hiding decorative icons with `aria-hidden="true"` inside of alert panels is necessary so screen readers don't make redundant announcements.
**Action:** Always use `role="alert"` or `aria-live="assertive"` for dynamic form validations, API error messages, or real-time system alerts injected into the DOM, and apply `aria-hidden="true"` to any purely decorative elements within those containers.
