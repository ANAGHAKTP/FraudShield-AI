# FraudShield AI - API Planning

This document outlines the initial plan for the REST API endpoints. The system will primarily expose endpoints through the `gateway-nestjs` service, which may proxy requests to the `ml-backend-fastapi` service.

## API Gateway (NestJS)
Base URL: `/api/v1`

### Authentication & Users
- `POST /auth/register` - Create a new business account.
- `POST /auth/login` - Authenticate and receive a JWT.
- `GET /users/me` - Get current user details.

### Transactions
- `POST /transactions/upload` - Upload a batch of transactions (CSV/JSON).
- `POST /transactions/analyze` - Analyze a single transaction in real-time.
    - *Body*: `{ amount, user_id, merchant_id, timestamp, ... }`
    - *Response*: `{ transaction_id, risk_score, status: "APPROVED" | "REVIEW" | "DECLINED" }`
- `GET /transactions` - Retrieve past transactions with pagination and filtering.
- `GET /transactions/:id` - Get details of a specific transaction.

### Analytics & Reporting
- `GET /analytics/dashboard` - Get aggregated data for the dashboard (total transactions, fraud rate, recent alerts).
- `GET /analytics/reports` - Generate specific fraud reports.

### Alerts
- `GET /alerts` - Get a list of recent fraud alerts.
- `PATCH /alerts/:id` - Update alert status (e.g., mark as resolved/false positive).

## ML Backend (FastAPI)
Base URL: (Internal service)

- `POST /predict` - Core prediction endpoint. Accepts raw transaction features and returns a probability score.
- `POST /train` (Optional/Future) - Retrain or fine-tune models based on new data.
- `GET /health` - Health check for the ML service status.
