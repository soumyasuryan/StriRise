"use client";
import { useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { apiFetch } from "../utils/api";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Loader2 } from "lucide-react";


// Floating components you said you created
import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";

/* Small Step Indicator kept here to avoid missing import */
function StepIndicator({ step }) {
  const steps = [1, 2, 3, 4];
  return (
    <div className="flex justify-center gap-6 mb-6">
      {steps.map((s) => (
        <div
          key={s}
          className={`h-2 w-2 rounded-full transition-all cursor-pointer
    ${s <= step ? "bg-pink-500 scale-125" : "bg-gray-300"}
    hover:scale-150 hover:bg-pink-400`}
          title={`Step ${s}`}
        />

      ))}
    </div>
  );
}
function parseRoadmapText(text) {
  const sections = {
    profile: "",
    roadmap: "",
    tools: "",
    budget: "",
    marketing: "",
    govt: "",
    motivation: ""
  };

  // Helper
  const extract = (label) => {
    const regex = new RegExp(`${label}:([\\s\\S]*?)(?=\\n[A-Za-z ]+:|$)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  sections.profile = text.split("### Input:")[0]?.trim() || "";
  sections.roadmap = extract("4-Week Roadmap");
  sections.tools = extract("Tools & Materials");
  sections.budget = extract("Budget Estimate");
  sections.marketing = extract("Marketing Tip");
  sections.govt = extract("Sarkari Madad");
  sections.motivation = extract("Motivation");

  return sections;
}
function RoadmapCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-6 bg-gradient-to-r from-pink-50 to-white 
                 rounded-2xl border border-pink-200 shadow-lg space-y-4"
    >

      {/* Recommended Business Header */}
      <h2 className="text-2xl font-bold text-pink-700 text-center">
        Your Personalized Business Roadmap
      </h2>

      {/* Profile Summary */}
      {data.profile && (
        <div className="p-4 rounded-xl bg-white border border-pink-100 shadow-sm">
          <h3 className="text-lg font-semibold text-pink-800 mb-1">Profile Summary</h3>
          <p className="text-pink-900 leading-relaxed whitespace-pre-line">
            {data.profile}
          </p>
        </div>
      )}

      {/* Roadmap */}
      {data.roadmap && (
        <div className="p-4 rounded-xl bg-pink-50 border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-2">
            4-Week Action Plan
          </h3>
          <p className="text-pink-900 whitespace-pre-line">{data.roadmap}</p>
        </div>
      )}

      {/* Tools & Materials */}
      {data.tools && (
        <div className="p-4 rounded-xl bg-white border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-1">Tools & Materials</h3>
          <p className="text-pink-900 whitespace-pre-line">{data.tools}</p>
        </div>
      )}

      {/* Budget */}
      {data.budget && (
        <div className="p-4 rounded-xl bg-white border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-1">Budget Estimate</h3>
          <p className="text-pink-900 whitespace-pre-line">{data.budget}</p>
        </div>
      )}

      {/* Marketing Tips */}
      {data.marketing && (
        <div className="p-4 rounded-xl bg-white border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-1">Marketing Tip</h3>
          <p className="text-pink-900 whitespace-pre-line">{data.marketing}</p>
        </div>
      )}

      {/* Government Support */}
      {data.govt && (
        <div className="p-4 rounded-xl bg-white border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-800 mb-1">Government Support</h3>
          <p className="text-pink-900 whitespace-pre-line">{data.govt}</p>
        </div>
      )}

      {/* Motivation */}
      {data.motivation && (
        <div className="p-4 rounded-xl bg-pink-100 border border-pink-300 italic text-pink-800 rounded-xl">
          "{data.motivation}"
        </div>
      )}
    </motion.div>
  );
}


function BusinessRecommendation() {
  // form state
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Location_Type: "",
    Budget_Range: "",
    Budget_Range_inNum: "",
    Practical_Skills: "",
    Interest_Area: "",
    Work_Mode: "",
    Risk_Tolerance: "",
  });

  // existing states you had
  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const [loading, setLoading] = useState(false); // predicting
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // step control
  const [step, setStep] = useState(1);

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
  // Returns true if all required fields in the current step are filled
const validateStep = (currentStep) => {
  switch (currentStep) {
    case 1:
      return formData.Age && formData.Gender;
    case 2:
      return formData.Location_Type && formData.Budget_Range && formData.Budget_Range_inNum;
    case 3:
      return (
        formData.Practical_Skills &&
        formData.Interest_Area &&
        formData.Work_Mode &&
        formData.Risk_Tolerance
      );
    default:
      return true;
  }
};


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // === keep your original handleSubmit (predict) but move to Step 4 on success ===
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      if (data.success) {
        setPrediction(data.predicted_business);
        setStep(4); // go to results when prediction arrives
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch {
      setError("Backend not reachable 😢");
    } finally {
      setLoading(false);
    }
  };

  // === keep your original handleSubmit2 (roadmap generator) exactly, wired to formData & prediction ===
  const handleSubmit2 = async (e) => {
    if (e) e.preventDefault();
    setRoadmapLoading(true);
    setError(null);

    const payload = {
      gender:
        formData.Gender === "Male"
          ? "A man"
          : formData.Gender === "Female"
            ? "A woman"
            : "A youth",
      age: parseInt(formData.Age),
      location: formData.Location_Type,
      budget: formData.Budget_Range_inNum || formData.Budget_Range,
      skills: formData.Practical_Skills,
      risk_tolerance: (formData.Risk_Tolerance || "").toLowerCase(),
      business_type: prediction || formData.Interest_Area,
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

  // navigation helpers
const next = () => {
  if (validateStep(step)) {
    setStep((s) => Math.min(s + 1, 4));
    setError(null); // clear any previous errors
  } else {
    setError("Please fill all required fields in this step before proceeding.");
  }
};

  const prev = () => setStep((s) => Math.max(s - 1, 1));
  function RoadmapLoadingAnimation() {
  const steps = [
    "Analyzing your profile…",
    "Identifying your strengths…",
    "Matching business opportunities…",
    "Curating personalized roadmap…",
    "Evaluating risk factors…",
    "Customizing strategy for budget…",
    "Integrating your skills and interests…",
    "Finalizing your AI roadmap…"
  ];

  return (
    <div className="bg-white rounded-lg border border-pink-100 shadow-sm p-4 mt-4">
      {steps.map((stepText, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 5, duration: 1 }} // ⬅️ each step delayed by 5s
          className="flex items-center gap-2 mb-2"
        >
          <Loader2 className="w-4 h-4 text-pink-500 animate-spin" />
          <span className="text-pink-700">{stepText}</span>
        </motion.div>
      ))}
    </div>
  );
}



  return (
    <RequireAuth>
      <div className="min-h-screen bg-transparent flex flex-col backdrop-blur-xs">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-10">
          <div>
            <div className="flex items-center justify-center gap-3 mt-6 ">
  <div className="h-[2px] md:w-20 bg-pink-300 px-auto"></div>
  <span className="text-3xl font-bold text-pink-600 tracking-wide text-center">
    Your Ideal Business, Curated by AI
  </span>
  <div className="h-[2px] md:w-20 bg-pink-300"></div>
</div>


            <motion.p
              className="text-pink-800 mb-6 text-md text-center"
              style={{ opacity: 1, transform: "none" }}
            >
              We mind your business, so you don't have to.
            </motion.p>
          </div>

          {/* Step indicator / map */}
          <StepIndicator step={step} />

          {/* form card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-3xl p-8 max-w-3xl mx-auto border border-pink-200 backdrop-blur-sm"
          >
            {/* STEP 1 - PERSONAL */}
            {step === 1 && (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-semibold text-pink-700">
                  Personal Information
                </h2>

                <FloatingInput
                  label="Age"
                  name="Age"
                  type="number"
                  value={formData.Age}
                  onChange={handleChange}
                  required
                />

                <FloatingSelect
                  label="Gender"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                />

                <div className="flex justify-end pt-2">
                  <button
                    onClick={next}
                    className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all hover:shadow-lg hover:scale-105"

                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 - FINANCIAL */}
            {step === 2 && (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-semibold text-pink-700">
                  Financial Condition
                </h2>

                <FloatingSelect
                  label="Location Type"
                  name="Location_Type"
                  value={formData.Location_Type}
                  onChange={handleChange}
                  options={["Rural", "Urban", "Semi-Urban"]}
                />

                <FloatingSelect
                  label="Budget Range"
                  name="Budget_Range"
                  value={formData.Budget_Range}
                  onChange={handleChange}
                  options={["Low", "Medium", "High"]}
                />

                <FloatingSelect
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
                    "200000+",
                  ]}
                />

                <div className="flex justify-between pt-2">
                  <button
                    onClick={prev}
                    className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all hover:shadow-lg hover:scale-105"

                  >
                    Back
                  </button>

                  <button
                    onClick={next}
                    className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all hover:shadow-lg hover:scale-105"

                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - INTERESTS & SKILLS + Predict button */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-semibold text-pink-700">
                  Interests & Skills
                </h2>

                <FloatingSelect
                  label="Practical Skills"
                  name="Practical_Skills"
                  value={formData.Practical_Skills}
                  onChange={handleChange}
                  options={practicalSkills}
                />

                <FloatingSelect
                  label="Interest Area"
                  name="Interest_Area"
                  value={formData.Interest_Area}
                  onChange={handleChange}
                  options={interestAreas}
                />

                <FloatingSelect
                  label="Work Mode"
                  name="Work_Mode"
                  value={formData.Work_Mode}
                  onChange={handleChange}
                  options={["Home-based", "Office", "Field Work"]}
                />

                <FloatingSelect
                  label="Risk Tolerance"
                  name="Risk_Tolerance"
                  value={formData.Risk_Tolerance}
                  onChange={handleChange}
                  options={["Low", "Medium", "High"]}
                />

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-all hover:shadow-lg hover:scale-105"

                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full 
             transition-all hover:shadow-lg hover:scale-105 
             flex items-center justify-center gap-2
             min-w-[140px]"   // ⭐ keeps width fixed
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      "💡 Predict"
                    )}
                  </button>

                </div>
              </form>
            )}

            {/* STEP 4 - RESULT + generate roadmap (calls handleSubmit2) */}
            {step === 4 && (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-xl font-semibold text-pink-700">
                  Suggested Business
                </h2>

                <AnimatePresence>
                  {prediction ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(255,105,180,0.3)" }}
                      className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-2xl p-6 shadow-md border border-pink-300"
                    >

                      <div className="flex items-center gap-3 mb-3">
                        <Lightbulb className="w-6 h-6 text-pink-700" />
                        <h3 className="text-lg font-semibold text-pink-800">
                          {prediction}
                        </h3>
                      </div>

                      <p className="text-pink-900 whitespace-pre-line">
                        {/** if there is any description from prediction, show it */}
                      </p>
                    </motion.div>
                  ) : (
                    <p className="text-gray-600">No suggestion yet.</p>
                  )}
                </AnimatePresence>

                {/* Show backend roadmap generator button (your handleSubmit2) */}
                <div className="flex flex-col gap-3">
                  <p className="text-gray-700">
                    Click below to generate a personalized AI roadmap for the
                    suggested business.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="px-4 py-2 bg-gray-500 rounded-full"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleSubmit2}
                      disabled={roadmapLoading}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center"
                    >
                      {roadmapLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Roadmap...
                        </>
                      ) : (
                        "📋 Generate AI Roadmap"
                      )}
                    </button>
                  </div>

                  {/* Show roadmap when available */}
                  {/* Show roadmap when available or loading animation */}
{roadmapLoading && !roadmap ? (
  <RoadmapLoadingAnimation />
) : (
  roadmap && (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-white rounded-lg border border-pink-100 shadow-sm"
    >
      <h4 className="text-pink-800 font-semibold mb-2">
        Your AI Roadmap
      </h4>
      <RoadmapCard data={parseRoadmapText(roadmap)} />


    </motion.div>
  )
)}

                </div>
              </div>
            )}
          </motion.div>

          {/* error area */}
          {error && (
            <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
          )}
        </main>

        <Footer />
      </div>
    </RequireAuth>
  );
}

export default withAuth(BusinessRecommendation);
