"use client"; 

import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md text-[#2f4f2f] sticky top-0 z-50 font-sans">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold animate-slideIn">Organic Glow 🌿</div>
        <div
          className={`md:flex gap-8 items-center transition-transform duration-300 ease-in-out ${
            isOpen ? "fixed top-16 right-0 w-48 h-screen bg-green-50 flex flex-col pt-10 z-40" : "hidden"
          } md:static md:h-auto md:w-auto md:bg-transparent`}
        >
          {["Home", "Aboutus", "Products", "Reviews", "Contact"].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
              className="relative font-medium text-[#2f4f2f] hover:text-green-600 transition-colors"
            >
              {item}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        {/* Hamburger */}
        <div
          className={`md:hidden flex flex-col justify-between w-7 h-6 cursor-pointer ${isOpen ? "z-50" : ""}`}
          onClick={toggleMenu}
        >
          <div
            className={`h-1 bg-[#2f4f2f] rounded transition-transform duration-300 ${
              isOpen ? "transform rotate-[-45deg] translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`h-1 bg-[#2f4f2f] rounded transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`h-1 bg-[#2f4f2f] rounded transition-transform duration-300 ${
              isOpen ? "transform rotate-[45deg] -translate-y-2" : ""
            }`}
          ></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
