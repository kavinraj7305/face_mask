"use client";

import { useEffect } from "react";
import AboutUs from "@/componenets/AboutUs";
import ContactPage from "@/componenets/ContactPage";
import FAQ from "@/componenets/FAQ";
import HeroSection from "@/componenets/HeroSection";
import Products from "@/componenets/Products";
import RitualFinderTeaser from "@/componenets/RitualFinderTeaser";
import Testimonials from "@/componenets/Testimonials";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Products />
      <div className="bg-[#FAF9F6]">
        <RitualFinderTeaser />
        <Testimonials />
        <FAQ />
        <ContactPage />
      </div>
    </div>
  );
}
