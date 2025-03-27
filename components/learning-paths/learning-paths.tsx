"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Brain, Sparkles, ArrowRight, CheckCircle, Lock, Star, Trophy, Zap } from "lucide-react"

// Mock data for learning paths
const learningPaths = [
  {
    id: "math-fundamentals",
    title: "Mathematics Fundamentals",
    description: "Master the core concepts of mathematics from algebra to calculus",
    progress: 65,
    modules: [
      { id: "algebra", title: "Algebra Basics", completed: true, locked: false },
      { id: "geometry", title: "Geometry Essentials", completed: true, locked: false },
      { id: "trigonometry", title: "Trigonometry", completed: false, locked: false, current: true },
      { id: "calculus", title: "Calculus Introduction", completed: false, locked: true },
      { id: "statistics", title: "Statistics & Probability", completed: false, locked: true },
    ],
    icon: <BookOpen className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "coding-journey",
    title: "Coding Journey",
    description: "Learn programming from basics to advanced concepts",
    progress: 30,
    modules: [
      { id: "html-css", title: "HTML & CSS Fundamentals", completed: true, locked: false },
      { id: "javascript", title: "JavaScript Essentials", completed: false, locked: false, current: true },
      { id: "react", title: "React Framework", completed: false, locked: true },
      { id: "backend", title: "Backend Development", completed: false, locked: true },
      { id: "fullstack", title: "Full Stack Projects", completed: false, locked: true },
    ],
    icon: <Sparkles className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "science-explorer",
    title: "Science Explorer",
    description: "Discover the wonders of science across different disciplines",
    progress: 15,
    modules: [
      { id: "physics", title: "Physics Fundamentals", completed: true, locked: false },
      { id: "chemistry", title: "Chemistry Basics", completed: false, locked: false, current: true },
      { id: "biology", title: "Biology Concepts", completed: false, locked: true },
      { id: "astronomy", title: "Astronomy & Space", completed: false, locked: true },
      { id: "earth-science", title: "Earth Sciences", completed: false, locked: true },
    ],
    icon: <Brain className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
  },
]

export function LearningPaths() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  const handleSelectPath = (pathId: string) => {
    setSelectedPath(pathId === selectedPath ? null : pathId)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary/20 mr-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Paths</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-500/20 mr-4">
              <Trophy className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Modules Completed</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-emerald-500/20 mr-4">
              <Star className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Achievement Points</p>
              <h3 className="text-2xl font-bold">1,250</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {learningPaths.map((path) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${path.color} text-white mr-4`}>
                      {path.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{path.title}</h3>
                      <p className="text-muted-foreground">{path.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 md:w-40">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <Button
                      variant={selectedPath === path.id ? "default" : "outline"}
                      onClick={() => handleSelectPath(path.id)}
                      className="min-w-[100px]"
                    >
                      {selectedPath === path.id ? "Hide" : "View Path"}
                    </Button>
                  </div>
                </div>

                {selectedPath === path.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t"
                  >
                    <div className="space-y-4">
                      {path.modules.map((module, index) => (
                        <div
                          key={module.id}
                          className={`flex items-center p-4 rounded-lg border ${
                            module.current
                              ? "bg-primary/5 border-primary/30"
                              : module.locked
                                ? "bg-muted/30 border-muted"
                                : "bg-card"
                          }`}
                        >
                          <div className="flex-1 flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full mr-4 bg-muted">
                              {module.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : module.locked ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className={`font-medium ${module.locked ? "text-muted-foreground" : ""}`}>
                                {module.title}
                              </h4>
                              {module.current && (
                                <span className="text-xs text-primary font-medium">Current Module</span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant={module.locked ? "ghost" : module.completed ? "outline" : "default"}
                            size="sm"
                            disabled={module.locked}
                          >
                            {module.completed ? "Review" : module.current ? "Continue" : "Start"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-dashed">
                      <div className="flex items-start">
                        <Brain className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">AI Learning Recommendation</h4>
                          <p className="text-sm text-muted-foreground">
                            Based on your progress and learning style, we recommend focusing on
                            {path.id === "math-fundamentals"
                              ? " trigonometric identities and applications"
                              : path.id === "coding-journey"
                                ? " JavaScript array methods and DOM manipulation"
                                : " chemical bonding and reactions"}{" "}
                            next.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
        <div className="flex items-center mb-4">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-xl font-semibold">AI-Powered Learning Paths</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Our AI analyzes your learning patterns, strengths, and areas for improvement to create personalized learning
          paths that adapt as you progress. Each path is optimized to help you achieve your learning goals efficiently.
        </p>
        <Button className="w-full sm:w-auto">Generate New Custom Learning Path</Button>
      </Card>
    </div>
  )
}

