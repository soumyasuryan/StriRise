"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { apiFetch } from "../utils/api";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Loader2 } from "lucide-react";

function BusinessRecommendation() {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Location_Type: "",
    Budget_Range: "",
    Practical_Skills: "",
    Interest_Area: "",
    Work_Mode: "",
    Risk_Tolerance: "",
  });
  const [roadmap, setRoadmap] = useState(null);
const [roadmapLoading, setRoadmapLoading] = useState(false);


  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

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
    "Beauty",
  ];

  const practicalSkills = [
    "Digital Marketing, Food Delivery",
    "Farming, Hair Styling",
    "Food Delivery, Cooking",
    "Dairy Management, Photography",
    "Makeup, Poultry Care",
    "Tailoring, Embroidery",
    "Crafting, Home Cleaning, Candle Making",
    "Poultry Care, Embroidery, Digital Marketing, Content Creation",
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await apiFetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) setPrediction(data.predicted_business);
      else setError(data.error || "Prediction failed");
    } catch {
      setError("Backend not reachable 😢");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit2 = async (e) => {
  e.preventDefault();
  setRoadmapLoading(true);
  setError(null);

  const payload = {
    gender: formData.Gender === "Male" ? "A man" :
            formData.Gender === "Female" ? "A woman" : "A youth",
    age: parseInt(formData.Age),
    location: formData.Location_Type,
    budget: formData.Budget_Range_inNum || formData.Budget_Range,
    skills: formData.Practical_Skills,
    risk_tolerance: formData.Risk_Tolerance.toLowerCase(),
    business_type: prediction || formData.Interest_Area
  };

  try {
    const res = await fetch(
      "https://soumyasuryan-stririse-backenddocker.hf.space/business-roadmap",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.success) {
      setRoadmap(data.roadmap || data.response);
    } else {
      setError(data.error || "Roadmap generation failed");
    }

  } catch (err) {
    setError("Roadmap service not reachable 😢");
  } finally {
    setRoadmapLoading(false);
  }
};


  return (
    <RequireAuth>
      <div className="min-h-screen bg-transparent flex flex-col">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div>
            <motion.h1
              className="text-4xl font-bold text-center mb-2 text-pink-800"
              style={{ opacity: 1, transform: "none" }}
            >
              💸 Business Idea Recommender
            </motion.h1>

            <motion.p
              className="text-pink-800 mb-10 text-md text-center"
              style={{ opacity: 1, transform: "none" }}
            >
              We mind your business, so you don't have to.
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white shadow-lg rounded-3xl p-8 max-w-3xl mx-auto border border-pink-200 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Age",
                  type: "number",
                  name: "Age",
                  placeholder: "Enter your age",
                },
              ].map((input) => (
                <div key={input.name}>
                  <label className="block font-semibold text-pink-900 mb-1">
                    {input.label}
                  </label>
                  <input
                    {...input}
                    value={formData[input.name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-pink-300 rounded-lg p-2 bg-pink-50 text-gray-800 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
                  />
                </div>
              ))}

              <Select
                label="Gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
              />
              <Select
                label="Location Type"
                name="Location_Type"
                value={formData.Location_Type}
                onChange={handleChange}
                options={["Rural", "Urban", "Semi-Urban"]}
              />
              
              <Select
                label="Budget Range"
                name="Budget_Range"
                value={formData.Budget_Range}
                onChange={handleChange}
                options={["Low", "Medium", "High"]}
              />
              <Select
                label="Budget Range (₹)"
                name="Budget_Range_inNum"
                value={formData.Budget_Range_inNum}
                onChange={handleChange}
                options={[
                  "5000-15000",
                  "15000-30000",
                  "30000-50000",
                  "50000-75000",
                  "75000-100000",
                  "100000-150000",
                  "150000-200000",
                  "200000+"
                ]}
              />
              <Select
                label="Practical Skills"
                name="Practical_Skills"
                value={formData.Practical_Skills}
                onChange={handleChange}
                options={practicalSkills}
                fullWidth
              />
              <Select
                label="Interest Area"
                name="Interest_Area"
                value={formData.Interest_Area}
                onChange={handleChange}
                options={interestAreas}
                fullWidth
              />
              <Select
                label="Work Mode"
                name="Work_Mode"
                value={formData.Work_Mode}
                onChange={handleChange}
                options={["Home-based", "Office", "Field Work"]}
              />
              <Select
                label="Risk Tolerance"
                name="Risk_Tolerance"
                value={formData.Risk_Tolerance}
                onChange={handleChange}
                options={["Low", "Medium", "High"]}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="mt-8 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-full transition-all flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Predicting...
                </>
              ) : (
                "💡 Get Recommendation"
              )}
            </motion.button>
          </motion.form>

          {error && (
            <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
          )}

          <AnimatePresence>
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10 text-center bg-gradient-to-r from-pink-200 to-pink-100 rounded-2xl p-6 shadow-md max-w-md mx-auto border border-pink-300"
              >
                <div className="flex items-center justify-center gap-2 text-pink-800 mb-2">
                  <Lightbulb className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Your Recommended Idea</h2>
                </div>
                <p className="text-2xl font-bold text-pink-900">
                  {prediction}
                </p>
              </motion.div>
              
            )}
          </AnimatePresence>
          {prediction && (
  <div className="mt-6 text-center">
    <p className="text-gray-700 mb-2">Click below after getting your recommended idea to generate a personalized AI roadmap 📋</p>
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={roadmapLoading}
      onClick={handleSubmit2}
      className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-full transition-all flex justify-center items-center"
    >
      {roadmapLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Roadmap...
        </>
      ) : (
        "📋 Generate AI Roadmap"
      )}
    </motion.button>

    {roadmap && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="mt-6 text-left bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-6 shadow-md max-w-3xl mx-auto border border-pink-300"
        ref={(el) => el && el.scrollIntoView({ behavior: "smooth" })}
      >
        <h3 className="text-xl font-semibold text-pink-800 mb-3">Your AI Roadmap</h3>
        <p className="text-pink-900 whitespace-pre-line">{roadmap}</p>
      </motion.div>
    )}
  </div>
)}


        </main>
        <Footer />
      </div>
    </RequireAuth>
  );
}

// ✅ Reusable Select Component
function Select({ label, name, value, onChange, options, fullWidth }) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label className="block font-semibold text-pink-900 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-pink-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400 bg-pink-50 text-gray-800 transition"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default withAuth(BusinessRecommendation);
