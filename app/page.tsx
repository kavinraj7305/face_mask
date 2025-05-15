"use client"
import AboutUs from "@/componenets/AboutUs";
import ContactPage from "@/componenets/ContactPage";
import HeroSection from "@/componenets/HeroSection";
import Products from "@/componenets/Products";
import SkinQuiz from "@/componenets/SkinQuiz";


export default function Home() {
  return (
    <div >
      <HeroSection/>
      <AboutUs/>
      <Products/>
      <div className="bg-[#FAF9F6]">
      <SkinQuiz/>
      <ContactPage/>
      </div>
    </div>
  );
}
