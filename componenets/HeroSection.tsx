"use client"
import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    // Optional animation logic (GSAP etc.)
  }, []);

  return (
    <section className="relative flex items-center justify-center h-[90vh] bg-[#FAF9F6] px-8 overflow-hidden" id="home">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[320px] h-[420px] top-[5%] left-[5%] opacity-70 animate-float" style={{ backgroundImage: "url('https://i.pinimg.com/736x/2b/f1/11/2bf1111feff4bd9cb2957f921e233d91.jpg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
        <div className="absolute w-[400px] h-[400px] top-[55%] left-[79%] opacity-70 animate-float delay-[2s]" style={{ backgroundImage: "url('https://i.pinimg.com/736x/b6/87/f6/b687f66c9a1f8dcc451984d0f65aa9a2.jpg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
        <div className="absolute w-full h-[350px] top-[5%] left-[67%] opacity-70 animate-float delay-[4s]" style={{ backgroundImage: "url('https://i.pinimg.com/736x/05/c9/85/05c985b8d41cfde3a5489fa66725717f.jpg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
        <div className="absolute w-[450px] h-[350px] top-[50%] left-[20%] animate-pulse-slow" style={{ backgroundImage: "url('https://i.pinimg.com/736x/72/70/61/7270611cdaad8f759db26927c33dce6f.jpg')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center mx-auto">
        <h1 className="text-[#3A4F41] font-playfair text-5xl font-bold leading-tight mb-6">
          <span className="block">Pure, Organic</span>
          <span className="block">Glow Rituals</span>
        </h1>
        <p className="text-[#3A4F41] font-montserrat text-lg mb-8 max-w-[80%] mx-auto">
          Nature's finest ingredients for your radiant skin
        </p>
        <a href="#skinType">
          <button className="bg-[#8BA888] text-white font-semibold font-montserrat px-8 py-3 rounded-full shadow-lg hover:bg-[#3A4F41] transition-all duration-300">
            Discover Your Glow
          </button>
        </a>
      </div>

      {/* Product Display */}
      <div className="absolute right-[10%] bottom-[10%] z-10 hidden md:block">
        <div className="w-[300px] h-[350px] animate-float" style={{ backgroundImage: "url('https://example.com/mask-jar.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
        <div className="absolute top-[-50px] left-[-50px]">
          <div className="absolute w-[60px] h-[60px] rounded-full shadow-md animate-float" style={{ backgroundImage: "url('https://example.com/aloe.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', top: 0, left: 0 }}></div>
          <div className="absolute w-[60px] h-[60px] rounded-full shadow-md animate-float delay-[1s]" style={{ backgroundImage: "url('https://example.com/lavender.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', top: '-30px', left: '70px' }}></div>
          <div className="absolute w-[60px] h-[60px] rounded-full shadow-md animate-float delay-[2s]" style={{ backgroundImage: "url('https://example.com/rose.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', top: '40px', left: '50px' }}></div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float.delay-\[1s\] {
          animation-delay: 1s;
        }
        .animate-float.delay-\[2s\] {
          animation-delay: 2s;
        }
        .animate-float.delay-\[4s\] {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;