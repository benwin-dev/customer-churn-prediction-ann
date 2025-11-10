import numpy as np
import joblib
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.models import load_model


# Initialize FastAPI app
app = FastAPI(title="Customer Churn Prediction API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model and scaler once at startup
model = load_model("churn_model.keras")
scaler = joblib.load("scaler.pkl")


class PredictRequest(BaseModel):
    features: List[float]


class PredictResponse(BaseModel):
    churn: bool
    churn_prob: float


def predict_churn_probability(user_features: List[float]) -> float:
    """Return churn probability (0-1) for a single user feature vector."""
    input_array = np.array(user_features).reshape(1, -1)
    scaled_input = scaler.transform(input_array)
    prediction = model.predict(scaled_input)
    churn_prob = float(prediction[0][0])
    return churn_prob


@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest) -> PredictResponse:
    churn_prob = predict_churn_probability(request.features)
    churn_flag = churn_prob >= 0.5
    return PredictResponse(churn=churn_flag, churn_prob=churn_prob)


# Optional root endpoint for health/info
@app.get("/")
def read_root():
    return {"status": "ok", "app": "churn-api", "version": "1.0.0"}