"use client";
import { useEffect, useState } from "react";
import NavBar from "./components/navbar2";
import Footer from "./components/footer";

export default function HomePage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/all-skills");
        const data = await res.json();
        setSkills(Object.entries(data));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center">
      {/* ✅ Hero Section */}
      <section className="relative w-full">
        {/* ✅ Navbar is absolutely positioned over the image */}
        <div className="absolute top-0 left-0 w-full z-20">
          <NavBar />
        </div>

        {/* Full-width Hero Image */}
        <img
          src="/hero-women.png"
          alt="Women Empowerment"
          className="w-full h-[90vh] object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Text + Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg max-w-3xl">
            “Empowering Women to Rise, Create, and Lead with Confidence.”
          </h1>
          <p className="text-lg md:text-xl text-pink-100 mt-4 max-w-2xl drop-shadow-sm">
            Join StriRise — your platform to turn passion into purpose and ideas into impact.
          </p>
          <a href="/business_suggestion" className="mt-8 bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition duration-300 shadow-lg text-lg font-semibold">
            Get Started
          </a>
        </div>
      </section>

      {/* Skills Section */}
      {/* (unchanged below) */}
      <section className="w-full px-6 py-16">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-10">
          Explore Skill-Based Opportunities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skills.length === 0 ? (
            <p className="text-gray-600 text-center w-full col-span-full">
              Loading skills...
            </p>
          ) : (
            skills.slice(0, 9).map(([name, info], index) => (
              <div
                key={index}
                className="cursor-pointer relative group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
              >
                <img
                  src={info.image}
                  alt={name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-90"
                />
                <div className="absolute inset-0 bg-pink-800 bg-opacity-80 text-white flex flex-col justify-center items-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-lg font-semibold mb-2">{name}</h3>
                  <p className="text-sm line-clamp-5">{info.summary}</p>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-pink-700">{name}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* About Section + Footer (same as before) */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-auto mx-auto">
          <h2 className="text-4xl font-bold text-pink-700 mb-6">About StriRise</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            StriRise is a digital platform dedicated to{" "}
            <span className="font-semibold text-pink-600">empowering women</span> by helping them discover skills,
            access learning opportunities, and connect with meaningful work.
            We believe that when women rise, entire communities rise with them —
            fostering innovation, equality, and progress.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="p-6 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">🎯 Our Mission</h3>
              <p className="text-gray-700">
                To bridge the gap between skills and opportunities, enabling every woman to become financially independent and confident.
              </p>
            </div>

            <div className="p-6 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">💡 Our Vision</h3>
              <p className="text-gray-700">
                A world where every woman has equal access to resources, mentorship, and opportunities to lead and create change.
              </p>
            </div>

            <div className="p-6 bg-pink-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-pink-700 mb-2">🤝 Our Promise</h3>
              <p className="text-gray-700">
                To continuously uplift, educate, and support women in pursuing their dreams through technology and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

