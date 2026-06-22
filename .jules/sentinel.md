## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.

## 2026-06-22 - Prevent Information Leakage in API Responses
**Vulnerability:** The FastAPI `predict` endpoint caught exceptions and raised an `HTTPException` with `detail=str(e)`, exposing raw exception strings (which could include stack traces or internal implementation details) directly to the client.
**Learning:** Returning `str(e)` in an API response is a common pattern that accidentally leaks sensitive internal information to untrusted users, violating the "Fail Securely" principle.
**Prevention:** Always log the full exception details internally (e.g., using `logger.error("Error", exc_info=True)`) and return a generic, safe error message (e.g., "An internal server error occurred") to the client.
