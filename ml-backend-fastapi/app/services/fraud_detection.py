import joblib
import pandas as pd
import os
import shap

# Assuming model is in app/models/fraud_model.pkl
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'fraud_model.pkl')

model = None
explainer = None
features_list = None

def load_model():
    global model, explainer, features_list
    if os.path.exists(MODEL_PATH):
        model_data = joblib.load(MODEL_PATH)
        model = model_data["model"]
        features_list = model_data["features"]
        # Initialize SHAP explainer on the random forest classifier part
        # SHAP requires the actual model, not the pipeline
        explainer = shap.TreeExplainer(model.named_steps['classifier'])
    else:
        print(f"Warning: Model not found at {MODEL_PATH}")

def predict_fraud(features: list) -> dict:
    if model is None or explainer is None:
        load_model()
    
    if model is None:
        raise Exception("Model could not be loaded")
        
    df_features = pd.DataFrame([features], columns=features_list)
    prediction = model.predict(df_features)[0]
    
    # Optional: get probability if supported by model
    probability = 0.0
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(df_features)[0][1])
        
    # Calculate SHAP values
    # We must transform the DataFrame into scaled features first before giving it to SHAP explainer
    # We can do this by using the pipeline steps before the classifier.
    # We don't have access to the exact intermediate step directly without slicing pipeline (scikit-learn >= 1.2 required)
    # So we apply scaler and explicitly bypass 'smote' because it's only used for training
    X_transformed = model.named_steps["scaler"].transform(df_features)
    shap_values = explainer.shap_values(X_transformed)
    
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
