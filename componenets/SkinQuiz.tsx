"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkinQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{questionId: number; answer: string}[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: "What best describes your skin type?",
      options: [
        { text: "Oily", value: "oily", emoji: "💧" },
        { text: "Dry", value: "dry", emoji: "🏜️" },
        { text: "Combination", value: "combination", emoji: "🌓" },
        { text: "Normal", value: "normal", emoji: "🌸" }
      ]
    },
    {
      id: 2,
      question: "How sensitive is your skin?",
      options: [
        { text: "Very sensitive", value: "very-sensitive", emoji: "🥵" },
        { text: "Somewhat sensitive", value: "somewhat-sensitive", emoji: "😐" },
        { text: "Not very sensitive", value: "not-sensitive", emoji: "😌" },
        { text: "I'm not sure", value: "unsure", emoji: "🤔" }
      ]
    },
    {
      id: 3,
      question: "Do you experience acne or breakouts?",
      options: [
        { text: "Frequently", value: "frequent", emoji: "😫" },
        { text: "Occasionally", value: "occasional", emoji: "😣" },
        { text: "Rarely", value: "rare", emoji: "🙂" },
        { text: "Never", value: "never", emoji: "😊" }
      ]
    },
    {
      id: 4,
      question: "What's your primary skin concern?",
      options: [
        { text: "Hydration", value: "hydration", emoji: "💦" },
        { text: "Anti-aging", value: "anti-aging", emoji: "🧓" },
        { text: "Even tone", value: "even-tone", emoji: "🎨" },
        { text: "Acne/scars", value: "acne", emoji: "🔴" }
      ]
    },
    {
      id: 5,
      question: "How does your skin feel after cleansing?",
      options: [
        { text: "Tight and dry", value: "tight", emoji: "🧊" },
        { text: "Comfortable", value: "comfortable", emoji: "😌" },
        { text: "Oily", value: "oily-after", emoji: "🛢️" },
        { text: "Some dry areas, some oily", value: "combination-after", emoji: "🌗" }
      ]
    }
  ];

  const productRecommendations = {
    "oily-acne": {
      name: "Neem & Turmeric Purifying Pack",
      description: "This antibacterial blend helps control excess oil and prevent breakouts while soothing inflammation.",
      image: "https://i.pinimg.com/474x/be/52/f4/be52f43cf114b93d0013c2f9c64b10ba.jpg"
    },
    "dry-sensitive": {
      name: "Sandalwood Nourishing Face Pack",
      description: "Ultra-calming formula with sandalwood and rose to hydrate and soothe delicate skin.",
      image: "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg"
    },
    "combination-anti-aging": {
      name: "Herbal Ubtan Radiance Pack",
      description: "Balancing formula with antioxidants to address multiple aging concerns without drying.",
      image: "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg"
    },
    "normal-maintenance": {
      name: "Rose & Almond Glow Pack",
      description: "Gentle exfoliation and hydration to maintain your skin's natural balance and radiance.",
      image: "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg"
    },
    "default": {
      name: "Classic Ayurvedic Face Pack",
      description: "Our signature blend suitable for most skin types to cleanse, nourish and brighten.",
      image: "https://i.pinimg.com/736x/4d/00/1c/4d001c84470bce9f13c034a05399eab3.jpg"
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      setAnswers([...answers, { questionId: questions[currentQuestion].id, answer: option }]);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const determineResult = () => {
    const skinType = answers.find(a => a.questionId === 1)?.answer;
    const sensitivity = answers.find(a => a.questionId === 2)?.answer;
    const acne = answers.find(a => a.questionId === 3)?.answer;
    const concern = answers.find(a => a.questionId === 4)?.answer;

    if (skinType === 'oily' && concern === 'acne') {
      return 'oily-acne';
    } else if (skinType === 'dry' && (sensitivity === 'very-sensitive' || concern === 'hydration')) {
      return 'dry-sensitive';
    } else if (skinType === 'combination' && concern === 'anti-aging') {
      return 'combination-anti-aging';
    } else if (skinType === 'normal') {
      return 'normal-maintenance';
    } else {
      return 'default';
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const result = determineResult();
  const recommendation = productRecommendations[result] || productRecommendations.default;

  return (
    <section id="skinType" className="relative overflow-hidden">
      <motion.div 
        className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-lg "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-2">Find Your Perfect Ayurvedic Match</h2>
          <p className="text-amber-700 text-lg">Answer a few questions to discover which herbal formulation works best for your skin</p>
        </div>

        <div className="mb-8 relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-amber-700 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
          <span className="absolute right-0 top-2 text-xs text-amber-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <div className="min-h-64">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-2xl text-center font-medium text-amber-900 mb-6">
                  {questions[currentQuestion].question}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                        selectedOption === option.value 
                          ? 'bg-amber-50 border-amber-300 scale-95' 
                          : 'bg-white border-gray-200 hover:shadow-md'
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-3xl mb-2">{option.emoji}</span>
                      <span className="font-medium text-amber-900">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">Your Personalized Recommendation</h3>
                  <p className="text-amber-700">Based on your answers, we've found the perfect match for your skin</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 bg-amber-50 p-8 rounded-xl mb-8">
                  <motion.img 
                    src={recommendation.image} 
                    alt={recommendation.name}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                    initial={{ rotate: -5, y: 20 }}
                    animate={{ rotate: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-xl font-bold text-amber-900 mb-2">{recommendation.name}</h4>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>
                    <motion.button
                      className="bg-amber-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Product Details
                    </motion.button>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    className="px-6 py-2 rounded-full font-semibold border border-amber-700 text-amber-700 hover:bg-amber-50"
                    onClick={restartQuiz}
                  >
                    Take Quiz Again
                  </button>
                  <button className="px-6 py-2 rounded-full font-semibold bg-amber-900 text-white hover:bg-amber-800">
                    Browse All Products
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-12 -left-12 w-36 h-36 opacity-10 -z-10">
        <img 
          src="https://www.transparentpng.com/thumb/leaf/tea-leaf-transparent-background-9.png" 
          alt="leaf decoration"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute -bottom-12 -right-12 w-36 h-36 opacity-10 -z-10 rotate-15">
        <img 
          src="https://www.transparentpng.com/thumb/leaf/leaf-transparent-background-12.png" 
          alt="leaf decoration"
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default SkinQuiz;