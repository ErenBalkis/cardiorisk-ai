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
    allow_credentials=True,
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
    fbs: int
    restecg: int
    thalachh: int
    exng: int
    oldpeak: float
    slp: int
    caa: int
    thall: int

# --- API Endpoints ---

@app.get("/")
def read_root():
    return {"message": "Welcome to the Heart Attack Prediction API! Go to /docs for documentation."}

@app.post("/predict")
def predict_risk(data: PatientData):
    # 1. Convert the incoming JSON data to a single-row Pandas DataFrame
    df = pd.DataFrame([data.model_dump()])
    
    # 2. Convert categorical data to One-Hot Encoding format
    df = pd.get_dummies(df, columns=cat_features, drop_first=True)
    
    # 3. Column Matching (Critical Step)
    # The user's data may not have all categories. We enforce all columns expected
    # by the model and fill missing ones with 0.
    df = df.reindex(columns=model_columns, fill_value=0)
    
    # 4. Scale numerical data with the scaler (Bring to training standards)
    df[numeric_features] = scaler.transform(df[numeric_features])
    
    # 5. Make a prediction using the model
    prediction = model.predict(df)
    probability = model.predict_proba(df)[0][1] # Probability of Class 1 (High Risk)
    
    # 6. Return the result as JSON
    return {
        "risk_prediction": int(prediction[0]), 
        "risk_probability": round(float(probability), 4),
        "message": "High Risk!" if prediction[0] == 1 else "Low Risk."
    }