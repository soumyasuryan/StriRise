"use client";
import Link from "next/link";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar3";
import Footer from "../components/footer";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // ✅ feedback message state

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
        credentials: "include", // ✅ enables session cookie
      });

      const data = await res.json();
      console.log("Login response:", data);



      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userLoggedIn", "true");
        setMessage({ type: "success", text: "✅ Login successful!" });
        setTimeout(() => router.push("/"), 1500);
      }
      else {
        setMessage({
          type: "error",
          text: `⚠️ ${data.error || "Invalid credentials, please try again!"}`,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage({ type: "error", text: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center flex-col min-h-screen bg-pink-50/30">
      <Navbar />
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg w-full max-w-md border border-pink-100 hover:shadow-pink-300 transition-all duration-300 my-20">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Log in to continue your journey ✨</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-pink-700 font-medium mb-1">Email Address</label>
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
            <label className="block text-pink-700 font-medium mb-1">Password</label>
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

          {/* ✅ Inline message display */}
          {message.text && (
            <p
              className={`text-center font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
            >
              {message.text}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 ${loading ? "bg-pink-400" : "bg-pink-600 hover:bg-pink-700"
              } text-white rounded-xl font-semibold shadow-md hover:shadow-pink-300 transition-all duration-300`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-pink-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
