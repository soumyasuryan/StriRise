"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-transparent shadow-none">
      <div className="max-w-auto mx-10 px-6 py-5 flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          <img src="/trace.svg" className="h-10 rounded-[50%]" alt="" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-large">
          <Link href="/" className="hover:text-pink-200 transition">Home</Link>
          <Link href="/business_suggestion" className="hover:text-pink-200 transition">Skill Recommendation</Link>
          <Link href="/ai_roadmap" className="hover:text-pink-200 transition">AI Roadmap</Link>
          <Link href="/market_place" className="hover:text-pink-200 transition">Marketplace</Link>
          <Link href="/contact" className="hover:text-pink-200 transition">Contact</Link>
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
        </div>
      )}
    </nav>
  );
}
