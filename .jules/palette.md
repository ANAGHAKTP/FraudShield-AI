## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-20 - Added ARIA attributes to Loading Spinners on interactive forms
**Learning:** Decorative or animated loading icons (e.g. `Loader2`) without explicit screen reader hiding properties will be dynamically announced during asynchronous loading, creating confusion for screen readers since it frequently overrides interactive content updates.
**Action:** Always append `aria-hidden="true"` to SVG loading icons or decorative icons inside buttons when developing async state flows to prevent confusing behavior from assistive devices.
