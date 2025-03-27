"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calculator, FileText, User } from "lucide-react"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "January 2023",
  savedEquations: [
    { id: "1", equation: "2x + 5 = 15", solution: "x = 5" },
    { id: "2", equation: "y = 2x + 3", solution: "Linear equation" },
    { id: "3", equation: "x² + 4x + 4 = 0", solution: "x = -2" },
  ],
  savedNotes: [
    { id: "1", title: "Math Formulas", category: "Math" },
    { id: "2", title: "Physics Laws", category: "Science" },
    { id: "3", title: "Programming Concepts", category: "Computer Science" },
  ],
}

export function ProfileSection() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.email}</p>
            <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
            <div className="flex justify-center sm:justify-start gap-2 mt-4">
              <Button>Edit Profile</Button>
              <Button variant="outline">Change Avatar</Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="equations" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Saved Equations</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Saved Notes</span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="profile" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p>{userData.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Subscription</p>
                      <p>Free Plan</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-md font-semibold mb-2">Account Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                      <Button variant="outline" size="sm">
                        Export Data
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="equations" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Saved Equations</h3>
                {userData.savedEquations.length === 0 ? (
                  <p className="text-muted-foreground">No saved equations yet.</p>
                ) : (
                  <div className="space-y-4">
                    {userData.savedEquations.map((eq, index) => (
                      <motion.div
                        key={eq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="font-mono">{eq.equation}</p>
                            <p className="text-sm text-muted-foreground mt-1">Solution: {eq.solution}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Calculator className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Saved Notes</h3>
                {userData.savedNotes.length === 0 ? (
                  <p className="text-muted-foreground">No saved notes yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.savedNotes.map((note, index) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg"
                      >
                        <h4 className="font-semibold">{note.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 px-2 py-1 bg-muted rounded-full inline-block">
                          {note.category}
                        </p>
                        <div className="flex justify-end mt-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

