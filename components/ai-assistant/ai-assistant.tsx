"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calculator,
  Code,
  Lightbulb,
  Loader2,
  Zap,
  Maximize2,
  Minimize2,
} from "lucide-react"

// Mock conversation data
const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI learning assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
]

// Mock suggested questions
const suggestedQuestions = [
  "Explain the quadratic formula",
  "Help me understand photosynthesis",
  "What are JavaScript closures?",
  "How do I solve systems of equations?",
  "Explain Newton's laws of motion",
]

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("quadratic")) {
        response =
          "The quadratic formula is used to solve quadratic equations of the form ax² + bx + c = 0. The formula is: x = (-b ± √(b² - 4ac)) / 2a. The ± symbol means you'll get two solutions: one with addition and one with subtraction."
      } else if (input.toLowerCase().includes("photosynthesis")) {
        response =
          "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water. The process can be summarized as: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂."
      } else if (input.toLowerCase().includes("javascript") || input.toLowerCase().includes("closures")) {
        response =
          "In JavaScript, a closure is a function that has access to its own scope, the outer function's scope, and the global scope. Closures are created every time a function is created, at function creation time. They're useful for data encapsulation and creating private variables."
      } else {
        response =
          "That's an interesting question! I'd be happy to help you understand this topic better. Let me break it down for you step by step..."
      }

      const aiMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    handleSendMessage()
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <motion.div
      className={`${isFullScreen ? "fixed inset-0 z-50 bg-background" : "relative"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${isFullScreen ? "h-screen flex flex-col p-4" : ""}`}>
        <div className={`flex justify-between items-center ${isFullScreen ? "mb-4" : "mb-6"}`}>
          {isFullScreen && <h2 className="text-2xl font-bold">AI Learning Assistant</h2>}
          <Button variant="ghost" size="icon" onClick={toggleFullScreen} className={`${isFullScreen ? "" : "ml-auto"}`}>
            {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </Button>
        </div>

        <div className={`${isFullScreen ? "flex-1 flex flex-col" : ""}`}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={`${isFullScreen ? "flex-1 flex flex-col" : ""}`}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className={`mt-6 ${isFullScreen ? "flex-1 flex flex-col" : ""}`}>
              <Card className={`${isFullScreen ? "flex-1 flex flex-col" : "h-[500px] flex flex-col"}`}>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {message.role === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4 text-primary" />
                            )}
                            <span className="text-xs font-medium">
                              {message.role === "user" ? "You" : "AI Assistant"}
                            </span>
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[80%] rounded-lg p-4 bg-card border">
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="h-4 w-4 text-primary" />
                            <span className="text-xs font-medium">AI Assistant</span>
                            <Loader2 />
                            <span className="text-xs font-medium">AI Assistant</span>
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="animate-pulse">•</span>
                            <span className="animate-pulse delay-100">•</span>
                            <span className="animate-pulse delay-200">•</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-4 border-t">
                  {messages.length === 1 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-xs"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about your studies..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <Sparkles className="h-3 w-3 text-primary mr-1" />
                    <span className="text-xs text-muted-foreground">Powered by advanced AI models</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Learning Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center mb-2">
                      <Calculator className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Mathematics</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Access formulas, tutorials, and practice problems for all math topics.
                    </p>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                      <h4 className="font-medium">Science</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Discover interactive lessons on physics, chemistry, biology, and more.
                    </p>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center mb-2">
                      <Code className="h-5 w-5 text-emerald-500 mr-2" />
                      <h4 className="font-medium">Programming</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn coding with interactive tutorials and real-world projects.
                    </p>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                      <h4 className="font-medium">Study Tips</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Improve your learning efficiency with proven study techniques.
                    </p>
                    <Button variant="outline" size="sm">
                      Explore
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-primary mr-2" />
                    <h4 className="font-medium">AI-Recommended Resources</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your recent activity, these resources might help you:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Advanced Algebra: Solving Quadratic Equations</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>JavaScript Fundamentals: Working with Functions</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      <span>Biology: Understanding Cell Structure and Function</span>
                    </li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}

