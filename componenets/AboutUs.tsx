export default function AboutUs() {
  return (
    <section id="aboutUs" className="pt-6 pb-16 px-6 bg-[#FAF9F6] relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 bg-[#3A4F41] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute w-40 h-40 bg-white/10 rounded-full -top-10 -left-10" />
          <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-0 right-8" />
          <p className="uppercase tracking-[0.25em] text-xs text-white/70 mb-3">Our story</p>
          <h2 className="text-3xl md:text-4xl font-serif relative z-10">
            Rooted in Nature,
            <br />
            Crafted with Care
          </h2>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#3A4F41]/8 shadow-sm">
          <p className="uppercase tracking-[0.2em] text-xs text-[#8BA888] mb-3">Our Mission</p>
          <h3 className="text-2xl font-serif text-[#3A4F41] mb-4">Why we blend</h3>
          <p className="text-[#3A4F41]/80 leading-relaxed text-lg">
            To bring the purity of traditional Indian herbal care into everyday
            self-care through thoughtfully crafted, natural blends.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#3A4F41]/8 shadow-sm">
          <p className="uppercase tracking-[0.2em] text-xs text-[#8BA888] mb-3">Our Vision</p>
          <h3 className="text-2xl font-serif text-[#3A4F41] mb-4">Where we are going</h3>
          <p className="text-[#3A4F41]/80 leading-relaxed text-lg">
            To revive timeless herbal beauty rituals and make natural,
            trustworthy skincare a part of every modern lifestyle.
          </p>
        </div>

        <div className="md:col-span-2 bg-[#F3E9D2] p-8 md:p-10 rounded-2xl relative">
          <blockquote className="font-serif italic text-xl md:text-2xl text-[#3A4F41] leading-relaxed max-w-3xl">
            “Bavapriya Facials — where nature meets tradition, and every ritual
            brings you closer to nature.”
          </blockquote>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#3A4F41]/70">
            — Founder, Bavapriya
          </p>
        </div>
      </div>
    </section>
  );
}
