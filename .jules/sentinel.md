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

## 2024-08-03 - [CRITICAL] Fix missing input validation on API endpoints
**Vulnerability:** The API Gateway `TransactionsController` and `PredictionController` were accepting raw `any` payloads for transaction creation and fraud prediction endpoints without any validation, opening up the risk for malformed data and bypassing business logic checks (like negative amounts).
**Learning:** Using raw `any` types for request bodies bypasses NestJS's global `ValidationPipe` and input checking.
**Prevention:** Always define incoming request bodies using explicitly typed DTO classes decorated with `class-validator` rules, and use `ParseArrayPipe` for validating arrays of objects to ensure robust input validation and prevent mass assignment attacks.
## 2024-05-24 - [CRITICAL] Fix insecure fallback for Supabase credentials
**Vulnerability:** Empty string fallbacks were used for critical database credentials (`SUPABASE_URL` and `SUPABASE_KEY`), allowing the application to initialize in an insecure state.
**Learning:** Providing insecure default fallbacks (like empty strings) for critical environment variables creates a significant risk. If the application starts without them, it might fail in unpredictable ways during runtime queries, potentially exposing sensitive information via error messages or leading to inconsistent state.
**Prevention:** Always explicitly validate the presence of critical environment variables during application initialization. If they are missing, throw a fatal error immediately (fail-fast principle) rather than falling back to insecure defaults, ensuring the application fails securely and predictably.
