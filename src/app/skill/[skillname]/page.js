"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { apiFetch } from "../../utils/api";
import Link from "next/link";

export default function SkillDetailPage() {
  const { skillName } = useParams();
  const [skill, setSkill] = useState(null);
  const [otherSkills, setOtherSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiFetch("/api/all-skills");
        const data = await res.json();

        const entry = data[skillName];
        setSkill(entry);

        // get other skills  
        setOtherSkills(
          Object.entries(data).filter(([name]) => name !== skillName)
        );

      } catch (err) {
        console.error("Error loading skill:", err);
      }
    };

    fetchData();
  }, [skillName]);
  console.log("PARAM FROM ROUTE:", skillName);


  if (!skill) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-pink-50">
      <NavBar />

      <div className="max-w-5xl mx-auto p-6 mt-20">
        <h1 className="text-4xl font-bold text-pink-700 mb-4">
          {skillName}
        </h1>

        <img
          src={skill.image}
          className="w-full h-80 object-cover rounded-2xl shadow mb-6"
          alt={skillName}
        />

        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          {skill.summary}
        </p>

        {/* --------------------------- */}
        {/* OTHER SKILLS SECTION */}
        {/* --------------------------- */}
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
              <img
                src={info.image}
                alt={name}
                className="w-full h-40 object-cover"
              />
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
