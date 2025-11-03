"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("userLoggedIn");
    setLoggedIn(status === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-pink-200 shadow-md">
      <div className="max-w-auto mx-10 px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          <img src="/trace.svg" className="h-10 rounded-[50%]" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-pink-800 font-medium items-center">
          <Link href="/" className="hover:text-pink-600 transition">Home</Link>
          <Link href="/business_suggestion" className="hover:text-pink-600 transition">Skill Recommendation</Link>
          <Link href="/ai_roadmap" className="hover:text-pink-600 transition">AI Roadmap</Link>
          <Link href="/market_place" className="hover:text-pink-600 transition">Marketplace</Link>
          <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>

          {/* Conditional Login/Profile Section */}
          {!loggedIn ? (
            <div className="space-x-4">
              <Link href="/login" className="p-3 bg-pink-600 text-white rounded-md">Login</Link>
              <Link href="/signup" className="p-3 bg-pink-600 text-white rounded-md">Signup</Link>
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={42}
                height={42}
                className="rounded-full border-2 border-pink-500 cursor-pointer hover:scale-105 transition-transform"
              />
              {showDropdown && (
                <div
                  className={`
                    absolute right-0 mt-3 w-36 bg-white rounded-lg shadow-lg border border-pink-100
                    opacity-100 visible transition-all duration-200 ease-in-out
                  `}
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pink-100 px-6 pb-4 space-y-3 text-pink-800 font-medium">
          <Link href="/" className="block hover:text-pink-600">Home</Link>
          <Link href="/business_suggestion" className="block hover:text-pink-600">Skill Recommendation</Link>
          <Link href="/ai_roadmap" className="block hover:text-pink-600">AI Roadmap</Link>
          <Link href="/market_place" className="block hover:text-pink-600">Marketplace</Link>
          <Link href="/contact" className="block hover:text-pink-600">Contact</Link>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 bg-pink-600 text-white rounded-md mt-3"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-3 mt-3">
              <Link href="/login" className="p-2 bg-pink-600 text-white rounded-md">Login</Link>
              <Link href="/signup" className="p-2 bg-pink-600 text-white rounded-md">Signup</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
