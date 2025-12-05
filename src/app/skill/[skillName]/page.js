"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { apiFetch } from "../../utils/api";
import Link from "next/link";

export default function SkillDetailPage() {
  
  const [expanded, setExpanded] = useState(false);

  const { skillName: rawSkillName } = useParams();
  const skillName = decodeURIComponent(rawSkillName); // ✅ FIX

  const [skill, setSkill] = useState(null);
  const [otherSkills, setOtherSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiFetch("/api/all-skills");
      const data = await res.json();

      setSkill(data[skillName]); // ✅ NOW matches your real keys
      setOtherSkills(
        Object.entries(data).filter(([name]) => name !== skillName)
      );
    };

    fetchData();
  }, [skillName]);
  

  if (!skill) return <p>Loading...</p>;
  const paragraphs = skill.summary
  .split(/\n+|\. /)        // split by newline OR sentences
  .map(p => p.trim())
  .filter(p => p.length > 0);
  

  return (
    <div className="min-h-screen bg-transparent">
      <NavBar />

      <div className="max-w-5xl mx-auto p-6 mt-20 ">
        <div className="flex items-center justify-center gap-3 mt-6 ">
  <div className="h-[2px] md:w-20 bg-pink-300 px-auto"></div>
  <span className="text-3xl font-bold text-pink-600 tracking-wide text-center">
     {skillName}
  </span>
  <div className="h-[2px] md:w-20 bg-pink-300"></div>
</div>
        

        <img
          src={skill.image}
          className="w-full h-auto object-cover rounded-2xl shadow mb-6 mt-5"
        />

        <div className="mb-10">
  <p className="text-lg text-gray-700 leading-relaxed">
    {expanded ? skill.summary : skill.summary.slice(0, 1050) + "..."}
  </p>

  <button
    onClick={() => setExpanded(!expanded)}
    className="mt-3 text-pink-600 font-semibold hover:underline"
  >
    {expanded ? "Read Less" : "Read More"}
  </button>
</div>


        <h2 className="text-2xl font-bold text-pink-700 mb-4">
          Explore More Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherSkills.map(([name, info], idx) => (
            <Link
              href={`/skill/${encodeURIComponent(name)}`}
              key={idx}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img src={info.image} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-pink-700 text-lg">{name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

