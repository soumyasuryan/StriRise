"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/business_suggestion", label: "AI Advisor" },
    { href: "/market_place", label: "Marketplace" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0d0208]/90 backdrop-blur-xl border-b border-pink-900/30 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT SIDE (Logo + Links together) */}
        <div className="flex items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center group mr-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <img
                src="/trace.svg"
                className="relative h-9 w-9 rounded-full border border-pink-500/30 group-hover:border-pink-400/60 transition-all duration-300"
                alt="Logo"
              />
            </div>
          </Link>

          {/* Links (now aligned with logo) */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-pink-500 to-rose-400 group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Auth/Profile stays right) */}
        <div className="hidden lg:flex items-center gap-3">
          {!loggedIn ? (
            <>
              <Link href="/login">
                <button className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-pink-500/40 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-5 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 shadow-md shadow-pink-900/30 hover:shadow-pink-700/40 transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/profile.png"
                  alt="User Avatar"
                  width={38}
                  height={38}
                  className="relative rounded-full border-2 border-pink-500/40 group-hover:border-pink-400 transition-all duration-300 cursor-pointer"
                />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-40 rounded-xl border border-pink-900/40 bg-[#1a0510]/95 backdrop-blur-xl shadow-xl shadow-black/40 overflow-hidden"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-pink-300 hover:text-white hover:bg-pink-900/30 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-pink-500/30 transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu unchanged */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-pink-900/20 bg-[#0d0208]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-pink-900/20 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}