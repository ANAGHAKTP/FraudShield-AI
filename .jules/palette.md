## 2026-06-13 - Added Accessibility Labels to Login Inputs
**Learning:** Found that basic structural ARIA attributes on `input` elements and decorative attributes on nested `svg` icon files were missing across form setups.
**Action:** Always provide `aria-label` attributes to form inputs missing semantic `<label>` elements, and `aria-hidden=true` to decorative icons within buttons or form groups.
## 2023-10-25 - [Async Button Loading States]
**Learning:** Adding loading states (like disabling the button and showing a spinner) is essential for preventing double submissions on async actions like login. Also, temporary files like scratchpads or logs should be explicitly deleted before committing to avoid repo pollution.
**Action:** Next time adding an async action in the UI, remember to add an `isLoading` state, a disabled state on the button, and ensure no temporary files are left around.
