"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect once, not repeatedly
        router.replace("/login");
      } else {
        setAuthenticated(true);
      }

      setAuthChecked(true);
    }, [router]);

    // While checking, show nothing (to prevent flicker)
    if (!authChecked) return null;

    return authenticated ? <Component {...props} /> : null;
  };
}

