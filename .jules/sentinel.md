## 2024-06-06 - [CRITICAL] Hardcoded JWT Secret
**Vulnerability:** JWT secret was hardcoded in `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Secrets must be loaded from environment variables (e.g., `process.env.JWT_SECRET`) to avoid exposing them in source code. Fallbacks are only slightly better as they could still be used if the environment fails to load.
**Prevention:** Always rely on process.env for sensitive keys and provide explicit warnings if they fail to load to aid in catching misconfigurations early in development and production.
