"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Math Solver", path: "/math-solver" },
    { name: "Notes", path: "/notes" },
    { name: "Collaborate", path: "/collaborate" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              MultiApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                  pathname === item.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="ml-2 p-2 text-muted-foreground hover:text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md ${
                  pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

