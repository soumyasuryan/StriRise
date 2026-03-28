"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { apiFetch } from "../../utils/api";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SkillDetailPage() {
  const [expanded, setExpanded] = useState(false);

  const { skillName: rawSkillName } = useParams();
  const skillName = decodeURIComponent(rawSkillName);

  const [skill, setSkill] = useState(null);
  const [otherSkills, setOtherSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch("/api/all-skills");
      const data = await res.json();

      setSkill(data[skillName]);
      setOtherSkills(
        Object.entries(data).filter(([name]) => name !== skillName)
      );
    };

    fetchData();
  }, [skillName]);

  if (!skill)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0208] text-white/40">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d0208] flex flex-col">
      <NavBar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
            <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
              {skillName}
            </span>
          </h1>
        </motion.div>

        {/* Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          src={skill.image}
          className="w-full h-auto object-cover rounded-2xl mb-8 border border-pink-900/25"
        />

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-pink-900/25 bg-[#1a0510]/60 p-6 mb-12"
        >
          <p className="text-white/70 leading-relaxed">
            {expanded
              ? skill.summary
              : skill.summary.slice(0, 900) + "..."}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-sm font-semibold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent hover:opacity-80"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </motion.div>

        {/* More Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Explore More
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherSkills.map(([name, info], idx) => (
              <Link
                href={`/skill/${encodeURIComponent(name)}`}
                key={idx}
                className="group relative rounded-2xl border border-pink-900/25 bg-[#1a0510]/60 overflow-hidden hover:border-pink-600/35 transition-all duration-300"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-600/10 to-transparent" />

                <img
                  src={info.image}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-pink-200 transition">
                    {name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
