import type { Metadata } from "next";
import RitualIngredients from "@/componenets/RitualIngredients";
import SkinQuiz from "@/componenets/SkinQuiz";

export const metadata: Metadata = {
  title: "Bavapriya Skin Ritual Finder",
  description:
    "Discover the right natural ritual for your skin. Answer a few questions and learn how to prepare Bavapriya Facial Powder with the right kitchen ingredients.",
};

export default function RitualFinderPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pb-16">
      <header className="px-6 pt-12 md:pt-16 pb-8 text-center max-w-3xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3">
          Bavapriya Skin Ritual Finder
        </p>
        <h1 className="font-serif text-3xl md:text-5xl text-[#3A4F41] leading-tight">
          Discover the right natural ritual for your skin.
        </h1>
        <p className="mt-4 text-[#3A4F41]/75 text-lg leading-relaxed">
          Answer a few simple questions and discover how to prepare your Bavapriya
          Facial Powder according to your skin type, sensitivity, and daily routine.
        </p>
      </header>

      <RitualIngredients />
      <SkinQuiz showHeader={false} />
    </main>
  );
}
