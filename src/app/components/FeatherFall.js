"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FeatherFall() {
  const [feathers, setFeathers] = useState([]);

  useEffect(() => {
    // create random feather properties
    const f = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random horizontal position
      delay: Math.random() * 5, // stagger animation
      duration: 10 + Math.random() * 10, // random fall speed
      size: 40 + Math.random() * 30, // feather size
      rotation: Math.random() * 360, // start rotation
    }));
    setFeathers(f);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {feathers.map((f) => (
        <motion.div
          key={f.id}
          initial={{
            y: -100,
            rotate: f.rotation,
            x: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [0, 50, -50, 30, -30, 0],
            rotate: [f.rotation, f.rotation + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size * 1.6}px`,
            zIndex: 0,
          }}
        >
          {/* 🪶 Feather SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M32 2C28 8 20 20 12 28C4 36 6 50 18 56C30 62 44 54 50 42C56 30 52 14 48 6C44 -2 36 -2 32 2Z"
              fill="url(#pinkGradient)"
            />
            <defs>
              <linearGradient id="pinkGradient" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
