## 2025-06-05 - Hardcoded JWT Secret Removed
**Vulnerability:** A critical security vulnerability was found where the JWT secret `super-secret-key-change-me` was hardcoded in `gateway-nestjs/src/auth/auth.module.ts` and `gateway-nestjs/src/auth/jwt.strategy.ts`.
**Learning:** Hardcoded secrets in the codebase allow attackers with source code access to forge JWT tokens and completely bypass authentication, rendering the entire gateway insecure.
**Prevention:** Always use environment variables (`process.env.JWT_SECRET`) for cryptographic secrets and enforce a "fail securely" pattern on startup where the application throws a fatal error if the secret is undefined.
