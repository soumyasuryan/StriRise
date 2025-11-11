"use client";
import Link from "next/link";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar3";
import Footer from "../components/footer";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "❌ Passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Create account
      const res = await fetch("https://stririsebackend.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (!res.ok) {
        setMessage({
          type: "error",
          text: `⚠️ ${data.error || "Signup failed. Try again!"}`,
        });
        setLoading(false);
        return;
      }

      // 2️⃣ If signup success, automatically log in
      setMessage({ type: "success", text: "✅ Account created! Logging in..." });

      const loginRes = await fetch("https://stririsebackend.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const loginData = await loginRes.json();
      console.log("Login after signup:", loginData);

      if (res.ok) {
  localStorage.setItem("token", data.token); // ✅ Save token for RequireAuth
  setMessage({ type: "success", text: "✅ Account created successfully!" });

  setTimeout(() => {
    router.push("/home");
  }, 1500);
      } else {
        setMessage({
          type: "error",
          text: "Signup done, but login failed. Please log in manually.",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col min-h-screen bg-transparent">
      <Navbar />
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md md:max-w-[35%] border border-pink-100 hover:shadow-pink-300 transition-all duration-300 mb-20 mt-5">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-2">
          Join StriRise
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create your account to get started ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-pink-500 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-pink-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-pink-500 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-pink-500 w-5 h-5" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-pink-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <p
              className={`text-center font-medium ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 ${
              loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
            } text-white rounded-xl font-semibold shadow-md hover:shadow-pink-300 transition-all duration-300`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
