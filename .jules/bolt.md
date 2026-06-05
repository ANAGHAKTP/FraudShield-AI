## 2024-06-05 - Intl Formatters in Render Loops
**Learning:** Instantiating `Intl.NumberFormat` or using `Date.prototype.toLocaleDateString` inside a React component's render loop (especially for rendering lists) is a significant performance anti-pattern. Creating these formatters is computationally expensive.
**Action:** Always instantiate `Intl.NumberFormat` and `Intl.DateTimeFormat` once outside the component and reuse them across renders.
