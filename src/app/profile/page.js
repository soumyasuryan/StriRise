"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }

    fetch("https://stririsebackend.onrender.com/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send correctly
      },
    })
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to fetch profile");
        setData(result);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome back, {data.user} 🎉</p>
      <p>{data.message}</p>
    </div>
  );
}

