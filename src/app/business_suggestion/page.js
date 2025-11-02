"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function BusinessRecommendation() {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Location_Type: "",
    Budget_Range: "",
    Practical_Skills: "",
    Interest_Area: "",
    Work_Mode: "",
    Risk_Tolerance: ""
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Replace with your dataset unique values
  const interestAreas = [
    "Education",
    "Food & Beverage",
    "Technology",
    "Agriculture",
    "Art & Craft",
    "Domestic Services",
    "Creative Services",
    "E-commerce",
    "Apparel",
    "Beauty"
  ];

  // ✅ You can later load this dynamically from backend or JSON file
  const practicalSkills = [
    "Digital Marketing, Food Delivery",
    "Farming, Hair Styling",
    "Food Delivery, Cooking",
    "Dairy Management, Photography",
    "Makeup, Poultry Care",
    "Tailoring, Embroidery",
    "Crafting, Home Cleaning, Candle Making",
    "Poultry Care, Embroidery, Digital Marketing, Content Creation"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await fetch("https://stririsebackend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) setPrediction(data.predicted_business);
      else setError(data.error || "Prediction failed");
    } catch (err) {
      setError("Backend not reachable 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-pink-800">
          🌸 Business Idea Recommender
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto border border-pink-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Age</label>
              <input
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-pink-50 text-gray-800"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Gender</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Location Type */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Location Type</label>
              <select
                name="Location_Type"
                value={formData.Location_Type}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select</option>
                <option>Rural</option>
                <option>Urban</option>
                <option>Semi-Urban</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Budget Range</label>
              <select
                name="Budget_Range"
                value={formData.Budget_Range}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Practical Skills - now dropdown */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-pink-900 mb-1">Practical Skills</label>
              <select
                name="Practical_Skills"
                value={formData.Practical_Skills}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select Practical Skills</option>
                {practicalSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest Area - now dropdown */}
            <div className="md:col-span-2">
              <label className="block font-semibold text-pink-900 mb-1">Interest Area</label>
              <select
                name="Interest_Area"
                value={formData.Interest_Area}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select Interest Area</option>
                {interestAreas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Work Mode</label>
              <select
                name="Work_Mode"
                value={formData.Work_Mode}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select</option>
                <option>Home-based</option>
                <option>Office</option>
                <option>Field Work</option>
              </select>
            </div>

            {/* Risk Tolerance */}
            <div>
              <label className="block font-semibold text-pink-900 mb-1">Risk Tolerance</label>
              <select
                name="Risk_Tolerance"
                value={formData.Risk_Tolerance}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800"
              >
                <option value="">Select</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        {prediction && (
          <div className="mt-6 text-center bg-pink-200 rounded-xl p-4 shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-pink-800">
              Recommended Business Idea:
            </h2>
            <p className="text-2xl font-bold text-pink-900 mt-2">{prediction}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
