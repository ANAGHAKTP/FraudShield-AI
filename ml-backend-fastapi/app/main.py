from fastapi import FastAPI
import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

# Load trained model
model = pickle.load(open("models/fraud_model.pkl", "rb"))


# Request Schema
class Transaction(BaseModel):
    features: list


@app.get("/")
def home():
    return {"message": "Fraud Detection API Running"}


@app.post("/predict")
def predict(data: Transaction):

    features = np.array(data.features).reshape(1, -1)

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    return {
        "fraud_prediction": int(prediction),
        "fraud_probability": float(probability)
    }
