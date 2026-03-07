import pickle
import numpy as np

try:
    model = pickle.load(open('models/fraud_model.pkl','rb'))
    print("Model loaded successfully")
except Exception as e:
    print("Error loading model:", e)

print("\nTesting 29 features:")
try:
    pred = model.predict(np.zeros((1,29)))
    print("Success 29: ", pred)
except Exception as e:
    print("Failed 29: ", e)
    
print("\nTesting 30 features:")
try:
    pred = model.predict(np.zeros((1,30)))
    print("Success 30: ", pred)
except Exception as e:
    print("Failed 30: ", e)
