import time
import pandas as pd
import joblib
import numpy as np

model_data = joblib.load('app/models/fraud_model.pkl')
model = model_data["model"]
features_list = model_data["features"]

df = pd.DataFrame(np.random.rand(1000, len(features_list)), columns=features_list)

start = time.time()
for _ in range(10):
    pred = model.predict(df)
    prob = model.predict_proba(df)[:, 1]
t1 = time.time() - start

start = time.time()
for _ in range(10):
    prob = model.predict_proba(df)[:, 1]
    pred = (prob >= 0.5).astype(int)
t2 = time.time() - start

print(f"Original: {t1:.4f}s")
print(f"Optimized: {t2:.4f}s")
