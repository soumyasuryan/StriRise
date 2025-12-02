"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
  const token = localStorage.getItem("token");
  setLoggedIn(!!token); // true if token exists
}, []);

  

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userLoggedIn");
  window.location.href = "/login";
};

  return (
    <nav className="w-full bg-backdrop-xl ">
      <div className="max-w-auto mx-10 px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-700">
          <img src="/trace.svg" className="h-10 rounded-[50%]" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-pink-800 font-medium items-center relative">
          <Link href="/home" className="hover:text-pink-600 transition">Home</Link>
          <Link href="/business_suggestion" className="hover:text-pink-600 transition">Business Recommendation</Link>
          <Link href="/login" className="hover:text-pink-600 transition">AI Roadmap</Link>
          <Link href="/market_place" className="hover:text-pink-600 transition">Marketplace</Link>
          <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>

          {/* Conditional Login/Profile Section */}
          {!loggedIn ? (
            <div className="space-x-4">
              <Link href="/login" className="p-3 bg-pink-600 text-white rounded-md">Login</Link>
              <Link href="/signup" className="p-3 bg-pink-600 text-white rounded-md">Signup</Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <Image
                src="/profile.png"
                alt="User Avatar"
                width={42}
                height={42}
                className="rounded-full border-2 border-pink-500 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-36 bg-white rounded-lg shadow-lg border border-pink-100 animate-fadeIn">
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
          className="lg:hidden text-pink-700 focus:outline-none"
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
        <div className="lg:hidden bg-pink-100 px-6 pb-4 space-y-3 text-pink-800 font-medium flex flex-col items-center justify-center">
          <Link href="/home" className="block hover:text-pink-600">Home</Link>
          <Link href="/business_suggestion" className="block hover:text-pink-600">Business Recommendation</Link>
          <Link href="/login" className="block hover:text-pink-600">AI Roadmap</Link>
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
