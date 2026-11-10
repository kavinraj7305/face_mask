"use client";

const testimonials = [
  {
    quote:
      "I have used Bavapriya bath powder for years now. It feels like the same simple ritual my mother kept at home — no perfume, no harsh soap.",
    name: "Ananya Krishnan",
    title: "Coimbatore",
  },
  {
    quote:
      "The facial powder sits well on my combination skin when I mix it only with rose water. I like that they don't push lemon on everyone.",
    name: "Meera Iyer",
    title: "Chennai",
  },
  {
    quote:
      "We ordered 500 g of the face pack for our family. The powder stays fine if you keep it completely dry — that storage tip actually matters.",
    name: "Priya Subramaniam",
    title: "Madurai",
  },
  {
    quote:
      "A quiet, trustworthy product. I do a short 10-minute pack before the week begins. My skin feels clean, not tight.",
    name: "Kavitha Ramesh",
    title: "Tiruchirappalli",
  },
  {
    quote:
      "I was unsure about egg white, so I skipped it. Curd and honey with the powder was enough for my dry skin.",
    name: "Lakshmi Venkatesh",
    title: "Salem",
  },
  {
    quote:
      "Since 2015 this has been our house pack. I send the 1 kg pack to my sister in Bengaluru every few months.",
    name: "Divya Natarajan",
    title: "Coimbatore",
  },
  {
    quote:
      "Sensitive skin here — I only use rose water with the powder and a patch test first. That simple mix is what I needed.",
    name: "Harini Mohan",
    title: "Erode",
  },
  {
    quote:
      "The herbal bath powder replaced my soap. It doesn't foam much, but my skin feels softer after a week of daily use.",
    name: "Sneha Balaji",
    title: "Bengaluru",
  },
  {
    quote:
      "Honest powders, honest prices. 250 g lasted me well for facial rituals twice a week.",
    name: "Nithya Rajendran",
    title: "Chennai",
  },
  {
    quote:
      "I use a lighter mix on my T-zone and a little curd on drier cheeks. It finally feels like a ritual made for my face.",
    name: "Aishwarya Menon",
    title: "Kochi",
  },
  {
    quote:
      "No fancy packaging talk — just traditional herbal care that my mother-in-law also recognised immediately.",
    name: "Deepa Sundaram",
    title: "Coimbatore",
  },
  {
    quote:
      "I take the 100 g pack when I travel. Mix, apply, rinse. It has become the one ritual I actually keep.",
    name: "Janani Prasad",
    title: "Hyderabad",
  },
];

const rowOne = testimonials.slice(0, 4);
const rowTwo = testimonials.slice(4, 8);
const rowThree = testimonials.slice(8, 12);

function TestimonialCard({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title: string;
}) {
  return (
    <figure className="w-[320px] md:w-[380px] shrink-0 rounded-2xl border border-[#3A4F41]/10 bg-white px-6 py-5 shadow-sm">
      <div className="flex text-[#C4A35A] mb-3" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current">
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-[#3A4F41]/90 text-sm md:text-base leading-relaxed">
        “{quote}”
      </blockquote>
      <figcaption className="mt-4">
        <p className="font-semibold text-[#3A4F41]">{name}</p>
        <p className="text-xs uppercase tracking-wider text-[#8BA888]">{title}</p>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = "40s",
}: {
  items: typeof testimonials;
  reverse?: boolean;
  duration?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex flex-nowrap gap-4 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: duration }}
      >
        {loop.map((item, index) => (
          <TestimonialCard key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-[#F4F1EA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3">
          Testimonials
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#3A4F41]">
          Stories from the ritual
        </h2>
        <p className="mt-3 text-[#3A4F41]/70 max-w-xl mx-auto">
          Families who keep coming back to Bavapriya — from kitchen bowls to weekly glow.
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F4F1EA] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F4F1EA] to-transparent z-10" />
        <div className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <MarqueeRow items={rowOne} duration="42s" />
          <MarqueeRow items={rowTwo} reverse duration="48s" />
          <MarqueeRow items={rowThree} duration="44s" />
        </div>
      </div>
    </section>
  );
}
