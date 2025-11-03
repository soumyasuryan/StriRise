"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status from localStorage when page loads
  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn");
    if (loggedIn === "true") setIsLoggedIn(true);
  }, []);

  // ✅ Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-transparent shadow-none">
      <div className="max-w-auto mx-10 px-6 py-5 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          <img src="/trace.svg" className="h-15 rounded-[50%]" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-large items-center">
          <Link href="/" className="hover:text-pink-200 transition">Home</Link>
          <Link href="/business_suggestion" className="hover:text-pink-200 transition">Skill Recommendation</Link>
          <Link href="/ai_roadmap" className="hover:text-pink-200 transition">AI Roadmap</Link>
          <Link href="/market_place" className="hover:text-pink-200 transition">Marketplace</Link>
          <Link href="/contact" className="hover:text-pink-200 transition">Contact</Link>

          {/* 👇 Login / Signup or Avatar */}
          {!isLoggedIn ? (
            <div className="space-x-4">
              <Link href="/login" className="p-3 bg-pink-600 text-white rounded-md">Login</Link>
              <Link href="/signup" className="p-3 bg-pink-600 text-white rounded-md">Signup</Link>
            </div>
          ) : (
            <div className="relative group inline-block">
  <div className="cursor-pointer">
    <Image
      src="/profile.png"
      alt="User Avatar"
      width={42}
      height={42}
      className="rounded-full border-2 border-pink-500 hover:scale-105 transition-transform"
    />
  </div>

  {/* Dropdown */}
  <div className="absolute right-0 mt-3 w-36 bg-white rounded-lg shadow-lg border border-pink-100 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-in-out">
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg"
    >
      Logout
    </button>
  </div>
</div>

          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-pink-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-pink-50/80 backdrop-blur-sm px-6 pb-4 space-y-3 text-pink-800 font-medium rounded-lg shadow">
          <Link href="/" className="block hover:text-pink-200">Home</Link>
          <Link href="/business_suggestion" className="block hover:text-pink-200">Skill Recommendation</Link>
          <Link href="/ai_roadmap" className="block hover:text-pink-200">AI Roadmap</Link>
          <Link href="/marketplace" className="block hover:text-pink-200">Marketplace</Link>
          <Link href="/contact" className="block hover:text-pink-200">Contact</Link>

          {/* 👇 Show Logout in mobile too */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left p-3 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link href="/login" className="block p-3 bg-pink-600 text-white rounded-md text-center">Login</Link>
              <Link href="/signup" className="block p-3 bg-pink-600 text-white rounded-md text-center">Signup</Link>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-in-out; }
      `}</style>
    </nav>
  );
}
