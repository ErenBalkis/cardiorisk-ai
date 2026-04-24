<div align="center">

# 🫀 CardioRisk AI

**AI-Powered Heart Attack Risk Prediction**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-cardiorisk--ai.vercel.app-E63946?style=for-the-badge)](https://cardiorisk-ai.vercel.app/)
[![Dataset](https://img.shields.io/badge/📊_Dataset-Kaggle-20BEFF?style=for-the-badge)](https://www.kaggle.com/datasets/sonialikhan/heart-attack-analysis-and-prediction-dataset)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.5-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)

A full-stack machine learning web application that predicts cardiovascular risk using clinical patient data. Built with a **Logistic Regression** model (~90% accuracy), served via a **FastAPI** backend, and presented through a modern **Next.js** interactive wizard interface.

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **ML Model** | Logistic Regression trained on the UCI Heart Disease dataset with ~90% test accuracy |
| 🔄 **Data Pipeline** | Automated outlier removal (IQR), StandardScaler normalization, one-hot encoding |
| ⚡ **REST API** | FastAPI backend with Pydantic validation, Swagger UI docs, and instant predictions |
| 🎨 **Modern UI** | Step-by-step wizard with animated transitions, radial gauge, and risk dashboard |
| 📱 **Responsive** | Fully responsive design built with Next.js 15 & Tailwind CSS v4 |
| 🔬 **Advanced Mode** | Optional clinical parameters (7 extra fields) for more precise predictions |

---

## 🏗️ Architecture

```
┌─────────────────┐     HTTP/JSON      ┌─────────────────┐
│                 │  ───────────────►   │                 │
│   Next.js App   │                    │  FastAPI Server  │
│   (Vercel)      │  ◄───────────────  │  (Render)        │
│                 │   risk_probability │                 │
└─────────────────┘                    └────────┬────────┘
                                                │
                                       ┌────────▼────────┐
                                       │  ML Pipeline    │
                                       │  ├─ model.pkl   │
                                       │  ├─ scaler.pkl  │
                                       │  └─ columns.pkl │
                                       └─────────────────┘
```

---

## 📂 Project Structure

```
cardiorisk-ai/
│
├── backend/
│   ├── main.py                  # FastAPI application & /predict endpoint
│   └── requirements.txt         # Python dependencies
│
├── data/
│   └── heart.csv                # UCI Heart Disease dataset (303 records)
│
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router (pages & layout)
│   │   ├── components/          # React components (Wizard, Dashboard, Gauge)
│   │   │   └── steps/           # Individual wizard step components
│   │   └── lib/                 # Constants, defaults & configurations
│   ├── package.json
│   └── tailwind.config.*
│
├── ml_model/
│   ├── train_model.py           # Training script (preprocessing → export)
│   ├── heart_disease_model.pkl  # Serialized Logistic Regression model
│   ├── scaler.pkl               # Fitted StandardScaler for numeric features
│   └── model_columns.pkl        # Expected column order after encoding
│
└── README.md
```

---

## 🧠 Machine Learning

### Dataset
The [Heart Attack Analysis & Prediction Dataset](https://www.kaggle.com/datasets/sonialikhan/heart-attack-analysis-and-prediction-dataset) contains **303 patient records** with 13 clinical features:

| Type | Features |
|------|----------|
| **Numeric** | `age`, `trtbps` (resting BP), `chol` (cholesterol), `thalachh` (max heart rate), `oldpeak` (ST depression) |
| **Categorical** | `sex`, `cp` (chest pain type), `fbs` (fasting blood sugar), `restecg` (resting ECG), `exng` (exercise angina), `slp` (ST slope), `caa` (major vessels), `thall` (thalassemia) |
| **Target** | `output` — `0` = higher risk of heart disease, `1` = lower risk |

### Training Pipeline

```
Raw Data → Outlier Removal (IQR) → One-Hot Encoding → Train/Test Split (80/20)
                                                            │
                                                    StandardScaler (fit on train)
                                                            │
                                                    Logistic Regression (max_iter=1000)
                                                            │
                                                    Export: model.pkl, scaler.pkl, columns.pkl
```

- **Algorithm**: Logistic Regression
- **Test Accuracy**: ~90%
- **Splitting**: 80/20 with `random_state=42`

---

## ⚙️ Backend — FastAPI

The `/predict` endpoint processes incoming patient data through the exact same pipeline used during training:

1. **Receive** JSON payload validated by Pydantic (`PatientData` schema)
2. **Build** a zeroed DataFrame matching the model's expected columns
3. **Encode** categorical features via manual one-hot encoding (avoids single-row `pd.get_dummies` pitfalls)
4. **Scale** numeric features using the saved `StandardScaler`
5. **Predict** disease probability using the trained model
6. **Return** `risk_prediction`, `risk_probability`, and `message`

> **Note**: The dataset uses inverted labels — `output=0` represents disease. The API correctly returns `P(class=0)` as the risk probability.

---

## 🖥️ Frontend — Next.js

The user interface provides a guided, step-by-step experience:

- **Interactive Wizard** (`Wizard.jsx`) — 6 steps collecting core clinical data
- **Radial Gauge** (`RadialGauge.jsx`) — Animated risk visualization
- **Result Dashboard** (`ResultDashboard.jsx`) — Comprehensive breakdown with personalized insights
- **Advanced Panel** — Optional accordion for 7 additional clinical parameters with smart defaults

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/ErenBalkis/cardiorisk-ai.git
cd cardiorisk-ai
```

### 2. Train the Model *(optional — pre-trained .pkl files are included)*
```bash
cd ml_model
pip install numpy pandas scikit-learn joblib
python train_model.py
```

### 3. Start the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API available at `http://127.0.0.1:8000` — Swagger docs at [`/docs`](http://127.0.0.1:8000/docs)

### 4. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
App available at `http://localhost:3000`

### 5. Environment Variables
Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
For production (Vercel), set this to your deployed backend URL.

---

## 🌐 Live Demo

**Frontend**: [cardiorisk-ai.vercel.app](https://cardiorisk-ai.vercel.app/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
