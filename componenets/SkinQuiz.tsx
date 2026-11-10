"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

type SkinType = "dry" | "oily" | "combination" | "normal";
type EggAnswer = "yes" | "no" | "not-sure";
type TimeAnswer = "5-10" | "10-15" | "15-20" | "20+";
type Sensitivity = "low" | "moderate" | "high";

type Answers = {
  skinType: SkinType | null;
  egg: EggAnswer | null;
  time: TimeAnswer | null;
  sensitivity: Sensitivity | null;
};

type RitualResult = {
  ritualName: string;
  tagline: string;
  blend: string;
  ingredients: { name: string; why: string }[];
  avoid: string[];
  avoidSummary: string;
  duration: string;
  frequency: string;
  prepare: string[];
  application: string[];
  extraNotes: string[];
};

const emptyAnswers: Answers = {
  skinType: null,
  egg: null,
  time: null,
  sensitivity: null,
};

function durationFor(time: TimeAnswer, highSens: boolean) {
  if (highSens || time === "5-10") return "10 minutes";
  if (time === "10-15") return "10–15 minutes";
  if (time === "15-20") return "15 minutes";
  return "15–20 minutes";
}

function frequencyFor(time: TimeAnswer, sensitivity: Sensitivity) {
  if (sensitivity === "high" || sensitivity === "moderate") {
    return "Start with once a week and observe how your skin responds.";
  }
  if (time === "5-10") return "Two to three times a week, as a short ritual.";
  return "Two times a week, or as your skin enjoys.";
}

function eggAvoidLine(egg: EggAnswer) {
  if (egg === "yes") {
    return "Egg white — we recommend avoiding it completely in your facial ritual.";
  }
  if (egg === "not-sure") {
    return "Egg white — do not use it unless you have previously established that it is suitable for your skin.";
  }
  return null;
}

function avoidSummary(skipLemon: boolean, egg: EggAnswer) {
  const parts: string[] = [];
  if (skipLemon) parts.push("Lemon");
  if (egg !== "no") parts.push("egg white");
  return parts.length ? parts.join(" & ") : "Nothing extra beyond what is listed below.";
}

function buildRitual(answers: Answers): RitualResult | null {
  const { skinType, egg, time, sensitivity } = answers;
  if (!skinType || !egg || !time || !sensitivity) return null;

  const highSens = sensitivity === "high";
  const lemonOptional = skinType === "oily" && sensitivity === "low";
  const skipLemon = !lemonOptional;
  const duration = durationFor(time, highSens);
  const frequency = frequencyFor(time, sensitivity);
  const eggLine = eggAvoidLine(egg);
  const eggAvoid = eggLine ? [eggLine] : [];

  const powder = {
    name: "Bavapriya Facial Powder",
    why: "The herbal base of the ritual. This finder does not switch products — it only chooses what to mix with this powder.",
  };

  // High sensitivity overrides richer mixes, except dry skin still needs a hydrating bowl.
  if (highSens && skinType !== "dry") {
    return {
      ritualName: "Gentle Sensitive Skin Ritual",
      tagline: "Your sensitivity answer keeps the bowl simple. Bavapriya Facial Powder stays the base.",
      blend: "Bavapriya Facial Powder + Rose Water",
      ingredients: [
        powder,
        {
          name: "Rose Water",
          why: "A light, soothing liquid base without extra acids or proteins.",
        },
      ],
      avoid: [
        "Lemon",
        eggLine ?? "Egg white if you are allergic or uncertain",
        "Introducing several new ingredients at once",
        "Applying the mask over broken or irritated skin",
      ],
      avoidSummary: avoidSummary(true, egg),
      duration,
      frequency,
      prepare: [
        "Take 1–2 teaspoons of Bavapriya Facial Powder in a clean bowl.",
        "Add rose water gradually and mix into a smooth, spreadable paste.",
        "Do not add lemon, egg white, or several new kitchen ingredients at once.",
      ],
      application: [
        "Perform a small patch test before using the mixture on the face, particularly for the first time.",
        "Apply a thin even layer to a clean face, avoiding the eyes and lips.",
        `Leave it on for approximately ${duration}.`,
        "If burning, significant redness, itching, swelling, or other irritation occurs, wash it off and discontinue use.",
        "Gently rinse with comfortable-temperature water and pat dry.",
      ],
      extraNotes: [
        "Your sensitivity answer overrides a richer skin-type blend.",
        "Do not apply over broken or already irritated skin.",
      ],
    };
  }

  if (skinType === "dry") {
    return {
      ritualName: time === "5-10" || highSens ? "Gentle Hydration Ritual" : "Nourishing Comfort Ritual",
      tagline: "A creamier mix so the mask does not feel excessively drying. The powder stays the same — only the mix-ins change.",
      blend: "Bavapriya Facial Powder + Curd + Honey + Rose Water",
      ingredients: [
        powder,
        {
          name: "Curd",
          why: "Provides a creamy base and helps prevent the mask from feeling excessively drying.",
        },
        {
          name: "Honey",
          why: "Helps retain moisture and gives the mixture a smoother texture.",
        },
        {
          name: "Rose Water",
          why: "Adds a light, soothing liquid base.",
        },
      ],
      avoid: [
        "Lemon is not recommended for dry skin, particularly if the skin is already irritated or sensitive.",
        ...eggAvoid,
      ],
      avoidSummary: avoidSummary(true, egg),
      duration,
      frequency,
      prepare: [
        "Take 1–2 teaspoons of Bavapriya Facial Powder in a clean bowl.",
        "Add 1 teaspoon curd, ½ teaspoon honey, and a few drops of rose water.",
        "Mix until you obtain a smooth, spreadable paste.",
      ],
      application: [
        "Apply an even layer to a clean face, avoiding the eyes and lips.",
        `Leave it on for approximately ${duration}.`,
        "Do not allow the mask to become completely dry and tight.",
        "Gently rinse with comfortable-temperature water and pat the skin dry.",
      ],
      extraNotes: [
        "Lemon is not recommended for dry skin, particularly if the skin is already irritated or sensitive.",
        ...(highSens
          ? [
              "Perform a small patch test before the first face use.",
              "If burning, significant redness, itching, or swelling occurs, wash it off and discontinue use.",
            ]
          : []),
      ],
    };
  }

  if (skinType === "oily") {
    return {
      ritualName: lemonOptional ? "Fresh Herbal Ritual" : "Light Balancing Ritual",
      tagline: lemonOptional
        ? "A light rose-water mix. Lemon stays optional — only if your skin already tolerates it."
        : "A simple rose-water mix. Lemon is left out for this skin and sensitivity.",
      blend: "Bavapriya Facial Powder + Rose Water",
      ingredients: [
        powder,
        {
          name: "Rose Water",
          why: "Creates a light paste without a heavy creamy base.",
        },
      ],
      avoid: lemonOptional
        ? [
            "Lemon should not be used if the skin is sensitive, irritated, acne-inflamed, or easily reactive.",
            ...eggAvoid,
          ]
        : ["Lemon is not recommended for your current sensitivity level.", ...eggAvoid],
      avoidSummary: avoidSummary(skipLemon, egg),
      duration,
      frequency,
      prepare: [
        "Take 1–2 teaspoons of Bavapriya Facial Powder.",
        "Add rose water gradually and mix into a smooth paste.",
        lemonOptional
          ? "Optional: if your skin already tolerates lemon, add only a very small amount. Skip it if you are unsure."
          : "Do not add lemon to this mix.",
      ],
      application: [
        "Apply a thin, even layer to the face, avoiding the eyes and lips.",
        `Leave for approximately ${duration}.`,
        "Rinse gently with water and pat dry.",
      ],
      extraNotes: lemonOptional
        ? [
            "Lemon is optional, but only if your skin already tolerates it.",
            "Fresh lemon juice can irritate and increase sun sensitivity — never make it a default ingredient.",
          ]
        : [
            "Fresh lemon juice can irritate and increase sun sensitivity, so it is excluded from this ritual.",
          ],
    };
  }

  if (skinType === "combination") {
    return {
      ritualName: "Balanced Dual-Zone Ritual",
      tagline: "A lighter mix on oilier areas, a slightly richer mix where the skin feels dry. Same powder, two consistencies.",
      blend: "Bavapriya Facial Powder + Rose Water + Curd",
      ingredients: [
        powder,
        {
          name: "Rose Water",
          why: "Creates the basic paste for oilier areas such as the T-zone.",
        },
        {
          name: "Curd",
          why: "A small amount for areas that feel dry.",
        },
      ],
      avoid: [
        "Lemon is not recommended as a default for combination skin.",
        ...eggAvoid,
      ],
      avoidSummary: avoidSummary(true, egg),
      duration,
      frequency,
      prepare: [
        "Take 1–2 teaspoons of Bavapriya Facial Powder.",
        "Add rose water to create the basic paste.",
        "Add a small amount of curd for areas that feel dry.",
        "If desired, a small amount of honey can be added only to the drier areas.",
      ],
      application: [
        "Apply the lighter mixture to oilier areas such as the T-zone.",
        "Use the slightly richer mixture on areas that feel dry.",
        `Leave for approximately ${duration}, then rinse gently.`,
      ],
      extraNotes: [
        "Adjust the mixture according to different areas of the face rather than using one heavy paste everywhere.",
      ],
    };
  }

  return {
    ritualName: time === "5-10" ? "Everyday Glow Ritual" : "Honey Glow Ritual",
    tagline: "A balanced mix with rose water and honey. Curd is optional for a creamier feel.",
    blend: "Bavapriya Facial Powder + Rose Water + Honey",
    ingredients: [
      powder,
      { name: "Rose Water", why: "A light liquid base for a smooth paste." },
      {
        name: "Honey",
        why: "Adds slip and a touch of moisture without making the mix heavy.",
      },
    ],
    avoid: ["Lemon is not needed for normal skin.", ...eggAvoid],
    avoidSummary: avoidSummary(true, egg),
    duration,
    frequency,
    prepare: [
      "Take 1–2 teaspoons of Bavapriya Facial Powder.",
      "Add rose water and ½ teaspoon honey.",
      "Mix into a smooth paste.",
      "Curd may be added in a small quantity if a creamier consistency is preferred.",
    ],
    application: [
      "Apply evenly to clean skin, avoiding the eyes and lips.",
      `Leave for approximately ${duration}.`,
      "Rinse gently and pat dry.",
    ],
    extraNotes: [],
  };
}

const questions = [
  {
    key: "skinType" as const,
    step: "Step 1",
    title: "What is your skin type?",
    prompt: "How does your skin usually feel?",
    options: [
      { value: "dry", label: "Dry Skin", hint: "Often tight, flaky, or thirsty" },
      { value: "oily", label: "Oily Skin", hint: "Shine through the day" },
      { value: "combination", label: "Combination Skin", hint: "Oily T-zone, drier cheeks" },
      { value: "normal", label: "Normal Skin", hint: "Comfortable, fairly balanced" },
    ],
  },
  {
    key: "egg" as const,
    step: "Step 2",
    title: "Do you have an allergy or known sensitivity to egg white when applied to your face?",
    prompt: "Egg white is never required. This only decides whether it must stay out of the bowl.",
    options: [
      {
        value: "yes",
        label: "Yes",
        hint: "We recommend avoiding egg white completely in your facial ritual.",
      },
      {
        value: "no",
        label: "No",
        hint: "Egg white is still not part of the mix — it is simply not a risk for you.",
      },
      {
        value: "not-sure",
        label: "Not Sure",
        hint: "Do not use egg white unless you have previously established that it is suitable.",
      },
    ],
  },
  {
    key: "time" as const,
    step: "Step 3",
    title: "How much time can you spend on your facial ritual?",
    prompt: "Your duration should fit the life you actually live.",
    options: [
      { value: "5-10", label: "5–10 minutes", hint: "Quick & Simple" },
      { value: "10-15", label: "10–15 minutes", hint: "Balanced Ritual" },
      { value: "15-20", label: "15–20 minutes", hint: "Relaxed Ritual" },
      { value: "20+", label: "20+ minutes", hint: "Complete Self-Care Ritual" },
    ],
  },
  {
    key: "sensitivity" as const,
    step: "Step 4",
    title: "How sensitive is your skin?",
    prompt: "How does your skin react to new or natural ingredients?",
    options: [
      {
        value: "low",
        label: "Low Sensitivity",
        hint: "My skin rarely reacts to new products.",
      },
      {
        value: "moderate",
        label: "Moderate Sensitivity",
        hint: "My skin occasionally feels irritated or dry.",
      },
      {
        value: "high",
        label: "High Sensitivity",
        hint: "My skin easily becomes red, itchy, burning, or irritated.",
      },
    ],
  },
];

const introSteps = [
  { n: "1", title: "Skin type", body: "Dry, oily, combination, or normal." },
  { n: "2", title: "Egg white", body: "Allergy, no, or not sure." },
  { n: "3", title: "Time", body: "How long your ritual can last." },
  { n: "4", title: "Sensitivity", body: "How your skin handles new ingredients." },
];

const SkinQuiz = ({ showHeader = true }: { showHeader?: boolean }) => {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => buildRitual(answers), [answers]);
  const current = questions[stepIndex];
  const progress = showResult ? 100 : started ? ((stepIndex + 1) / questions.length) * 100 : 0;

  const selectOption = (value: string) => {
    const next = { ...answers, [current.key]: value } as Answers;
    setAnswers(next);
    if (stepIndex < questions.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (showResult) {
      setShowResult(false);
      setStepIndex(questions.length - 1);
      return;
    }
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      return;
    }
    setStarted(false);
  };

  const restart = () => {
    setStarted(false);
    setStepIndex(0);
    setAnswers(emptyAnswers);
    setShowResult(false);
  };

  const simpleSteps = result
    ? [
        "Cleanse your face gently.",
        "Prepare your personalized Bavapriya Facial Powder mixture.",
        "Apply an even layer to clean skin, avoiding the eye and lip area.",
        `Relax for approximately ${result.duration}, depending on your personalized recommendation.`,
        "Rinse gently with water.",
        "Pat your face dry rather than rubbing.",
        "Follow with your usual moisturizer if needed.",
      ]
    : [];

  return (
    <section className="relative overflow-hidden py-4 md:py-8">
      <motion.div
        className="max-w-4xl mx-auto my-8 p-6 md:p-10 bg-white rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showHeader && (
        <div className="text-center mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-[#8BA888] mb-3">
            Bavapriya Skin Ritual Finder
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3A4F41] mb-2">
            Discover the right natural ritual for your skin.
          </h2>
          <p className="text-[#3A4F41]/75 text-base md:text-lg max-w-2xl mx-auto">
            Answer a few simple questions and discover how to prepare your Bavapriya
            Facial Powder according to your skin type, sensitivity, and daily routine.
          </p>
          <p className="mt-4 text-sm text-[#3A4F41]/70 max-w-xl mx-auto">
            This is not a product picker. Bavapriya Facial Powder stays the base. The
            finder chooses the kitchen ingredients — rose water, curd, honey — to mix
            with it. Lemon is never a default.
          </p>
        </div>
        )}

        {started && (
          <div className="mb-8">
            <div className="relative h-1.5 bg-[#3A4F41]/10 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#8BA888] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#3A4F41]/60">
              <span>{showResult ? "Your ritual" : current.step}</span>
              <span>
                {showResult ? "Complete" : `Question ${stepIndex + 1} of ${questions.length}`}
              </span>
            </div>
          </div>
        )}

        <div className="min-h-64">
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="py-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {introSteps.map((step) => (
                    <div
                      key={step.n}
                      className="flex gap-3 rounded-xl border border-[#3A4F41]/10 bg-[#FAF9F6] px-4 py-4 text-left"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-[#8BA888] text-white text-sm flex items-center justify-center">
                        {step.n}
                      </span>
                      <div>
                        <p className="font-semibold text-[#3A4F41]">{step.title}</p>
                        <p className="text-sm text-[#3A4F41]/70 mt-0.5">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#3A4F41]/80 max-w-xl mx-auto mb-8 text-center">
                  Your answers interact with each other — sensitivity can simplify a
                  richer blend, lemon stays optional and is excluded for dry or sensitive
                  skin, and egg white stays out unless it is clearly right for you.
                </p>
                <div className="text-center">
                  <button
                    type="button"
                    className="bg-[#8BA888] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#3A4F41] transition-colors"
                    onClick={() => setStarted(true)}
                  >
                    Begin the finder
                  </button>
                </div>
              </motion.div>
            ) : !showResult ? (
              <motion.div
                key={`question-${stepIndex}`}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-6 inline-flex items-center text-sm text-[#3A4F41]/70 hover:text-[#3A4F41]"
                >
                  ← Back
                </button>
                <p className="text-[#8BA888] text-sm font-medium mb-2">{current.step}</p>
                <h3 className="text-2xl font-serif text-[#3A4F41] mb-2">{current.title}</h3>
                <p className="text-[#3A4F41]/70 mb-6">{current.prompt}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.options.map((option) => {
                    const selected = answers[current.key] === option.value;
                    return (
                      <button
                        type="button"
                        key={option.value}
                        onClick={() => selectOption(option.value)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          selected
                            ? "bg-[#F4F1EA] border-[#8BA888]"
                            : "bg-white border-[#3A4F41]/15 hover:border-[#8BA888] hover:shadow-sm"
                        }`}
                      >
                        <span className="block font-semibold text-[#3A4F41]">
                          {option.label}
                        </span>
                        <span className="block text-sm text-[#3A4F41]/65 mt-1">
                          {option.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-left"
              >
                <button
                  type="button"
                  onClick={goBack}
                  className="mb-6 inline-flex items-center text-sm text-[#3A4F41]/70 hover:text-[#3A4F41]"
                >
                  ← Back
                </button>
                <p className="uppercase tracking-[0.2em] text-xs text-[#8BA888] mb-2">
                  Your Personalized Bavapriya Ritual
                </p>
                <h3 className="text-3xl font-serif text-[#3A4F41] mb-2">{result.ritualName}</h3>
                <p className="text-[#3A4F41]/75 mb-6">{result.tagline}</p>

                <div className="bg-[#F4F1EA] rounded-2xl p-6 mb-6">
                  <p className="text-sm uppercase tracking-wider text-[#8BA888] mb-2">
                    Recommended blend
                  </p>
                  <p className="text-xl font-serif text-[#3A4F41] mb-4">{result.blend}</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <p>
                      <span className="font-semibold text-[#3A4F41]">Avoid: </span>
                      {result.avoidSummary}
                    </p>
                    <p>
                      <span className="font-semibold text-[#3A4F41]">Duration: </span>
                      {result.duration}
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-[#3A4F41]">Frequency: </span>
                      {result.frequency}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#3A4F41] mb-3">Why these ingredients?</h4>
                  <ul className="space-y-2">
                    {result.ingredients.map((item) => (
                      <li key={item.name} className="text-[#3A4F41]/80">
                        <span className="font-medium text-[#3A4F41]">{item.name}</span>
                        {" — "}
                        {item.why}
                      </li>
                    ))}
                  </ul>
                </div>

                {result.avoid.length > 0 && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                    <h4 className="font-semibold text-[#3A4F41] mb-2">Avoid</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#3A4F41]/80">
                      {result.avoid.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-[#3A4F41] mb-3">How to prepare</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-[#3A4F41]/80">
                      {result.prepare.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3A4F41] mb-3">Application</h4>
                    <ol className="list-decimal pl-5 space-y-2 text-[#3A4F41]/80">
                      {result.application.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {result.extraNotes.length > 0 && (
                  <ul className="mb-8 space-y-1 text-sm text-[#3A4F41]/70">
                    {result.extraNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                )}

                <div className="mb-8">
                  <h4 className="font-serif text-2xl text-[#3A4F41] mb-4">Your Simple Ritual</h4>
                  <ol className="space-y-3">
                    {simpleSteps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="shrink-0 w-7 h-7 rounded-full bg-[#8BA888] text-white text-sm flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-[#3A4F41]/85 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl bg-[#3A4F41] text-white p-6 md:p-8 mb-8">
                  <h4 className="font-serif text-2xl mb-2">A Ritual Made for You</h4>
                  <p className="text-white/85 leading-relaxed">
                    Your skin is unique. Your ritual should be too. Let nature become part
                    of your everyday self-care with a personalized Bavapriya Facial Ritual.
                  </p>
                </div>

                <p className="text-xs text-[#3A4F41]/50 mb-6">
                  This finder is a traditional self-care guide, not medical advice. Stop use
                  if irritation occurs.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-full font-semibold border border-[#3A4F41] text-[#3A4F41] hover:bg-[#F4F1EA]"
                    onClick={restart}
                  >
                    Start over
                  </button>
                  <Link
                    href="/product/1"
                    className="px-6 py-2 rounded-full font-semibold bg-[#3A4F41] text-white hover:bg-[#8BA888] inline-flex items-center"
                  >
                    Shop Bavapriya Facial Powder
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default SkinQuiz;
