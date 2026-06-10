## 2024-06-08 - [Intl Formatter Performance]
**Learning:** `Intl.NumberFormat` and `Intl.DateTimeFormat` are incredibly slow to instantiate. In React components with lists or tables, creating them inside the render loop (or inside mapping functions) for each item causes significant performance bottlenecks. Measurements show cached formatters are ~20-35x faster.
**Action:** Always extract and cache `Intl` formatter initializations outside the component or loop, especially when formatting multiple items like in data tables or lists.

## 2024-06-10 - [Date Initialization in Map/Reduce]
**Learning:** Instantiating `Date` objects and converting them to strings via `.toISOString()` inside large iteration blocks (like transaction formatting loops or reducers) introduces massive computational overhead, causing the server CPU to spend unnecessary cycles when formatting.
**Action:** Always prefer basic string manipulation (`substring`, `slice`) when the target string (e.g., ISO timestamp from a DB) already contains the formatted date needed.
