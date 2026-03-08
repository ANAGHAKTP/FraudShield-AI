import pickle
import os
import shap

# Assuming model is in app/models/fraud_model.pkl
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'fraud_model.pkl')

model = None
explainer = None

def load_model():
    global model, explainer
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        # Initialize SHAP explainer
        explainer = shap.TreeExplainer(model)
    else:
        print(f"Warning: Model not found at {MODEL_PATH}")

def predict_fraud(features: list) -> dict:
    if model is None or explainer is None:
        load_model()
    
    if model is None:
        raise Exception("Model could not be loaded")
        
    # The dummy model expects a 2D array: nsmaples x nfeatures
    feature_array = [features]
    prediction = model.predict(feature_array)[0]
    
    # Optional: get probability if supported by model
    probability = 0.0
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(feature_array)[0][1])
        
    # Calculate SHAP values
    shap_values = explainer.shap_values(feature_array)
    
    # Extract feature importance for the single sample
    # Random Forest shap_values produces a list [negative_class_impact, positive_class_impact]
    # We use positive class (fraud probability driver)
    positive_impacts = shap_values[1][0] if isinstance(shap_values, list) else shap_values[0]
    
    feature_importance = sorted(
        [
            {
                "feature": f"V{i+1}",
                "impact": float(abs(positive_impacts[i]))
            }
            for i in range(len(features))
        ],
        key=lambda x: x["impact"],
        reverse=True
    )[:3]
        
    return {
        "prediction": int(prediction),
        "probability": probability,
        "label": "fraud" if probability > 0.5 else "legitimate",
        "fraud_probability": probability,
        "top_features": feature_importance
    }
