## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.

## 2026-06-15 - [MEDIUM] Prevent Stack Trace Leakage via Generic Exceptions
**Vulnerability:** The `TransactionsController` in the NestJS Gateway was throwing generic `Error` instances (`throw new Error(...)`) instead of framework-provided HTTP exceptions.
**Learning:** Throwing unhandled generic `Error` objects in frameworks like NestJS can bypass structured error handlers, potentially causing internal application logic, file paths, or sensitive stack traces to be leaked in the HTTP response to the client.
**Prevention:** Always use appropriate framework-provided HTTP exceptions (e.g., `BadRequestException`, `InternalServerErrorException`) for controlled error handling and ensuring internal implementation details remain opaque to clients.
