"use client";
import { useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully! 💌");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0208]">
      <NavBar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Get in{' '}
            <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-white/40 mt-3 max-w-xl">
            We'd love to hear from you — questions, feedback, or just a hello.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="rounded-2xl border border-pink-900/25 bg-[#1a0510]/60 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Contact Info</h2>

              <div className="space-y-3 text-white/60 text-sm">
                <p>📍 New Delhi, India</p>
                <p>📞 +91 98765 43210</p>
                <p>📧 support@stririse.com</p>
              </div>
            </div>

            <div className="rounded-2xl border border-pink-900/25 bg-[#1a0510]/60 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>

              <div className="flex gap-4 text-xl">
                <span className="text-white/40 hover:text-pink-400 transition">🌸</span>
                <span className="text-white/40 hover:text-pink-400 transition">💼</span>
                <span className="text-white/40 hover:text-pink-400 transition">🐦</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 rounded-2xl border border-pink-900/25 bg-[#1a0510]/70 p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Input */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-[#0d0208] border border-pink-900/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500 transition"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-[#0d0208] border border-pink-900/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500 transition"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full bg-[#0d0208] border border-pink-900/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-pink-500 transition"
              />

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold text-white
                  bg-gradient-to-r from-pink-600 to-rose-500
                  hover:from-pink-500 hover:to-rose-400
                  shadow-md shadow-pink-900/30 hover:shadow-pink-700/40
                  transition-all duration-300 hover:scale-[1.02]"
              >
                Send Message
              </button>

              {status && (
                <p className="text-center text-sm text-white/40 mt-3">
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
