"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { Brain, Sparkles, Bot, Zap } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Particle animation setup
    if (typeof window !== "undefined" && containerRef.current) {
      const container = containerRef.current
      const particlesCount = 50
      const particles: HTMLDivElement[] = []

      // Create particles
      for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full bg-primary/20 pointer-events-none"

        // Random size between 4px and 12px
        const size = Math.random() * 8 + 4
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random position
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Random animation duration between 20s and 40s
        const duration = Math.random() * 20 + 20
        particle.style.animation = `float ${duration}s infinite linear`

        container.appendChild(particle)
        particles.push(particle)
      }

      // Animate particles
      const animateParticles = () => {
        particles.forEach((particle) => {
          // Move particles slightly based on mouse position
          const x = Number.parseFloat(particle.style.left)
          const y = Number.parseFloat(particle.style.top)

          // Slowly drift particles
          particle.style.left = `${(x + (Math.random() * 0.2 - 0.1)) % 100}%`
          particle.style.top = `${(y + (Math.random() * 0.2 - 0.1)) % 100}%`
        })

        requestAnimationFrame(animateParticles)
      }

      animateParticles()

      return () => {
        // Cleanup
        particles.forEach((particle) => particle.remove())
      }
    }
  }, [])

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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  const glowItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        yoyo: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      },
    },
  }

  return (
    <div className="relative overflow-hidden">
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0 z-0"></div>

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"></div>

      {/* Glow effects */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl z-0"></div>

      <motion.div
        className="py-20 md:py-32 text-center relative z-10"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div
          className="absolute top-0 right-1/4 text-primary"
          variants={glowItem}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Sparkles className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/4 text-purple-500"
          variants={glowItem}
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          <Brain className="h-8 w-8 md:h-12 md:w-12" />
        </motion.div>

        <motion.h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight" variants={item}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            Next-Gen
          </span>{" "}
          <span className="relative">
            Learning
            <motion.span
              className="absolute -top-6 -right-6 text-primary"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Zap className="h-6 w-6 md:h-8 md:w-8" />
            </motion.span>
          </span>
        </motion.h1>

        <motion.div className="flex items-center justify-center mb-8" variants={item}>
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
          <p className="text-lg md:text-2xl text-muted-foreground px-4 font-light">
            Powered by Artificial Intelligence
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
        </motion.div>

        <motion.p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto font-light" variants={item}>
          Experience adaptive learning with AI-driven insights, personalized practice problems, and collaborative tools
          designed for the future of education.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mb-12" variants={item}>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg shadow-primary/20 h-12 px-8"
          >
            <Link href="/math-solver">
              <Sparkles className="mr-2 h-4 w-4" />
              Try AI Math Solver
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/20 backdrop-blur-sm bg-background/50 h-12 px-8"
          >
            <Link href="/daily-practice">
              <Zap className="mr-2 h-4 w-4" />
              Daily Practice
            </Link>
          </Button>
        </motion.div>

        <motion.div className="flex items-center justify-center gap-2 text-muted-foreground" variants={item}>
          <Bot className="h-5 w-5" />
          <span className="text-sm">AI-powered learning assistant available 24/7</span>
        </motion.div>
      </motion.div>

      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            fillOpacity="0.1"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="text-primary"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,133.3C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>

      {/* Add custom keyframes for floating particles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, 10px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(20px, 0) scale(1);
            opacity: 0.3;
          }
          75% {
            transform: translate(10px, -10px) scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}

