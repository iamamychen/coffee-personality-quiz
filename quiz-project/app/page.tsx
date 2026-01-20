"use client";

import { useState } from "react";

type Personality = "boldAdventurer" | "healthNut" | "practicalPragmatist" | "indulgentTreat";

type QuizState = "intro" | "quiz" | "result";

interface PersonalityData {
  name: string;
  coffee: string;
  tagline: string;
}

interface Answer {
  text: string;
  personality: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const personalities: Record<Personality, PersonalityData> = {
  boldAdventurer: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
  },
  healthNut: {
    name: "Health Nut",
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
  },
  practicalPragmatist: {
    name: "Practical Pragmatist",
    coffee: "Large Drip, Whatever's Fresh",
    tagline: "Just make it work",
  },
  indulgentTreat: {
    name: "Indulgent Treat",
    coffee: "Mocha with Whip",
    tagline: "Coffee is dessert",
  },
};

const questions: Question[] = [
  {
    question: "What's your ideal weekend morning?",
    answers: [
      { text: "Sleeping in, then treating myself to something delicious", personality: "indulgentTreat" },
      { text: "Up early for a workout or hike", personality: "healthNut" },
      { text: "Whatever gets me moving efficiently", personality: "practicalPragmatist" },
      { text: "Trying something new and spontaneous", personality: "boldAdventurer" },
    ],
  },
  {
    question: "You're picking a restaurant. What matters most?",
    answers: [
      { text: "The dessert menu looks incredible", personality: "indulgentTreat" },
      { text: "They have healthy, fresh options", personality: "healthNut" },
      { text: "It's nearby and has good reviews", personality: "practicalPragmatist" },
      { text: "It's a new spot I've never tried", personality: "boldAdventurer" },
    ],
  },
  {
    question: "How do you approach a long to-do list?",
    answers: [
      { text: "Reward myself with treats along the way", personality: "indulgentTreat" },
      { text: "Break it into energizing chunks with movement breaks", personality: "healthNut" },
      { text: "Just power through, most efficient path", personality: "practicalPragmatist" },
      { text: "Tackle the hardest thing first for the rush", personality: "boldAdventurer" },
    ],
  },
  {
    question: "What's your travel style?",
    answers: [
      { text: "Comfort and indulgence - nice hotels, good food", personality: "indulgentTreat" },
      { text: "Active adventures - hiking, biking, exploring", personality: "healthNut" },
      { text: "Well-planned with a practical itinerary", personality: "practicalPragmatist" },
      { text: "Spontaneous - book a flight and figure it out", personality: "boldAdventurer" },
    ],
  },
  {
    question: "It's Friday night. What sounds best?",
    answers: [
      { text: "Cozy movie night with snacks and sweets", personality: "indulgentTreat" },
      { text: "Yoga class or an evening run", personality: "healthNut" },
      { text: "Low-key dinner, early bedtime", personality: "practicalPragmatist" },
      { text: "Saying yes to whatever adventure comes up", personality: "boldAdventurer" },
    ],
  },
];

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<Personality, number>>({
    boldAdventurer: 0,
    healthNut: 0,
    practicalPragmatist: 0,
    indulgentTreat: 0,
  });
  const [selectedAnswers, setSelectedAnswers] = useState<Personality[]>([]);

  const handleStart = () => {
    setQuizState("quiz");
  };

  const handleAnswer = (personality: Personality) => {
    const newScores = { ...scores };
    newScores[personality]++;
    setScores(newScores);

    const newSelectedAnswers = [...selectedAnswers, personality];
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizState("result");
    }
  };

  const handleRetake = () => {
    setQuizState("intro");
    setCurrentQuestion(0);
    setScores({
      boldAdventurer: 0,
      healthNut: 0,
      practicalPragmatist: 0,
      indulgentTreat: 0,
    });
    setSelectedAnswers([]);
  };

  const getWinningPersonality = (): Personality => {
    let maxScore = 0;
    let winner: Personality = "boldAdventurer";

    // Find max score
    for (const [personality, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        winner = personality as Personality;
      }
    }

    // In case of tie, return the first personality selected among those tied
    const tiedPersonalities = Object.entries(scores)
      .filter(([, score]) => score === maxScore)
      .map(([personality]) => personality as Personality);

    if (tiedPersonalities.length > 1) {
      for (const answer of selectedAnswers) {
        if (tiedPersonalities.includes(answer)) {
          return answer;
        }
      }
    }

    return winner;
  };

  // Intro Screen
  if (quizState === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="w-full max-w-lg rounded-3xl p-8 text-center shadow-lg"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <h1
            className="mb-4 text-4xl font-bold"
            style={{ color: "var(--accent-dark)", fontFamily: "var(--font-lora), Lora, serif" }}
          >
            Welcome! Learn Your Coffee Personality
          </h1>
          <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
            Answer 5 quick questions to find out which coffee matches your vibe.
          </p>
          <button
            onClick={handleStart}
            className="rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-md"
            style={{ backgroundColor: "var(--accent-dark)" }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (quizState === "quiz") {
    const question = questions[currentQuestion];

    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="w-full max-w-lg rounded-3xl p-8 shadow-lg"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Progress Dots */}
          <div className="mb-6 flex justify-center gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-full transition-all"
                style={{
                  backgroundColor:
                    index === currentQuestion
                      ? "var(--accent-dark)"
                      : index < currentQuestion
                      ? "var(--accent-light)"
                      : "#d4c4b0",
                }}
              />
            ))}
          </div>

          {/* Question */}
          <h2
            className="mb-6 text-center text-2xl font-bold"
            style={{ color: "var(--accent-dark)", fontFamily: "var(--font-lora), Lora, serif" }}
          >
            {question.question}
          </h2>

          {/* Answers */}
          <div className="flex flex-col gap-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.personality)}
                className="rounded-2xl border-2 p-4 text-left transition-all hover:scale-[1.02] hover:shadow-md"
                style={{
                  borderColor: "var(--accent-light)",
                  backgroundColor: "white",
                  color: "var(--text-primary)",
                }}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result Screen
  const winningPersonality = getWinningPersonality();
  const result = personalities[winningPersonality];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div
        className="w-full max-w-lg rounded-3xl p-8 text-center shadow-lg"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <p className="mb-2 text-sm uppercase tracking-wide" style={{ color: "var(--accent-light)" }}>
          Your coffee personality is
        </p>
        <h1
          className="mb-2 text-4xl font-bold"
          style={{ color: "var(--accent-dark)", fontFamily: "var(--font-lora), Lora, serif" }}
        >
          {result.name}
        </h1>
        <p className="mb-6 text-xl italic" style={{ color: "var(--text-secondary)" }}>
          &ldquo;{result.tagline}&rdquo;
        </p>

        <div
          className="mb-8 rounded-2xl p-6"
          style={{ backgroundColor: "var(--background-start)" }}
        >
          <p className="mb-1 text-sm uppercase tracking-wide" style={{ color: "var(--accent-light)" }}>
            Your perfect drink
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--accent-dark)", fontFamily: "var(--font-lora), Lora, serif" }}
          >
            {result.coffee}
          </p>
        </div>

        <button
          onClick={handleRetake}
          className="rounded-full px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:shadow-md"
          style={{ backgroundColor: "var(--accent-dark)" }}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
