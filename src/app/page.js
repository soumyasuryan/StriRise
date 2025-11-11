"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./components/navbar2";
import Footer from "./components/footer";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/home");
  }, [router]);

  const handleCardClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // redirect to login if not logged in
    } else {
      router.push("/home"); // redirect logged-in users somewhere else
    }
  };

  const features = [
    {
      title: "AI Roadmap",
      desc: "Plan your AI journey with a clear, step-by-step roadmap that guides you through essential milestones, from learning foundational skills to mastering advanced AI techniques. Track your progress, set goals, and stay motivated throughout your journey.",
      img: "/ai_chatbot.jpg",
    },
    {
      title: "Business Recommender",
      desc: "Discover tailored business strategies and skill recommendations powered by AI insights. Our system analyzes your interests, market trends, and growth potential to suggest personalized actions that help you make smarter decisions and scale your business efficiently.",
      img: "/business_rec.jpg",
    },
    {
      title: "Marketplace",
      desc: "Connect with like-minded entrepreneurs, buy or sell products, and expand your business network. Explore opportunities, promote your services, and find partners or clients, all within a secure and intuitive platform designed for modern business growth.",
      img: "/marketplace.jpg",
    },
    {
      title: "Explore Courses",
      desc: "Browse a curated list of courses to enhance your knowledge and sharpen your skills. Whether you're learning new business strategies, AI techniques, or personal development topics, find high-quality resources to accelerate your growth and achieve your goals.",
      img: "/courses.avif",
    },
    {
      title: "Explore Skills",
      desc: "Identify and develop skills that are directly relevant to your business objectives and personal growth. Get recommendations for practical exercises, learning resources, and real-world projects to build expertise and stay competitive in your industry.",
      img: "/skills.avif",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-white">
      {/* Navbar on top */}
      <div className="absolute w-full z-50">
        <NavBar />
      </div>

      {/* Hero Section */}
      <main
        className="relative flex flex-col items-center justify-center h-screen text-center py-28 px-6 sm:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-women3.webp')",
        }}
      >
        {/* Overlay for reduced opacity */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Empower Women Entrepreneurs with AI
          </h1>
          <p className="text-lg sm:text-xl mb-10">
            Get personalized skill recommendations, business insights, and AI-powered guidance—all in one place to help you grow and succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/signup">
              <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-lg font-semibold shadow-lg transition-transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-3 border-2 border-pink-300 text-white rounded-lg text-lg font-semibold hover:bg-pink-500 transition">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 max-w-4xl mx-auto px-6 flex flex-col gap-12">
        {features.map((item, index) => (
          <div
            key={index}
            onClick={handleCardClick}
            className={`cursor-pointer flex flex-col md:flex-row items-center rounded-3xl p-6 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r ${
              index % 2 === 0 ? "from-pink-100 to-pink-200" : "from-pink-200 to-pink-300"
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl flex-shrink-0 mb-4 md:mb-0 md:mr-8"
            />

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-pink-700 mb-2">
                {item.title}
              </h3>
              <p className="text-pink-900 text-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
