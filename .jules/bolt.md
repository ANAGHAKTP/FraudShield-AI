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
## 2024-06-29 - [Expensive Date Formatting in React Render Loops]
**Learning:** Implicitly instantiating `Intl` formatters (like via `.toLocaleTimeString()`) inside map loops during renders is a significant performance bottleneck, especially for frequently updating lists (like `AlertPanel.jsx`).
**Action:** Always cache `Intl.DateTimeFormat` or `Intl.NumberFormat` instances outside the component or loop, and use their `.format()` methods inside to prevent unnecessary allocations on every render.

## 2025-07-05 - Redundant predict and predict_proba calls
**Learning:** scikit-learn models (and typical ML frameworks) compute identical internal pathways for `predict()` and `predict_proba()`. Calling both sequentially for single or batched evaluations essentially doubles the inference execution time. The `predict()` response is essentially derived by thresholding the output of `predict_proba()` internally for binary classifiers.
**Action:** When a probability is needed for granular risk bucketing, always only execute `predict_proba()`, retrieve the probability, and manually derive the prediction boundary (e.g. `1 if prob >= 0.5 else 0`) rather than calling both methods sequentially.
