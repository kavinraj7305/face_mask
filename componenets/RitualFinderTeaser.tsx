import Link from "next/link";

const RitualFinderTeaser = () => {
  return (
    <section id="ritual-finder" className="px-6 py-16 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#3A4F41]/10 shadow-sm px-6 py-10 md:px-12 md:py-14 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3">
          Bavapriya Skin Ritual Finder
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#3A4F41] mb-4">
          Discover the right natural ritual for your skin.
        </h2>
        <p className="text-[#3A4F41]/75 text-lg max-w-2xl mx-auto mb-8">
          This is not a product picker. Open the full finder to see what is inside the
          powders, then answer a few questions to choose the kitchen ingredients to mix
          with Bavapriya Facial Powder.
        </p>
        <Link
          href="/ritual-finder"
          className="inline-flex bg-[#8BA888] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#3A4F41] transition"
        >
          Open the Ritual Finder
        </Link>
      </div>
    </section>
  );
};

export default RitualFinderTeaser;
