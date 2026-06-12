## 2024-06-12 - Accessible Placeholder Forms
**Learning:** Found forms relying entirely on placeholders with decorative icons instead of semantic labels. This is a common pattern in the existing components that breaks screen reader accessibility, requiring immediate addition of explicit ARIA labels.
**Action:** When working on input forms in this repo, explicitly add `aria-label` to fields that don't have linked `<label>` tags and add `aria-hidden="true"` to purely decorative icons (like Lucide icons used inside input wrappers).
