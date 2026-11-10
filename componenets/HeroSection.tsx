import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-[#FAF9F6]">
      <div className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-[#142018]">
        <Image
          src="/Gemini_Generated_Image_8jdicf8jdicf8jdi.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 z-[1] bg-black/15" />

        <div className="absolute inset-x-0 top-0 z-[2] flex justify-center px-2 pt-8 sm:pt-10 md:pt-12 pointer-events-none select-none">
          <h1 className="font-serif font-bold text-white text-[14vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.82] tracking-[-0.04em] text-center drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            BAVAPRIYA
          </h1>
        </div>

        <Image
          src="/transparent for overlay.png"
          alt="Traditional herbal ritual — grinding botanicals by hand"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center z-[3] pointer-events-none"
        />
      </div>

      <div className="px-6 py-10 md:py-12">
        <div
          className="w-full max-w-4xl mx-auto bg-white
            shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_40px_rgba(58,79,65,0.10)]
            rounded-2xl border border-[#3A4F41]/10 px-6 py-5 md:px-10 md:py-6
            flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#3A4F41] text-[#FAF9F6] text-sm font-bold leading-tight text-center shrink-0">
              2015
            </span>
            <div>
              <p className="text-sm uppercase tracking-widest text-[#8BA888] font-semibold">
                Since 2015
              </p>
              <p className="text-[#3A4F41] font-medium">A family herbal ritual</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-[#3A4F41]/15" />
          <div className="flex items-center gap-4">
            <div className="flex text-[#C4A35A] shrink-0" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-5 h-5 fill-current">
                  <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-[#3A4F41] leading-none">4.2+</p>
              <p className="text-sm text-[#3A4F41]/70 mt-1">Customer ratings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
