# Heart Attack Risk Analysis & Prediction

A full-stack machine learning application designed to predict the likelihood of a heart attack based on patient clinical data. This project features a robust **Logistic Regression** model, a high-performance **FastAPI** backend, and a modern **Next.js** frontend with **Tailwind CSS**.

## 🚀 Features
- **Machine Learning Model**: Built with `scikit-learn` using Logistic Regression, trained on a processed clinical dataset.
- **Data Preprocessing Pipeline**: Includes outlier detection using IQR, standard scaling for numerical data, and one-hot encoding for categorical variables.
- **RESTful API Engine**: Powered by **FastAPI** to serve model predictions instantly, complete with Swagger UI documentation and `pydantic` validation.
- **Modern Interactive Frontend**: A step-by-step interactive wizard built with **Next.js** and styled with **Tailwind CSS v4** to effortlessly collect patient data and display risk probabilities on a beautiful dashboard.

---

## 📂 Project Structure

```text
heart_attack_analysis/
│
├── backend/
│   ├── main.py              # FastAPI application & API endpoints
│   └── requirements.txt     # Python dependencies for the backend
│
├── data/
│   └── heart.csv            # Raw dataset containing patient clinical records
│
├── frontend/
│   ├── src/                 # Next.js source code (React components & pages)
│   ├── package.json         # Node.js dependencies
│   └── tailwind.config.*    # Tailwind CSS configuration
│
├── ml_model/
│   ├── train_model.py       # ML training script (preprocessing, training, export)
│   ├── heart_disease_model.pkl # Trained Logistic Regression model
│   ├── scaler.pkl           # Saved standard scaler for numeric features
│   └── model_columns.pkl    # Saved column structure to ensure consistent input
│
└── README.md                # Project documentation
```

---

## 🧠 Machine Learning & Dataset

### Dataset (`data/heart.csv`)
The project utilizes a heart disease dataset with 13 clinical features. 
- **Numeric Features**: Age, Resting Blood Pressure (`trtbps`), Cholesterol (`chol`), Maximum Heart Rate Achieved (`thalachh`), ST depression (`oldpeak`).
- **Categorical Features**: Sex, Chest Pain type (`cp`), Fasting Blood Sugar (`fbs`), Resting Electrocardiographic results (`restecg`), Exercise Induced Angina (`exng`), Slope (`slp`), Number of major vessels (`caa`), Thalassemia (`thall`).
- **Target (`output`)**: `0` (Low Risk) or `1` (High Risk).

### Model Training (`ml_model/train_model.py`)
1. **Outlier Removal**: Uses the Interquartile Range (IQR) method to filter out extreme values in numerical features.
2. **Encoding**: Applies `pd.get_dummies` to one-hot encode all categorical data.
3. **Scaling**: Normalizes numerical data using `StandardScaler` to ensure optimal performance for linear models.
4. **Algorithm**: Trains a **Logistic Regression** classifier (`max_iter=1000`).
5. **Export**: Serializes the trained model, the scaler, and the expected column structure as `.pkl` files using `joblib` so they can be securely loaded by the backend.

---

## ⚙️ Backend (FastAPI)

The backend exposes a simple yet powerful REST API to interact with the trained model.

- **Framework**: `FastAPI`
- **Data Validation**: Enforced via `Pydantic` models (`PatientData` class), ensuring the API only accepts properly typed requests.
- **Processing**: The `/predict` endpoint accepts a JSON payload, converts it into a pandas DataFrame, applies the identical one-hot encoding, aligns the columns to match the trained model using `.reindex`, applies the saved `scaler.pkl`, and finally returns a JSON response containing:
  - `risk_prediction` (0 or 1)
  - `risk_probability` (float between 0.0 and 1.0)
  - `message` ("High Risk!" or "Low Risk.")
- **CORS**: Configured to seamlessly allow requests from the Next.js frontend running locally on port `3000`.

---

## 🖥️ Frontend (Next.js)

The user interface is built with **Next.js** (App Router) and styled beautifully using **Tailwind CSS**.
- **Interactive Wizard**: A guided form UI component (`Wizard.jsx`) dynamically steps the user through the clinical questions.
- **Dashboard**: A comprehensive result component (`ResultDashboard.jsx`) coupled with engaging visualizations (`RadialGauge.jsx`) presents the final predicted risk score to the user.
- **API Integration**: Connects dynamically to the Python backend to fetch real-time predictions.

---

## 🛠️ How to Run the Project Locally

### 1. Train the Machine Learning Model (Optional)
If you wish to retrain the model on the dataset:
```bash
cd ml_model
python train_model.py
```
*(This will generate the `.pkl` files required by the backend).*

### 2. Start the Backend (FastAPI)
Navigate to the `backend` directory, install requirements, and start the uvicorn server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`. You can test endpoints via Swagger UI at `http://127.0.0.1:8000/docs`.

### 3. Start the Frontend (Next.js)
Open a new terminal, navigate to the `frontend` directory, install node modules, and start the dev server:
```bash
cd frontend
npm install
npm run dev
```
The web application will be accessible at `http://localhost:3000`.

---

## 📄 License
This project is open-source and available under the MIT License.
