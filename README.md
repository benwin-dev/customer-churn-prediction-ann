# Customer Churn Prediction App

A full-stack web application for predicting customer churn using machine learning. The application consists of a Next.js frontend and a FastAPI backend that serves a TensorFlow/Keras neural network model.

## Features

- **Interactive Web Interface**: User-friendly form to input customer features
- **Real-time Predictions**: Get instant churn probability predictions
- **Visual Results**: Display churn status with probability percentage and progress bar
- **RESTful API**: FastAPI backend with CORS support for frontend integration
- **Machine Learning Model**: Pre-trained Keras neural network model for churn prediction

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Dark Mode Support** - User-friendly interface

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow/Keras** - Machine learning model
- **NumPy** - Numerical computations
- **Joblib** - Model serialization
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Project Structure

```
customer-churn-prediction/
├── frontend/              # Next.js frontend application
│   ├── app/
│   │   ├── components/    # React components
│   │   │   └── ChurnPredictionForm.tsx
│   │   ├── page.tsx       # Main page
│   │   ├── layout.tsx     # App layout
│   │   └── globals.css    # Global styles
│   ├── package.json       # Frontend dependencies
│   └── tsconfig.json      # TypeScript configuration
│
└── server/                # FastAPI backend
    ├── main.py            # API server
    ├── requirements.txt   # Python dependencies
    ├── churn_model.keras  # Pre-trained model
    └── scaler.pkl         # Feature scaler
```

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** - Python package manager
- **npm** or **yarn** - Node package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd customer-churn-prediction
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start the Backend Server

```bash
# From the server directory
cd server
source venv/bin/activate  # If not already activated
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

### Start the Frontend Development Server

```bash
# From the frontend directory
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Documentation

### Endpoints

#### `GET /`
Health check endpoint that returns API status.

**Response:**
```json
{
  "status": "ok",
  "app": "churn-api",
  "version": "1.0.0"
}
```

#### `POST /predict`
Predicts customer churn probability based on input features.

**Request Body:**
```json
{
  "features": [600, 50, 2, 130000.0, 1, 1, 0, 110000.0, 1, 0, 1]
}
```

**Feature Description:**
1. Credit Score
2. Age
3. Tenure (years with company)
4. Balance
5. Number of Products
6. Has Credit Card (0 or 1)
7. Is Active Member (0 or 1)
8. Estimated Salary
9. Geography (encoded: 0, 1, or 2)
10. Gender (encoded: 0 or 1)
11. Additional Feature

**Response:**
```json
{
  "churn": true,
  "churn_prob": 0.75
}
```

**Response Fields:**
- `churn`: Boolean indicating if customer will churn (probability >= 0.5)
- `churn_prob`: Float between 0 and 1 representing churn probability

### Interactive API Documentation

FastAPI provides automatic interactive API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Usage

1. **Start both servers** (backend and frontend) as described above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Fill in the form** with customer details:
   - Credit Score
   - Age
   - Tenure
   - Balance
   - Number of Products
   - Has Credit Card (0 or 1)
   - Is Active Member (0 or 1)
   - Estimated Salary
   - Geography (encoded)
   - Gender (encoded)
   - Additional Feature
4. **Click "Predict Churn"** to get the prediction
5. **View the results** showing:
   - Churn status (High Risk / Low Risk)
   - Churn probability percentage
   - Visual progress bar

## Development

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Development

The backend uses FastAPI's auto-reload feature when run with `--reload` flag, so changes to `main.py` will automatically restart the server.

## Model Information

The application uses a pre-trained Keras neural network model (`churn_model.keras`) that was trained on customer data. The model expects:
- **11 input features** (normalized using the provided scaler)
- **Output**: Churn probability (0-1)

The model files (`churn_model.keras` and `scaler.pkl`) must be present in the `server/` directory for the API to function.

## Configuration

### CORS Settings

The backend is configured to allow requests from `http://localhost:3000`. To change this, modify the `allow_origins` in `server/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this for production
    ...
)
```

### API Port

The backend runs on port 8000 by default. To change this, modify the uvicorn command or update the frontend API URL in `ChurnPredictionForm.tsx`.

## Troubleshooting

### Backend Issues

- **Model not found**: Ensure `churn_model.keras` and `scaler.pkl` are in the `server/` directory
- **Port already in use**: Change the port in the uvicorn command: `--port 8001`
- **Import errors**: Make sure virtual environment is activated and dependencies are installed

### Frontend Issues

- **Cannot connect to API**: Verify backend is running on `http://localhost:8000`
- **CORS errors**: Check CORS settings in `server/main.py`
- **Build errors**: Clear `.next` directory and rebuild: `rm -rf .next && npm run build`

## License

[Add your license here]

## Contributors

[Add contributor information here]

