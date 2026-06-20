## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.

## 2024-05-25 - [MEDIUM] Fix Information Leakage in API Responses
**Vulnerability:** Unhandled exceptions in NestJS (`TransactionsController`) were thrown as generic `Error` objects, and in FastAPI (`predict.py`), the raw exception string was returned directly in the HTTP 500 response (`detail=str(e)`).
**Learning:** Exposing raw exception messages or stack traces to the client can leak sensitive internal system information, database schemas, or code paths to an attacker, providing reconnaissance data for further attacks.
**Prevention:** Always catch exceptions and return generic, safe error messages to the client (e.g., "An internal error occurred"). Log the detailed exception and stack trace on the server side for debugging purposes. Use framework-provided HTTP exceptions (like `BadRequestException` in NestJS) to handle expected errors securely.
