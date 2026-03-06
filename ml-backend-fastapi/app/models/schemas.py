from pydantic import BaseModel
from typing import List

class FraudPredictionRequest(BaseModel):
    features: List[float]

class FraudPredictionResponse(BaseModel):
    prediction: int
    probability: float
