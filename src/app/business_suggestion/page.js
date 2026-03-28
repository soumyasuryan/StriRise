"use client";
import { useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { apiFetch } from "../utils/api";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Loader2, ChevronRight, ChevronLeft } from "lucide-react";

import FloatingInput from "../components/FloatingInput";
import FloatingSelect from "../components/FloatingSelect";

/* ── Step Indicator ── */
function StepIndicator({ step }) {
  const steps = ["Personal", "Financial", "Skills", "Results"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const s = i + 1;
        const active = s === step;
        const done = s < step;
        return (
          <div key={s} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                  ${active ? "bg-gradient-to-br from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-900/40 scale-110" :
                    done ? "bg-pink-900/60 text-pink-300 border border-pink-700/50" :
                    "bg-white/5 text-white/25 border border-white/10"}`}
              >
                {done ? "✓" : s}
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${active ? "text-pink-400" : done ? "text-pink-600/60" : "text-white/20"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-px mb-4 transition-all duration-500 ${done ? "bg-gradient-to-r from-pink-600 to-rose-500" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Roadmap Loading ── */
function RoadmapLoadingAnimation() {
  const steps = [
    "Analyzing your profile…",
    "Identifying your strengths…",
    "Matching business opportunities…",
    "Curating personalized roadmap…",
    "Evaluating risk factors…",
    "Customizing strategy for budget…",
    "Integrating skills and interests…",
    "Finalizing your AI roadmap…",
  ];
  return (
    <div className="rounded-2xl border border-pink-900/30 bg-[#1a0510]/60 p-6 mt-4 space-y-3">
      {steps.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 5, duration: 1 }}
          className="flex items-center gap-3"
        >
          <Loader2 className="w-3.5 h-3.5 text-pink-500 animate-spin flex-shrink-0" />
          <span className="text-sm text-white/50">{text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Roadmap Card ── */
function RoadmapCard({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-4"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-900/40" />
        <h2 className="text-base font-bold text-pink-400 tracking-wide uppercase text-sm">
          Your Personalized Roadmap
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-900/40" />
      </div>

      {data.profile_summary && (
        <div className="rounded-xl border border-pink-900/30 bg-[#1a0510]/60 p-5">
          <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-widest mb-3">
            Action Plan
          </h3>
          <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
            {data.four_week_action_plan}
          </p>
        </div>
      )}

      {data.marketing_tips && data.marketing_tips.length > 0 && (
        <div className="rounded-xl border border-pink-900/30 bg-[#1a0510]/60 p-5">
          <h3 className="text-sm font-semibold text-pink-400 uppercase tracking-widest mb-3">
            Marketing Tips
          </h3>
          <ul className="space-y-2">
            {data.marketing_tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                <span className="text-pink-500 mt-0.5 flex-shrink-0">✦</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

/* ── Nav Buttons ── */
function NavButtons({ onBack, onNext, nextLabel = "Next", nextDisabled = false, nextLoading = false }) {
  return (
    <div className="flex justify-between pt-4 mt-2 border-t border-pink-900/20">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      ) : <div />}

      <button
        type={onNext ? "button" : "submit"}
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold text-white
          bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400
          shadow-md shadow-pink-900/30 hover:shadow-pink-700/40
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300 hover:scale-105 min-w-[120px] justify-center"
      >
        {nextLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Loading…</>
        ) : (
          <>{nextLabel} {!nextLoading && <ChevronRight className="w-4 h-4" />}</>
        )}
      </button>
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title }) {
  return (
    <div className="mb-6">
      <div className="h-[2px] w-8 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full mb-3" />
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
  );
}

/* ── Main Component ── */
function BusinessRecommendation() {
  const [formData, setFormData] = useState({
    Age: "", Gender: "", Location_Type: "", Budget_Range: "",
    Budget_Range_inNum: "", Practical_Skills: "", Interest_Area: "",
    Work_Mode: "", Risk_Tolerance: "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const interestAreas = ["Education","Food & Beverage","Technology","Agriculture","Art & Craft","Domestic Services","Creative Services","E-commerce","Apparel","Beauty"];
  const practicalSkills = ["Digital Marketing, Food Delivery","Farming, Hair Styling","Food Delivery, Cooking","Dairy Management, Photography","Makeup, Poultry Care","Tailoring, Embroidery","Crafting, Home Cleaning, Candle Making","Poultry Care, Embroidery, Digital Marketing, Content Creation"];

  const validateStep = (s) => {
    if (s === 1) return formData.Age && formData.Gender;
    if (s === 2) return formData.Location_Type && formData.Budget_Range && formData.Budget_Range_inNum;
    if (s === 3) return formData.Practical_Skills && formData.Interest_Area && formData.Work_Mode && formData.Risk_Tolerance;
    return true;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
      if (data.success) { setPrediction(data.predicted_business); setStep(4); }
      else setError(data.error || "Prediction failed");
    } catch { setError("Backend not reachable 😢"); }
    finally { setLoading(false); }
  };

  const handleSubmit2 = async (e) => {
    if (e) e.preventDefault();
    setRoadmapLoading(true);
    setError(null);
    const payload = {
      gender: formData.Gender === "Male" ? "A man" : formData.Gender === "Female" ? "A woman" : "A youth",
      age: parseInt(formData.Age),
      location: formData.Location_Type,
      budget: formData.Budget_Range_inNum || formData.Budget_Range,
      skills: formData.Practical_Skills,
      risk_tolerance: (formData.Risk_Tolerance || "").toLowerCase(),
      business_type: prediction || formData.Interest_Area,
    };
    try {
      const res = await fetch("https://soumyasuryan-stririse-backenddocker.hf.space/business-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setRoadmap({ profile_summary: data.profile_summary, four_week_action_plan: data.four_week_action_plan, marketing_tips: data.marketing_tips, tools_and_equipments: data.tools_and_equipments });
      } else setError(data.error || "Roadmap generation failed");
    } catch { setError("Roadmap service not reachable 😢"); }
    finally { setRoadmapLoading(false); }
  };

  const next = () => {
    if (validateStep(step)) { setStep((s) => Math.min(s + 1, 4)); setError(null); }
    else setError("Please fill all required fields before proceeding.");
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[#0d0208] flex flex-col">
        <NavBar />

        <main className="flex-grow container mx-auto px-4 py-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium tracking-wide mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              AI-Powered Business Advisor
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3">
              Your Ideal Business,{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Curated by AI
              </span>
            </h1>
            <p className="text-white/45 text-base">
              We mind your business, so you don't have to.
            </p>
          </motion.div>

          <StepIndicator step={step} />

          {/* Form Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-pink-900/30 bg-[#1a0510]/70 backdrop-blur-sm p-6 md:p-10 max-w-2xl mx-auto overflow-hidden"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-600 to-rose-400" />
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-pink-700/10 blur-3xl pointer-events-none" />

            <div className="relative">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 gap-5">
                  <SectionHeader title="Personal Information" />
                  <FloatingInput label="Age" name="Age" type="number" value={formData.Age} onChange={handleChange} required />
                  <FloatingSelect label="Gender" name="Gender" value={formData.Gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
                  <NavButtons onNext={next} nextLabel="Next" />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-5">
                  <SectionHeader title="Financial Condition" />
                  <FloatingSelect label="Location Type" name="Location_Type" value={formData.Location_Type} onChange={handleChange} options={["Rural", "Urban", "Semi-Urban"]} />
                  <FloatingSelect label="Budget Range" name="Budget_Range" value={formData.Budget_Range} onChange={handleChange} options={["Low", "Medium", "High"]} />
                  <FloatingSelect label="Budget Range (₹)" name="Budget_Range_inNum" value={formData.Budget_Range_inNum} onChange={handleChange} options={["5000-15000","15000-30000","30000-50000","50000-75000","75000-100000","100000-150000","150000-200000","200000+"]} />
                  <NavButtons onBack={prev} onNext={next} nextLabel="Next" />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
                  <SectionHeader title="Interests & Skills" />
                  <FloatingSelect label="Practical Skills" name="Practical_Skills" value={formData.Practical_Skills} onChange={handleChange} options={practicalSkills} />
                  <FloatingSelect label="Interest Area" name="Interest_Area" value={formData.Interest_Area} onChange={handleChange} options={interestAreas} />
                  <FloatingSelect label="Work Mode" name="Work_Mode" value={formData.Work_Mode} onChange={handleChange} options={["Home-based", "Office", "Field Work"]} />
                  <FloatingSelect label="Risk Tolerance" name="Risk_Tolerance" value={formData.Risk_Tolerance} onChange={handleChange} options={["Low", "Medium", "High"]} />
                  <NavButtons onBack={prev} nextLabel={loading ? "Predicting…" : "💡 Predict"} nextLoading={loading} />
                </form>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="grid grid-cols-1 gap-5">
                  <SectionHeader title="Suggested Business" />

                  <AnimatePresence>
                    {prediction ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative rounded-xl border border-pink-600/30 bg-gradient-to-br from-pink-950/60 to-rose-950/30 p-6 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-transparent pointer-events-none" />
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-pink-900/40">
                            <Lightbulb className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-pink-400 uppercase tracking-widest mb-1">AI Recommendation</p>
                            <h3 className="text-xl font-bold text-white">{prediction}</h3>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-white/30 text-sm">No suggestion yet.</p>
                    )}
                  </AnimatePresence>

                  <div className="rounded-xl border border-pink-900/20 bg-white/[0.02] p-5">
                    <p className="text-white/50 text-sm mb-4">
                      Generate a personalized AI roadmap for the suggested business.
                    </p>
                    <NavButtons
                      onBack={() => setStep(3)}
                      onNext={handleSubmit2}
                      nextLabel={roadmapLoading ? "Generating…" : "📋 Generate Roadmap"}
                      nextLoading={roadmapLoading}
                    />
                  </div>

                  {roadmapLoading && !roadmap ? (
                    <RoadmapLoadingAnimation />
                  ) : (
                    roadmap && <RoadmapCard data={roadmap} />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-5 text-sm text-rose-400 font-medium"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </RequireAuth>
  );
}

export default withAuth(BusinessRecommendation);
