"use client";
import Link from "next/link";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar3";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      const res = await fetch("https://stririsebackend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userLoggedIn", "true");
        setMessage({ type: "success", text: "Login successful!!!" });
        setTimeout(() => router.push("/"), 1500);
      } else {
        setMessage({
          type: "error",
          text: `⚠️ ${data.error || "Invalid credentials, please try again!"}`,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0208]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xs sm:max-w-sm rounded-xl border border-pink-900/20 bg-[#1a0510]/70 p-4 sm:p-5 md:p-6"
        >
          {/* Header */}
          <div className="mb-5 text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">
              Welcome{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Back
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-white/40 mt-1.5">
              Log in to continue your journey ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Email */}
          <div className="relative">
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={form.email}
    onChange={handleChange}
    className="w-full bg-[#0d0208] border border-pink-900/30 rounded-xl px-4 py-2.5 pl-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition"
    required
  />
</div>
            {/* Password */}
           <div className="relative">
  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
  <input
    type="password"
    name="password"
    placeholder="Password"
    value={form.password}
    onChange={handleChange}
    className="w-full bg-[#0d0208] border border-pink-900/30 rounded-xl px-4 py-2.5 pl-12 text-sm text-white placeholder-white/40 focus:outline-none focus:border-pink-500 transition"
    required
  />
</div>

            {/* Message */}
            {message.text && (
              <p
                className={`text-center text-xs sm:text-sm ${
                  message.type === "success"
                    ? "text-green-400"
                    : "text-rose-400"
                }`}
              >
                {message.text}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-2.5 rounded-xl text-sm font-semibold text-white
                bg-gradient-to-r from-pink-600 to-rose-500
                hover:from-pink-500 hover:to-rose-400
                shadow-md shadow-pink-900/30 hover:shadow-pink-700/40
                transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-xs sm:text-sm text-white/40">
              Don’t have an account?{" "}
              <Link
                href="/signup"
                className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent font-semibold hover:opacity-80"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}