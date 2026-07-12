## 2024-05-24 - [CRITICAL] Fix hardcoded JWT secret
**Vulnerability:** The NestJS Gateway application had a hardcoded JWT secret ('super-secret-key-change-me') directly in the source code within `auth.module.ts` and `jwt.strategy.ts`.
**Learning:** Hardcoded secrets present a critical risk as they expose cryptographic keys directly in source control, making token forgery trivial for anyone with code access.
**Prevention:** Always use environment variables (e.g., `process.env.JWT_SECRET`) for sensitive keys, never providing a hardcoded fallback value. If a necessary environment variable is missing, the application should throw an error or fail to start to prevent falling back to an insecure state.
## 2026-06-24 - [MEDIUM] Fix Exception Leakage in HTTP Responses
**Vulnerability:** The backend services were exposing internal stack traces and exceptions directly to clients (e.g., throwing unhandled `Error` in NestJS and returning `str(e)` in FastAPI `HTTPException`).
**Learning:** Returning unhandled exception strings directly to the client can leak sensitive infrastructure and internal implementation details.
**Prevention:** Always use framework-provided generic exceptions (like `BadRequestException` in NestJS) or catch exceptions and return generic `HTTPException` messages (in FastAPI) rather than raw internal error strings.
## 2023-10-27 - [Add Input Validation and DTOs to API]
**Vulnerability:** The API Gateway `AuthController` was accepting raw `any` payloads for login and registration requests without any validation, opening up the risk for missing data, poorly formatted emails, and overly weak passwords.
**Learning:** Using raw `any` or basic TS interfaces bypasses input checking in NestJS.
**Prevention:** Always define incoming request bodies using explicitly typed DTO classes and decorate properties with `class-validator` rules. Further, ensure `ValidationPipe` with `whitelist: true` is enabled globally to strip out unknown fields and prevent mass assignment attacks.
## 2026-07-12 - [MEDIUM] Enforce Validation on Nested Object Arrays in Batch Endpoints
**Vulnerability:** The batch processing endpoint (`createBatchTransactions`) accepted an array of untyped transactions without enforcing deep validation on each individual item, bypassing the global `ValidationPipe` protections against mass assignment and invalid data.
**Learning:** Global `ValidationPipe` rules do not automatically apply to elements inside arrays when the controller parameter is typed as a primitive array (e.g., `any[]`).
**Prevention:** When validating arrays of complex objects in NestJS request bodies, always explicitly apply a `ParseArrayPipe` with `items` defined to the corresponding DTO class and `whitelist: true` to ensure each element is validated safely and strictly.
