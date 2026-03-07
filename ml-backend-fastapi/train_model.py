import pandas as pd
import numpy as np
import os
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

def generate_dummy_creditcard_data(n_samples=10000):
    """Generates a dummy dataset that mimics the kaggle credit card fraud dataset."""
    print("Generating a dummy dataset for testing because data/creditcard.csv was not found.")
    np.random.seed(42)
    # 30 features: Time, V1-V28, Amount
    time_col = np.random.uniform(0, 172792, n_samples)
    v_cols = np.random.normal(0, 1, size=(n_samples, 28))
    amount_col = np.random.exponential(scale=50, size=n_samples)
    
    X = np.column_stack([time_col, v_cols, amount_col])
    # 1% fraud
    y = np.random.choice([0, 1], size=n_samples, p=[0.99, 0.01])
    
    columns = ['Time'] + [f'V{i}' for i in range(1, 29)] + ['Amount', 'Class']
    data = np.column_stack([X, y])
    df = pd.DataFrame(data, columns=columns)
    df['Class'] = df['Class'].astype(int)
    
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/dummy_creditcard.csv', index=False)
    return df

def main():
    data_path = 'data/creditcard.csv'
    if os.path.exists(data_path):
        print(f"Loading data from {data_path}...")
        df = pd.read_csv(data_path)
    else:
        print(f"Warning: Dataset not found at {data_path}.")
        df = generate_dummy_creditcard_data(n_samples=10000)

    print(f"Dataset Shape: {df.shape}")
    print(f"Class Distribution: \n{df['Class'].value_counts(normalize=True)}")

    X = df.drop(columns=['Class'])
    y = df['Class']

    # Stratify is useful for imbalanced datasets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    print("Building model pipeline...")
    # Using a pipeline ensures that our API backend automatically scales the input when prediction occurs!
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('classifier', RandomForestClassifier(n_estimators=50, max_depth=10, class_weight='balanced', random_state=42, n_jobs=-1))
    ])

    print("Training model...")
    pipeline.fit(X_train, y_train)

    print("Evaluating model...")
    y_pred = pipeline.predict(X_test)
    
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    model_dir = 'app/models'
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'fraud_model.pkl')
    
    print(f"Saving model pipeline to {model_path}...")
    # Save the pipeline using pickle to be compatible with `fraud_detection.py` and joblib 
    # since we imported pickle in the backend
    with open(model_path, 'wb') as f:
        pickle.dump(pipeline, f)
        
    print("Model saved successfully!")

if __name__ == "__main__":
    main()
