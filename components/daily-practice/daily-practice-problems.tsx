"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronRight,
  Brain,
  Sparkles,
  Clock,
  Trophy,
  Zap,
  BarChart3,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for daily practice problems
const mockProblems = {
  math: [
    {
      id: "math-1",
      question: "Solve for x: 2x + 5 = 15",
      options: ["x = 5", "x = 7", "x = 10", "x = 3"],
      correctAnswer: "x = 5",
      difficulty: "easy",
      explanation: "To solve for x, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.",
    },
    {
      id: "math-2",
      question: "Find the derivative of f(x) = x² + 3x - 2",
      options: ["f'(x) = 2x + 3", "f'(x) = x + 3", "f'(x) = 2x", "f'(x) = 2x - 2"],
      correctAnswer: "f'(x) = 2x + 3",
      difficulty: "medium",
      explanation:
        "The derivative of x² is 2x, and the derivative of 3x is 3. The derivative of a constant (-2) is 0. So f'(x) = 2x + 3.",
    },
    {
      id: "math-3",
      question: "Evaluate the integral ∫(2x + 1)dx from 0 to 3",
      options: ["12", "15", "9", "18"],
      correctAnswer: "15",
      difficulty: "hard",
      explanation: "∫(2x + 1)dx = x² + x + C. Evaluating from 0 to 3: (3² + 3) - (0² + 0) = 9 + 3 = 12.",
    },
  ],
  science: [
    {
      id: "science-1",
      question: "Which of the following is NOT a noble gas?",
      options: ["Helium", "Neon", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen",
      difficulty: "easy",
      explanation: "Nitrogen is not a noble gas. The noble gases are helium, neon, argon, krypton, xenon, and radon.",
    },
    {
      id: "science-2",
      question: "What is the primary function of mitochondria in a cell?",
      options: ["Protein synthesis", "Energy production", "Cell division", "Waste removal"],
      correctAnswer: "Energy production",
      difficulty: "medium",
      explanation:
        "Mitochondria are known as the powerhouse of the cell because they produce ATP, the energy currency of cells.",
    },
  ],
  coding: [
    {
      id: "coding-1",
      question:
        "What will be the output of the following JavaScript code?\n\nlet x = 5;\nlet y = '5';\nconsole.log(x == y);",
      options: ["true", "false", "undefined", "Error"],
      correctAnswer: "true",
      difficulty: "medium",
      explanation:
        "In JavaScript, the == operator performs type coercion, so it converts the string '5' to the number 5 before comparison.",
    },
    {
      id: "coding-2",
      question: "Which data structure follows the LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: "Stack",
      difficulty: "easy",
      explanation:
        "A stack follows the Last In First Out (LIFO) principle, where the last element added is the first one to be removed.",
    },
  ],
}

export function DailyPracticeProblems() {
  const [activeTab, setActiveTab] = useState("math")
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [completedProblems, setCompletedProblems] = useState<Record<string, string[]>>({
    math: [],
    science: [],
    coding: [],
  })

  const problems = mockProblems[activeTab as keyof typeof mockProblems]
  const currentProblem = problems[currentProblemIndex]

  // Start timer when a new problem is shown
  useEffect(() => {
    if (!isTimerRunning) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!isAnswered) {
            handleAnswer(null)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerRunning, isAnswered])

  // Reset timer when changing problems
  useEffect(() => {
    setTimeLeft(60)
    setIsTimerRunning(true)
    setIsAnswered(false)
    setSelectedAnswer(null)
  }, [activeTab])

  const handleAnswer = (answer: string | null) => {
    setSelectedAnswer(answer)
    setIsAnswered(true)
    setIsTimerRunning(false)

    const isCorrect = answer === currentProblem.correctAnswer

    if (isCorrect) {
      setStreak((prev) => prev + 1)
      setScore(
        (prev) => prev + (currentProblem.difficulty === "easy" ? 5 : currentProblem.difficulty === "medium" ? 10 : 15),
      )
    } else {
      setStreak(0)
    }

    // Mark problem as completed
    setCompletedProblems((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], currentProblem.id],
    }))
  }

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1)
    } else {
      // Cycle back to first problem if all are completed
      setCurrentProblemIndex(0)
    }
  }

  const resetProblems = () => {
    setCurrentProblemIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setTimeLeft(60)
    setIsTimerRunning(true)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setCurrentProblemIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setTimeLeft(60)
    setIsTimerRunning(true)
  }

  // Calculate completion percentage
  const completionPercentage = Math.round((completedProblems[activeTab].length / problems.length) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary/20 mr-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Score</p>
              <h3 className="text-2xl font-bold">{score}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500/20 mr-4">
              <Zap className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <h3 className="text-2xl font-bold">{streak}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-500/20 mr-4">
              <BarChart3 className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion</p>
              <h3 className="text-2xl font-bold">{completionPercentage}%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="math" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="science" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span>Science</span>
          </TabsTrigger>
          <TabsTrigger value="coding" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Coding</span>
          </TabsTrigger>
        </TabsList>

        {["math", "science", "coding"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card className="overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                        currentProblem.difficulty === "easy"
                          ? "bg-green-100 text-green-700"
                          : currentProblem.difficulty === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentProblemIndex + 1}
                    </span>
                    <span className="text-sm font-medium capitalize">{currentProblem.difficulty} Difficulty</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className={`text-sm font-medium ${timeLeft < 10 ? "text-red-500" : ""}`}>{timeLeft}s</span>
                  </div>
                </div>

                <Progress value={(timeLeft / 60) * 100} className="h-1 mb-6" />

                <h3 className="text-xl font-semibold mb-6">{currentProblem.question}</h3>

                <div className="space-y-3">
                  {currentProblem.options.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => !isAnswered && handleAnswer(option)}
                      className={`w-full p-4 text-left rounded-lg border transition-all ${
                        selectedAnswer === option && option === currentProblem.correctAnswer
                          ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                          : selectedAnswer === option
                            ? "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-500"
                            : isAnswered && option === currentProblem.correctAnswer
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-500"
                              : "bg-card hover:bg-muted/50"
                      }`}
                      whileHover={!isAnswered ? { scale: 1.01 } : {}}
                      whileTap={!isAnswered ? { scale: 0.99 } : {}}
                      disabled={isAnswered}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {isAnswered && option === currentProblem.correctAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        )}
                        {isAnswered && selectedAnswer === option && option !== currentProblem.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-muted/30"
                  >
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-muted-foreground mb-4">{currentProblem.explanation}</p>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetProblems}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset
                      </Button>
                      <Button onClick={nextProblem}>
                        Next Problem
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl font-semibold">AI Learning Insights</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Based on your performance, our AI suggests focusing on the following areas:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <span>
                Practice more{" "}
                {activeTab === "math"
                  ? "algebraic equations"
                  : activeTab === "science"
                    ? "molecular biology"
                    : "data structures"}
              </span>
            </li>
            <li className="flex items-start">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
              <span>
                Your response time is {timeLeft > 30 ? "excellent" : timeLeft > 15 ? "good" : "could be improved"}
              </span>
            </li>
          </ul>
          <Button variant="outline" className="w-full">
            View Personalized Learning Path
          </Button>
        </Card>
      </div>
    </div>
  )
}

