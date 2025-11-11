"use client";
import { useState } from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

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
      // You can later connect this with your Flask backend
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
    <div className="min-h-screen flex flex-col bg-pink-50/30">
      <NavBar />

      {/* Hero Section */}
      <section className="relative w-full h-[20vh] flex items-center justify-center">
        
        <div className="absolute inset-0 "></div>
        <h1 className="relative text-5xl font-extrabold text-pink-700 drop-shadow-lg">
          Contact Us
        </h1>
      </section>

      {/* Contact Section */}
      <section className="flex flex-col md:flex-row justify-center items-start max-w-6xl mx-auto px-6 py-16 gap-12">
        {/* Left - Contact Info */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-pink-700 mb-4">Get in Touch 💬</h2>
          <p className="text-gray-700 leading-relaxed">
            We'd love to hear from you! Whether you have a question about our initiatives,
            need support, or just want to say hi — feel free to reach out.
          </p>

          <div className="space-y-3 text-gray-700 mt-6">
            <p>
              📍 <span className="font-semibold text-pink-700">Address:</span>  
              123 Empowerment Lane, New Delhi, India
            </p>
            <p>
              📞 <span className="font-semibold text-pink-700">Phone:</span>  
              +91 98765 43210
            </p>
            <p>
              📧 <span className="font-semibold text-pink-700">Email:</span>  
              support@stririse.com
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="text-pink-700 hover:text-pink-900 text-2xl transition"
            >
              🌸
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="text-pink-700 hover:text-pink-900 text-2xl transition"
            >
              💼
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="text-pink-700 hover:text-pink-900 text-2xl transition"
            >
              🐦
            </a>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
          <h3 className="text-2xl font-semibold text-pink-700 mb-6">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4 p-10">
            <div>
              <label className="block text-pink-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-full font-semibold hover:bg-pink-700 transition"
            >
              Send Message
            </button>

            {status && (
              <p className="text-center text-sm text-pink-700 mt-3">{status}</p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
