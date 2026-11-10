"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Can I use Bavapriya Herbal Bath Powder every day?",
    answer:
      "Yes. Bavapriya Herbal Bath Powder can be part of a daily bathing ritual. Mix a small amount with water into a smooth paste and use it as a gentle, soap-free cleanser. Rinse well, and keep the remaining powder completely dry.",
  },
  {
    question: "How do I prepare Bavapriya as a face pack?",
    answer:
      "Take the required amount of powder and mix it with a liquid suited to your skin — typically rose water, and curd or honey if your skin needs it. Mix evenly into a smooth paste and apply as a face pack. Lemon is not a default ingredient and should be skipped for dry or sensitive skin. Use the Skin Ritual Finder for a mix made for you.",
  },
  {
    question: "Can I add egg white to the Face Pack?",
    answer:
      "Egg white is never required in a Bavapriya ritual. If you have an allergy or known sensitivity, avoid it completely. If you are not sure, do not use egg white unless you have previously established that it is suitable for your skin. The Skin Ritual Finder will keep it out of your mix when needed.",
  },
  {
    question: "Should I do a patch test before using it?",
    answer:
      "Yes. Apply a small amount of the prepared mixture to a small area of your skin first and check for any irritation before applying it to your face.",
  },
  {
    question: "How should I store the Bavapriya powders?",
    answer:
      "Store the powder in an airtight container in a cool, dry place, strictly away from moisture and water. Moisture can affect the powder and may attract bugs or insects.",
  },
  {
    question: "What makes Bavapriya special?",
    answer:
      "Bavapriya brings together traditional Indian herbal wisdom, botanical ingredients, and simple preparation to create a more natural everyday self-care ritual.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-6 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3 text-center">
          Frequently asked questions
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#3A4F41] text-center mb-10">
          Before you mix your bowl
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#3A4F41]/10 overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[#3A4F41]">{faq.question}</span>
                  <span className="text-[#8BA888] text-xl leading-none mt-0.5">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-[#3A4F41]/80 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
