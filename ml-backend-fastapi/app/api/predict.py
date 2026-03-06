from fastapi import APIRouter, HTTPException
from app.models.schemas import FraudPredictionRequest, FraudPredictionResponse
from app.services.fraud_detection import predict_fraud

router = APIRouter(prefix="/predict", tags=["prediction"])

@router.post("/", response_model=FraudPredictionResponse)
def get_prediction(request: FraudPredictionRequest):
    try:
        result = predict_fraud(request.features)
        return FraudPredictionResponse(
            prediction=result["prediction"],
            probability=result["probability"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
