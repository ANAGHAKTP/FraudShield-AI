## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.

## 2026-06-19 - Added Loading State to Async Submit Buttons
**Learning:** When adding animated loading icons (like `Loader2` from lucide-react) to indicate async operations, disabling the button isn't enough. The spinning icon creates a constant state change that can confuse screen readers by continuously updating the interactive content.
**Action:** Always add `aria-hidden="true"` to decorative or animated loading icons inside interactive elements to maintain a clear and static state for screen reader users during loading phases.
