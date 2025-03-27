"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, User, Trash, Download } from "lucide-react"

// Mock user data
const currentUser = {
  id: "user1",
  name: "You",
  color: "#3b82f6",
}

interface Message {
  id: string
  userId: string
  userName: string
  text: string
  timestamp: Date
}

export function CollaborationBoard() {
  const [activeTab, setActiveTab] = useState("whiteboard")
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize canvas
  useEffect(() => {
    if (activeTab !== "whiteboard") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set canvas styles
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 2
    ctx.strokeStyle = currentUser.color

    // Clear canvas
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Handle window resize
    const handleResize = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.putImageData(imageData, 0, 0)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [activeTab])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Mock messages
  useEffect(() => {
    const mockMessages = [
      {
        id: "1",
        userId: "user2",
        userName: "John",
        text: "Hey, let's collaborate on this project!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        userId: "user1",
        userName: currentUser.name,
        text: "Sure, I'm ready to start. What's the plan?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        userId: "user2",
        userName: "John",
        text: "Let's start by sketching out the main components on the whiteboard.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
    ]

    setMessages(mockMessages)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    setLastX(x)
    setLastY(y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastX(x)
    setLastY(y)

    // In a real app, you would send this drawing data to other users
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "whiteboard.png"
    link.href = dataURL
    link.click()
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="whiteboard" className="flex-1 h-full">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Collaborative Whiteboard</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearCanvas}>
                  <Trash className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button variant="outline" size="sm" onClick={downloadCanvas}>
                  <Download className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            <div className="flex-1 relative bg-white">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="flex-1 h-full">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.userId === currentUser.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.userId === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4" />
                      <span className="text-xs font-medium">{message.userName}</span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

