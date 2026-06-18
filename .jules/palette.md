## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-18 - Added loading states and spinner to login buttons
**Learning:** Found that when replacing static icons with spinning loading icons during async actions, changing interactive content on disabled buttons can cause screen readers to announce confusing updates. Disabling the button isn't sufficient.
**Action:** Always add `aria-hidden="true"` to decorative and animated icons (like `Loader2`) inside interactive elements, especially during async operations where the button text or icon changes to indicate a loading state.
