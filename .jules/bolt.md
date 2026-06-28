## 2024-06-08 - [Intl Formatter Performance]
**Learning:** `Intl.NumberFormat` and `Intl.DateTimeFormat` are incredibly slow to instantiate. In React components with lists or tables, creating them inside the render loop (or inside mapping functions) for each item causes significant performance bottlenecks. Measurements show cached formatters are ~20-35x faster.
**Action:** Always extract and cache `Intl` formatter initializations outside the component or loop, especially when formatting multiple items like in data tables or lists.

## 2024-06-10 - [Date Initialization in Map/Reduce]
**Learning:** Instantiating `Date` objects and converting them to strings via `.toISOString()` inside large iteration blocks (like transaction formatting loops or reducers) introduces massive computational overhead, causing the server CPU to spend unnecessary cycles when formatting.
**Action:** Always prefer basic string manipulation (`substring`, `slice`) when the target string (e.g., ISO timestamp from a DB) already contains the formatted date needed.

## 2026-06-11 - [Redundant API Calls]
**Learning:** The frontend made a separate API call (`/analytics/transactions-count`) to fetch the total transaction count, even though this exact data was already computed and returned by the `/analytics/fraud-rate` endpoint (`total_transactions`). This resulted in an unnecessary database query and network request during dashboard load.
**Action:** Always check the payload of existing requests (especially aggregate/analytics endpoints) before creating or querying new endpoints for simple counts.

## 2026-06-13 - [Concurrent DB Updates in Batch Processing]
**Learning:** In the gateway-nestjs backend, sequential `await` loops for database updates (like updating statuses after batch predictions) cause an N+1 latency bottleneck where processing time scales linearly with batch size. The Supabase client supports concurrent operations efficiently.
**Action:** Always replace sequential `await` calls inside loops with an array of mapped promises resolved via `Promise.all()` when independent database updates can be performed concurrently.

## 2024-06-13 - [Concurrent DB Updates in Batch Processing]
**Learning:** In the gateway-nestjs backend, sequential `await` loops for database updates (like updating statuses after batch predictions) cause an N+1 latency bottleneck where processing time scales linearly with batch size. The Supabase client supports grouped operations efficiently via `.in()`.
**Action:** Always replace concurrent `Promise.all()` single-row updates with grouped bulk updates (`.in()`) to reduce database and network load from O(N) to O(1) when updating rows with the same payload.
## 2024-07-25 - [Implicit Intl Instantiation in loops]
**Learning:** Calling `.toLocaleTimeString()` (or other `.toLocale*` methods) directly on a `Date` object implicitly instantiates a new `Intl` formatter object every time it's called. When used inside a `.map()` loop or component render method, this causes significant performance overhead and unnecessary garbage collection.
**Action:** Always extract and cache `Intl.DateTimeFormat` or `Intl.NumberFormat` instances outside of React component render loops or mapping functions, and use `formatter.format()` instead of `.toLocale*` string methods.
