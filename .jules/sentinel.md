## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.

## 2026-06-21 - [MEDIUM] Fix stack trace leak in error handling
**Vulnerability:** A generic `Error` was thrown in the controller when validating input arrays, causing the NestJS framework to potentially leak stack traces on unhandled exceptions.
**Learning:** In NestJS, throwing generic errors instead of HTTP exceptions can leak internal implementation details if not caught properly.
**Prevention:** Always use framework-provided HTTP exceptions (e.g., `BadRequestException`) to return controlled error responses and prevent internal information leakage.
