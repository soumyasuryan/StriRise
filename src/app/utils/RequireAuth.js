"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAuth = async () => {
      // Wait a short time to allow localStorage hydration after login
      await new Promise((resolve) => setTimeout(resolve, 300));

      const token = localStorage.getItem("token");

      if (token && token.trim() !== "") {
        setAuthenticated(true);
      } else {
        // Redirect only once
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/signup")
        ) {
          router.replace("/signup");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-pink-700 text-xl">
        Checking authentication...
      </div>
    );
  }

  return authenticated ? children : null;
}
