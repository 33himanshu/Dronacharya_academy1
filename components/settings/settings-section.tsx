"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Palette, Zap, Lock, Eye } from "lucide-react"

export function SettingsSection() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("appearance")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Theme</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={() => handleThemeChange("light")}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    onClick={() => handleThemeChange("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Animations</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="animations">Enable animations</Label>
                    <p className="text-sm text-muted-foreground">Toggle animations throughout the application</p>
                  </div>
                  <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Accessibility</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduced-motion">Reduced motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Use simpler animations for users who prefer reduced motion
                    </p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Enable notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for updates and messages</p>
                  </div>
                  <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Sounds</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sounds">Enable sounds</Label>
                    <p className="text-sm text-muted-foreground">Play sounds for notifications and actions</p>
                  </div>
                  <Switch id="sounds" checked={soundsEnabled} onCheckedChange={setSoundsEnabled} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Auto-Save</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-save">Enable auto-save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your work every few minutes</p>
                  </div>
                  <Switch id="auto-save" checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
                </div>
              </div>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Privacy</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-collection">Data collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve the app
                    </p>
                  </div>
                  <Switch id="data-collection" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Visibility</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="profile-visibility">Profile visibility</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch id="profile-visibility" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View login history
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Data Export</h3>
                <Button variant="outline">Export all data</Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

