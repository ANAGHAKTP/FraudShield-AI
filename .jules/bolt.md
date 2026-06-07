## 2024-06-07 - [Intl instantiation overhead]
**Learning:** Instantiating `Intl.NumberFormat` and `Date.toLocaleDateString` inside component render functions or loops is incredibly slow.
**Action:** Cache the formatter instance outside the render cycle or component scope to significantly boost formatting performance.
