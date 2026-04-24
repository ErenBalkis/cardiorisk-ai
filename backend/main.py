from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

# --- Set File Paths ---
# Get the directory of main.py and navigate to the ml_model directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "ml_model")

# --- Load Models and Settings ---
# These files are loaded into memory only once when the application starts
model = joblib.load(os.path.join(MODEL_DIR, "heart_disease_model.pkl"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))
model_columns = joblib.load(os.path.join(MODEL_DIR, "model_columns.pkl"))

# Column names defined on the ML side
numeric_features = ['age', 'trtbps', 'chol', 'thalachh', 'oldpeak']
cat_features = ['sex', 'cp', 'fbs', 'restecg', 'exng', 'slp', 'caa', 'thall']

# --- Initialize FastAPI Application ---
app = FastAPI(
    title="Heart Attack Risk Prediction API",
    description="Analyzes the risk of heart attack in patients using a machine learning model."
)

# --- CORS Middleware ---
# Enables communication between the frontend (Next.js dev server) and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Validation Schema (Pydantic) ---
class PatientData(BaseModel):
    age: int
    sex: int
    cp: int
    trtbps: int
    chol: int
    exng: int
    
    fbs: int = 0
    restecg: int = 0
    thalachh: int = 150
    oldpeak: float = 1.0
    slp: int = 1
    caa: int = 0
    thall: int = 2

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the Heart Attack Prediction API! Go to /docs for documentation."}

@app.post("/predict")
def predict_risk(data: PatientData):
    # 1. Convert the incoming JSON data to a dictionary
    input_data = data.model_dump()
    
    # 2. Build a zeroed-out DataFrame with the exact columns the model expects
    df = pd.DataFrame([{col: 0 for col in model_columns}])
    
    # 3. Fill in the numeric features directly
    for feat in numeric_features:
        df[feat] = input_data[feat]
    
    # 4. Manually apply one-hot encoding for categorical features
    # NOTE: pd.get_dummies on a single row with drop_first=True silently drops
    # ALL categorical columns because only one category is present per row.
    # We must manually set the correct dummy column to 1.
    for feat in cat_features:
        val = input_data[feat]
        if val == 0:
            # Value 0 is the "dropped first" category — all dummy columns stay 0
            continue
        col_name = f"{feat}_{val}"
        if col_name in model_columns:
            df[col_name] = 1
    
    # 5. Scale numerical data with the scaler (bring to training standards)
    df[numeric_features] = scaler.transform(df[numeric_features])
    
    # 6. Make a prediction using the model
    # The model was trained with inverted target: 1 = disease (high risk), 0 = healthy.
    # Therefore, predict_proba[0][1] directly gives the disease probability.
    probability = model.predict_proba(df)[0][1]  # P(class=1) = P(Disease / High Risk)
    risk_prediction = 1 if probability >= 0.5 else 0
    
    # 7. Return the result as JSON
    return {
        "risk_prediction": risk_prediction, 
        "risk_probability": round(float(probability), 4),
        "message": "High Risk!" if risk_prediction == 1 else "Low Risk."
    }