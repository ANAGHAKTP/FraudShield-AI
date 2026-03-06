from fastapi import FastAPI
from app.api import predict

app = FastAPI(
    title="FraudShield AI - ML Backend",
    description="API for the ML Fraud Detection Backend",
    version="1.0.0",
)

app.include_router(predict.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FraudShield AI ML Backend API"}
