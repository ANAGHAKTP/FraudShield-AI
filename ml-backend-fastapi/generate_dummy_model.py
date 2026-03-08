import os
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

# Create a simple dummy dataset and train a model
X, y = make_classification(n_samples=500, n_features=29, random_state=42)
model = RandomForestClassifier(n_estimators=50, max_depth=5, random_state=42)
model.fit(X, y)

# Ensure the directory exists
os.makedirs('app/models', exist_ok=True)

# Save the dummy model to a pickle file
with open('app/models/fraud_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Dummy model generated successfully at app/models/fraud_model.pkl")
