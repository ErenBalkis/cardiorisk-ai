import numpy as np
import pandas as pd
import joblib
import os

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

import warnings

warnings.filterwarnings("ignore")

# 1. Load Data
file_path = os.path.join("..", "data", "heart.csv")
df = pd.read_csv(file_path)

# 2. Outlier Removal (IQR Method)
numeric_features = ['age', 'trtbps', 'chol', 'thalachh', 'oldpeak']
for i in numeric_features:
    Q1 = np.percentile(df.loc[:, i], 25)
    Q3 = np.percentile(df.loc[:, i], 75)
    IQR = Q3 - Q1

    upper = np.where(df.loc[:, i] >= (Q3 + 2.5 * IQR))
    lower = np.where(df.loc[:, i] <= (Q1 - 2.5 * IQR))

    df.drop(upper[0], inplace=True, errors='ignore')
    df.drop(lower[0], inplace=True, errors='ignore')

# 3. Invert Target Variable
# In the original dataset: output=0 means DISEASE, output=1 means HEALTHY.
# We invert so that: 1 = disease (high risk), 0 = healthy (low risk).
# This makes predict_proba[0][1] directly return the disease probability.
df['output'] = 1 - df['output']

# 4. Data Preprocessing (Encoding)
cat_features = ['sex', 'cp', 'fbs', 'restecg', 'exng', 'slp', 'caa', 'thall']
df_encoded = pd.get_dummies(df, columns=cat_features, drop_first=True)

X = df_encoded.drop(["output"], axis=1)
y = df_encoded["output"]

# 5. Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Scaling
scaler = StandardScaler()
X_train[numeric_features] = scaler.fit_transform(X_train[numeric_features])
X_test[numeric_features] = scaler.transform(X_test[numeric_features])

# 7. Model Training
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)

# Check performance
y_pred = model.predict(X_test)
print(f"Model trained successfully. Test Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(f"Target encoding: 1 = disease (high risk), 0 = healthy (low risk)")

# 8. Export Model and Components
joblib.dump(model, "heart_disease_model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(list(X_train.columns), "model_columns.pkl")
print("'.pkl' files saved successfully!")