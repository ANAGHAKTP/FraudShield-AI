from fastapi import FastAPI
import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

import joblib

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Load trained model
try:
    model_path = os.path.join(BASE_DIR, "models/fraud_model.pkl")
    model_data = joblib.load(model_path)
    if isinstance(model_data, dict):
        model = model_data["model"]
        features_list = model_data["features"]
        print(f"Loaded model dictionary with {len(features_list)} features")
    else:
        model = model_data
        # Fallback features list if just the model was pickled
        features_list = ['Time'] + [f'V{i}' for i in range(1, 29)] + ['Amount']
        print(f"Loaded raw model object, using default 30 features list")
except Exception as e:
    print(f"Error loading model: {e}")
    # Create a dummy model if load fails to prevent crash
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier()
    model.fit(np.zeros((1, 30)), [0])
    features_list = [f"f{i}" for i in range(30)]

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

    # ⚡ Bolt Optimization: Use predict_proba to compute probabilities and derive
    # the class prediction to avoid redundant evaluations caused by calling predict()
    probs = model.predict_proba(df_features)
    if probs.shape[1] > 1:
        probability = float(probs[0][1])
        prediction = int(model.classes_[np.argmax(probs, axis=1)][0])
    else:
        probability = float(probs[0][0]) if model.classes_[0] == 1 else 0.0
        prediction = int(model.classes_[0])

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

    # ⚡ Bolt Optimization: Compute probabilities and derive predictions in one pass
    probs = model.predict_proba(df_features)
    if probs.shape[1] > 1:
        probabilities = probs[:, 1]
        predictions = model.classes_[np.argmax(probs, axis=1)]
    else:
        probabilities = np.full(len(probs), 1.0) if model.classes_[0] == 1 else np.zeros(len(probs))
        predictions = np.full(len(probs), model.classes_[0])

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
