"use client";

import { useState } from "react";

interface PredictionResult {
  churn: boolean;
  churn_prob: number;
}

export default function ChurnPredictionForm() {
  // Default values from the example (high_risk_user)
  const [features, setFeatures] = useState({
    feature1: 600,   // Credit Score
    feature2: 50,    // Age
    feature3: 2,     // Tenure
    feature4: 130000.0,  // Balance
    feature5: 1,     // Number of Products
    feature6: 1,     // Has Credit Card
    feature7: 0,     // Is Active Member
    feature8: 110000.0,  // Estimated Salary
    feature9: 1,     // Geography (encoded)
    feature10: 0,    // Gender (encoded)
    feature11: 1,    // Other feature
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFeatures((prev) => ({ ...prev, [field]: numValue }));
    } else if (value === "") {
      setFeatures((prev) => ({ ...prev, [field]: 0 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const featureArray = [
        features.feature1,
        features.feature2,
        features.feature3,
        features.feature4,
        features.feature5,
        features.feature6,
        features.feature7,
        features.feature8,
        features.feature9,
        features.feature10,
        features.feature11,
      ];

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: featureArray }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-black dark:text-zinc-50">
        Customer Churn Prediction
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Enter customer details below to predict churn probability
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Credit Score
            </label>
            <input
              type="number"
              value={features.feature1}
              onChange={(e) => handleInputChange("feature1", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Age
            </label>
            <input
              type="number"
              value={features.feature2}
              onChange={(e) => handleInputChange("feature2", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Tenure
            </label>
            <input
              type="number"
              value={features.feature3}
              onChange={(e) => handleInputChange("feature3", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Balance
            </label>
            <input
              type="number"
              step="0.01"
              value={features.feature4}
              onChange={(e) => handleInputChange("feature4", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Number of Products
            </label>
            <input
              type="number"
              value={features.feature5}
              onChange={(e) => handleInputChange("feature5", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Has Credit Card (0 or 1)
            </label>
            <input
              type="number"
              min="0"
              max="1"
              value={features.feature6}
              onChange={(e) => handleInputChange("feature6", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Is Active Member (0 or 1)
            </label>
            <input
              type="number"
              min="0"
              max="1"
              value={features.feature7}
              onChange={(e) => handleInputChange("feature7", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Estimated Salary
            </label>
            <input
              type="number"
              step="0.01"
              value={features.feature8}
              onChange={(e) => handleInputChange("feature8", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Geography (encoded: 0, 1, or 2)
            </label>
            <input
              type="number"
              min="0"
              max="2"
              value={features.feature9}
              onChange={(e) => handleInputChange("feature9", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Gender (encoded: 0 or 1)
            </label>
            <input
              type="number"
              min="0"
              max="1"
              value={features.feature10}
              onChange={(e) => handleInputChange("feature10", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-black dark:text-zinc-50">
              Additional Feature
            </label>
            <input
              type="number"
              value={features.feature11}
              onChange={(e) => handleInputChange("feature11", e.target.value)}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-foreground text-background rounded-full font-medium hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Predicting..." : "Predict Churn"}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-zinc-50">
            Prediction Result
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-black dark:text-zinc-50">
                Churn Status:
              </span>
              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  result.churn
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                }`}
              >
                {result.churn ? "High Risk - Will Churn" : "Low Risk - Will Not Churn"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-medium text-black dark:text-zinc-50">
                Churn Probability:
              </span>
              <span className="text-xl font-bold text-black dark:text-zinc-50">
                {(result.churn_prob * 100).toFixed(2)}%
              </span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    result.churn_prob >= 0.5
                      ? "bg-red-500"
                      : result.churn_prob >= 0.3
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${result.churn_prob * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

