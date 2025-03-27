"use client"

import { motion } from "framer-motion"
import { Calculator, FileText, Users, Zap, Brain, Bot, LineChart, Code } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function FeatureCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: "AI Math Solver",
      description: "Solve complex math problems with step-by-step explanations powered by advanced AI models",
      link: "/math-solver",
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Daily Practice Problems",
      description: "Sharpen your skills with AI-generated practice problems tailored to your learning level",
      link: "/daily-practice",
      color: "from-purple-500/20 to-purple-600/5",
      new: true,
    },
    {
      icon: <FileText className="h-10 w-10 text-emerald-500" />,
      title: "Smart Notes Organizer",
      description: "Organize your notes with AI-powered categorization, summaries, and knowledge connections",
      link: "/notes",
      color: "from-emerald-500/20 to-emerald-600/5",
    },
    {
      icon: <Users className="h-10 w-10 text-amber-500" />,
      title: "Collaborative Learning",
      description: "Work together in real-time with AI-facilitated whiteboard, chat, and knowledge sharing",
      link: "/collaborate",
      color: "from-amber-500/20 to-amber-600/5",
    },
    {
      icon: <Brain className="h-10 w-10 text-pink-500" />,
      title: "Personalized Learning Paths",
      description: "Follow AI-optimized learning paths based on your strengths, weaknesses, and goals",
      link: "/learning-paths",
      color: "from-pink-500/20 to-pink-600/5",
      new: true,
    },
    {
      icon: <Bot className="h-10 w-10 text-cyan-500" />,
      title: "AI Learning Assistant",
      description: "Get instant help from your personal AI tutor that adapts to your learning style",
      link: "/ai-assistant",
      color: "from-cyan-500/20 to-cyan-600/5",
      new: true,
    },
    {
      icon: <LineChart className="h-10 w-10 text-indigo-500" />,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed analytics and AI-powered improvement suggestions",
      link: "/analytics",
      color: "from-indigo-500/20 to-indigo-600/5",
      new: true,
    },
    {
      icon: <Code className="h-10 w-10 text-green-500" />,
      title: "Interactive Coding",
      description: "Learn programming with interactive challenges and real-time AI code reviews",
      link: "/coding",
      color: "from-green-500/20 to-green-600/5",
      new: true,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="py-16 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              AI-Powered
            </span>{" "}
            Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with proven learning methodologies to create a truly
            next-generation educational experience.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Glow effect */}
              <div
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`}
              ></div>

              <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative h-full flex flex-col">
                {feature.new && (
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                      NEW
                    </span>
                  </div>
                )}

                <div className="mb-4 relative">
                  {/* Icon with glow effect */}
                  <div className="relative">
                    {feature.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-md"
                      animate={
                        hoveredIndex === index
                          ? {
                              opacity: [0, 0.5, 0],
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                      style={{
                        backgroundColor:
                          hoveredIndex === index
                            ? feature.title.includes("Math")
                              ? "#3b82f6"
                              : feature.title.includes("Daily")
                                ? "#8b5cf6"
                                : feature.title.includes("Notes")
                                  ? "#10b981"
                                  : feature.title.includes("Collaborative")
                                    ? "#f59e0b"
                                    : feature.title.includes("Personalized")
                                      ? "#ec4899"
                                      : feature.title.includes("Assistant")
                                        ? "#06b6d4"
                                        : feature.title.includes("Progress")
                                          ? "#6366f1"
                                          : "#22c55e"
                            : "transparent",
                      }}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>

                <Link
                  href={feature.link}
                  className="text-primary hover:text-primary/80 font-medium flex items-center group-hover:underline"
                >
                  Explore
                  <motion.span
                    animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1, repeat: hoveredIndex === index ? Number.POSITIVE_INFINITY : 0 }}
                    className="inline-block ml-1"
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

