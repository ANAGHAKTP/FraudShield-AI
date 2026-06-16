## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-16 - Added loading states to forms
**Learning:** Forms lacked visual loading states during asynchronous submission processes, leaving users without explicit feedback or a way to prevent duplicate submissions.
**Action:** Always add immediate visual feedback (such as a spinning icon and contextual text) and disable submit buttons while long-running authentication or data-submission requests are processing.
