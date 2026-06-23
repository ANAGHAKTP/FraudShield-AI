## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.
## 2026-06-23 - [MEDIUM] Prevent Stack Trace Leakage via Generic Errors
**Vulnerability:** A generic `Error` was being thrown in `transactions.controller.ts` for batch processing validation failures, which could leak internal stack traces to clients.
**Learning:** In NestJS, unhandled generic `Error` objects might result in an Internal Server Error response that exposes stack traces or sensitive internal error messages, while framework-provided exceptions (like `BadRequestException`) are safely formatted.
**Prevention:** Always use framework-provided HTTP exceptions (e.g., `BadRequestException`) for validation or known client errors instead of throwing generic `Error` instances.
