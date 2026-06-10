## 2025-06-10 - Keyboard Navigation on Data Tables
**Learning:** Interactive rows in a table (like expandable rows for fraud details) must be keyboard accessible. Adding `tabIndex={0}`, an `onKeyDown` handler for 'Enter'/'Space', and `aria-expanded` makes the interaction accessible to screen readers and keyboard users without breaking semantic table structure.
**Action:** Next time I see an `onClick` on a non-interactive element like a `<tr>`, I'll immediately verify if keyboard access is supported and add `tabIndex`, keyboard event listeners, and appropriate ARIA attributes.
