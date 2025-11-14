"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { apiFetch } from "../../utils/api";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default function SkillPage({ params }) {
  console.log("PARAMS:", params);
  console.log("SKILL NAME:", params?.skillName);

  return (
    <div>
      <h1>Skill Page</h1>
      <p>Skill Name: {params?.skillName}</p>
    </div>
  );
}
