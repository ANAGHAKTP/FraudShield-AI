from fastapi import FastAPI
import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

import joblib

# Load trained model
model_data = joblib.load("app/models/fraud_model.pkl")
model = model_data["model"]
features_list = model_data["features"]


# Request Schema
class Transaction(BaseModel):
    features: list

# For the batch prediction route
class BatchTransaction(BaseModel):
    transactions: list[Transaction]


@app.get("/")
def home():
    return {"message": "Fraud Detection API Running"}


@app.post("/predict")
def predict(data: Transaction):

    df_features = pd.DataFrame([data.features], columns=features_list)

    prediction = model.predict(df_features)[0]
    probability = float(model.predict_proba(df_features)[0][1])

    if probability > 0.8:
        risk = "HIGH"
    elif probability > 0.4:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "fraud_probability": probability,
        "label": "fraud" if prediction == 1 else "legitimate",
        "risk_level": risk
    }

@app.post("/predict-batch")
def predict_batch(data: BatchTransaction):
    if not data.transactions:
        return []

    # Combine all feature arrays into a single DataFrame
    features_list_of_lists = [t.features for t in data.transactions]
    df_features = pd.DataFrame(features_list_of_lists, columns=features_list)

    predictions = model.predict(df_features)
    probabilities = model.predict_proba(df_features)[:, 1]

    results = []
    for pred, prob in zip(predictions, probabilities):
        prob = float(prob)
        if prob > 0.8:
            risk = "HIGH"
        elif prob > 0.4:
            risk = "MEDIUM"
        else:
            risk = "LOW"
            
        results.append({
            "fraud_probability": prob,
            "label": "fraud" if pred == 1 else "legitimate",
            "risk_level": risk
        })
        
    return results
