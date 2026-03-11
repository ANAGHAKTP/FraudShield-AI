import joblib
import pandas as pd

try:
    model_data = joblib.load('app/models/fraud_model.pkl')
    model = model_data["model"]
    feature_list = model_data["features"]
    print("Model loaded successfully")
except Exception as e:
    print("Error loading model:", e)

print("\nTesting 29 features:")
try:
    pred = model.predict(pd.DataFrame(np.zeros((1,29)), columns=feature_list[:29]))
    print("Success 29: ", pred)
except Exception as e:
    print("Failed 29: ", e)
    
print("\nTesting 30 features:")
try:
    pred = model.predict(pd.DataFrame(np.zeros((1,30)), columns=feature_list))
    print("Success 30: ", pred)
except Exception as e:
    print("Failed 30: ", e)
