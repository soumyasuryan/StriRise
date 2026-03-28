"use client";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar2";
import Footer from "../components/footer";
import { apiFetch } from "../utils/api";
import RequireAuth from "../utils/RequireAuth";
import withAuth from "../utils/withAuth";
import Link from "next/link";
import { motion } from "framer-motion";

function HomePage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await apiFetch("/api/all-skills");
        const data = await res.json();
        setSkills(Object.entries(data));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const aboutCards = [
    {
      icon: "🎯",
      title: "Our Mission",
      desc: "To bridge the gap between skills and opportunities, enabling every woman to become financially independent and confident.",
    },
    {
      icon: "💡",
      title: "Our Vision",
      desc: "A world where every woman has equal access to resources, mentorship, and opportunities to lead and create change.",
    },
    {
      icon: "🤝",
      title: "Our Promise",
      desc: "To continuously uplift, educate, and support women in pursuing their dreams through technology and community.",
    },
  ];

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[#0d0208] flex flex-col">

        {/* ── Hero ── */}
        <section className="relative w-full h-[92vh] overflow-hidden">
          <div className="absolute top-0 left-0 w-full z-20">
            <NavBar />
          </div>

          {/* BG image */}
          <img
            src="/hero-women.png"
            alt="Women Empowerment"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />

          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#0d0208]" />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-950/30 via-transparent to-rose-950/20" />

          {/* Ambient orbs */}
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-medium tracking-wide mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              Your Growth Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight tracking-tight"
            >
              Empowering Women to{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 bg-clip-text text-transparent">
                Rise, Create & Lead
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg text-white/60 mt-5 max-w-xl leading-relaxed"
            >
              Join StriRise — your platform to turn passion into purpose and ideas into impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex gap-4"
            >
              <a
                href="/business_suggestion"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl text-base font-semibold shadow-lg shadow-pink-900/40 hover:shadow-pink-700/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#skills"
                className="px-8 py-3.5 rounded-xl text-base font-semibold border border-white/15 bg-white/5 hover:bg-white/10 hover:border-pink-400/40 text-white/80 hover:text-white backdrop-blur-sm transition-all duration-300"
              >
                Explore Skills
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Skills Section ── */}
        <section id="skills" className="w-full px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Discover Your Path
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Skill-Based{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {skills.length === 0 ? (
              /* Skeleton loaders */
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-pink-900/20 bg-[#1a0510]/50 overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-pink-900/20" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 w-2/3 bg-pink-900/20 rounded" />
                    <div className="h-3 w-1/2 bg-pink-900/10 rounded" />
                  </div>
                </div>
              ))
            ) : (
              skills.slice(0, 9).map(([name, info], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <Link
                    href={`/skill/${encodeURIComponent(name)}`}
                    className="group relative block rounded-2xl border border-pink-900/20 bg-[#1a0510]/60 overflow-hidden hover:border-pink-600/40 hover:shadow-xl hover:shadow-pink-950/50 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="overflow-hidden h-48">
                      <img
                        src={info.image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0510] via-transparent to-transparent" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                      <p className="text-white/80 text-sm line-clamp-4 leading-relaxed">
                        {info.summary}
                      </p>
                      <span className="mt-3 text-xs font-semibold text-pink-400 flex items-center gap-1">
                        Explore <span>→</span>
                      </span>
                    </div>

                    {/* Card footer */}
                    <div className="p-4 flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-pink-200 transition-colors">
                        {name}
                      </h3>
                      <span className="text-pink-500/50 group-hover:text-pink-400 transition-colors text-lg">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* ── About Section ── */}
        <section className="w-full py-24 px-6 relative overflow-hidden">
          {/* Subtle bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/10 to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                StriRise
              </span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed max-w-2xl mx-auto">
              StriRise is a digital platform dedicated to{" "}
              <span className="text-pink-400 font-medium">empowering women</span> by helping them
              discover skills, access learning opportunities, and connect with meaningful work.
              We believe that when women rise, entire communities rise with them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {aboutCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative rounded-2xl border border-pink-900/25 bg-[#1a0510]/50 p-7 hover:border-pink-600/40 hover:shadow-xl hover:shadow-pink-950/40 transition-all duration-500 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-[2px] w-full absolute top-0 left-0 bg-gradient-to-r from-pink-600 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-pink-600/5 to-transparent" />

                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-pink-100 transition-colors">
                  {card.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </RequireAuth>
  );
}

export default withAuth(HomePage);
