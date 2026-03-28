"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import NavBar from "./components/navbar2";
import Footer from "./components/footer";

export default function LandingPage() {
  const router = useRouter();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/home");
  }, [router]);

  const handleCardClick = () => {
    const token = localStorage.getItem("token");
    router.push(token ? "/home" : "/login");
  };

  const features = [
    {
      title: "AI Roadmap",
      tag: "Plan & Track",
      desc: "Plan your AI journey with a clear, step-by-step roadmap that guides you through essential milestones — from foundational skills to mastering advanced AI techniques.",
      img: "/ai_chatbot.jpg",
      icon: "✦",
    },
    {
      title: "Business Recommender",
      tag: "Insights",
      desc: "Discover tailored business strategies powered by AI insights. Our system analyzes your interests, market trends, and growth potential to suggest personalized actions.",
      img: "/business_rec.jpg",
      icon: "◈",
    },
    {
      title: "Marketplace",
      tag: "Connect",
      desc: "Connect with like-minded entrepreneurs, buy or sell products, and expand your network within a secure platform designed for modern business growth.",
      img: "/marketplace.jpg",
      icon: "⬡",
    },
    {
      title: "Explore Courses",
      tag: "Learn",
      desc: "Browse a curated list of courses to sharpen your skills — whether you're learning business strategy, AI techniques, or personal development topics.",
      img: "/courses.avif",
      icon: "◎",
    },
    {
      title: "Explore Skills",
      tag: "Grow",
      desc: "Identify skills relevant to your goals. Get recommendations for practical exercises, learning resources, and real-world projects to build expertise.",
      img: "/skills.avif",
      icon: "❋",
    },
  ];

  const stats = [
    { value: "10K+", label: "Women Empowered" },
    { value: "500+", label: "Courses Available" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50+", label: "AI Tools" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0d0208] text-white overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute w-full z-50">
        <NavBar />
      </div>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden"
      >
        {/* Parallax BG */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/hero-women3.webp')", y: heroY }}
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0d0208]" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-950/30 via-transparent to-rose-950/20" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-4xl"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium tracking-wide mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
            AI-Powered Platform for Women Entrepreneurs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.08] tracking-tight"
          >
            Empower Women
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 bg-clip-text text-transparent">
                Entrepreneurs
              </span>
              {/* underline accent */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              />
            </span>
            {" "}with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Personalized skill recommendations, business insights, and AI-powered
            guidance — all in one place to help you grow and succeed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/signup">
              <button className="group relative px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl text-base font-semibold shadow-lg shadow-pink-900/40 hover:shadow-pink-700/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                <span className="relative z-10">Get Started — It's Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-3.5 rounded-xl text-base font-semibold border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-pink-400/40">
                Log In
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-pink-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 py-10 border-y border-pink-900/30 bg-gradient-to-r from-pink-950/20 via-rose-950/10 to-pink-950/20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-28 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Built for your{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
              success
            </span>
          </h2>
        </motion.div>

        {/* Feature cards — alternating layout */}
        <div className="flex flex-col gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              onClick={handleCardClick}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.015 }}
              className={`
                group cursor-pointer relative flex flex-col overflow-hidden
                md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
                rounded-2xl border border-pink-900/30
                bg-gradient-to-br from-[#1a0510] to-[#120309]
                hover:border-pink-600/40 hover:shadow-2xl hover:shadow-pink-950/50
                transition-all duration-500
              `}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-pink-600/5 to-rose-600/5" />

              {/* Image */}
              <div className="md:w-72 lg:w-80 flex-shrink-0 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-52 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-pink-400 text-lg">{item.icon}</span>
                  <span className="text-xs font-semibold tracking-widest uppercase text-pink-400/70 border border-pink-800/50 bg-pink-950/40 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-pink-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/55 text-base leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Explore feature</span>
                  <span className="text-lg">→</span>
                </div>
              </div>

              {/* Index number */}
              <div className="absolute top-5 right-5 text-5xl font-extrabold text-white/[0.04] select-none pointer-events-none">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden"
        >
          {/* BG */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-700 via-rose-700 to-pink-900" />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)`
            }}
          />

          <div className="relative z-10 text-center py-16 px-8">
            <p className="text-pink-200/70 text-sm font-semibold tracking-widest uppercase mb-4">
              Start Today
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
              Ready to transform
              <br />your business?
            </h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto">
              Join thousands of women entrepreneurs already using AI to accelerate their growth.
            </p>
            <Link href="/signup">
              <button className="px-10 py-4 bg-white text-pink-700 rounded-xl font-bold text-base hover:bg-pink-50 transition-all duration-300 hover:scale-105 shadow-xl">
                Create Free Account →
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
