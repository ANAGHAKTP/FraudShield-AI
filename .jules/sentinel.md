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
## 2024-05-24 - [MEDIUM] Require ValidationPipe for Controller Actions
**Vulnerability:** Even if `class-validator` decorators and DTOs are defined, NestJS does not magically trigger validation without an explicitly bound `ValidationPipe`. If the global `app.useGlobalPipes(new ValidationPipe())` is missing or bypassed, endpoints will remain vulnerable to malicious input, creating 'security theater'.
**Learning:** Always ensure `ValidationPipe` is bound globally in `main.ts` and explicitly enforced on critical single/batch body endpoints via `@Body(new ValidationPipe(...))` when introducing validation to a codebase.
**Prevention:** Apply `ValidationPipe` (and `ParseArrayPipe` for batches) with `whitelist: true` directly on request decorators or globally when defining input DTOs to guarantee execution.
