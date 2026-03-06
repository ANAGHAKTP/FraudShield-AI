import pickle
import os

# Assuming model is in app/models/fraud_model.pkl
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'fraud_model.pkl')

model = None

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
    else:
        print(f"Warning: Model not found at {MODEL_PATH}")

def predict_fraud(features: list) -> dict:
    if model is None:
        load_model()
    
    if model is None:
        raise Exception("Model could not be loaded")
        
    # The dummy model expects a 2D array: nsmaples x nfeatures
    prediction = model.predict([features])[0]
    
    # Optional: get probability if supported by model
    probability = 0.0
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba([features])[0][1])
        
    return {
        "prediction": int(prediction),
        "probability": probability
    }
