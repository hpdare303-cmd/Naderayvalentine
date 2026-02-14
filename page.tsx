
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw } from "lucide-react"

type Phase = "intro" | "question" | "success"
type NoButtonText = "No" | "Are you sure? 🥺" | "Wrong button! ✋" | "Think again... 💭" | "I'm gonna cry 😭" | "Fine, try to catch me! 🏃"

const noButtonTexts: NoButtonText[] = [
  "No",
  "Are you sure? 🥺",
  "Wrong button! ✋",
  "Think again... 💭",
  "I'm gonna cry 😭",
  "Fine, try to catch me! 🏃"
]

export default function ValentinePage() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [introStep, setIntroStep] = useState(0)
  const [noButtonIndex, setNoButtonIndex] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [yesButtonSaturation, setYesButtonSaturation] = useState(100)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [hasMovedNoButton, setHasMovedNoButton] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const introMessages = [
    "Dear Naderay... 💭",
    "I've been thinking of you all day... 💌",
    "And there is something I've been meaning to ask you... 💝"
  ]

  // Update screen dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth)
      setScreenHeight(window.innerHeight)

      const handleResize = () => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Phase 1: Auto-play intro
  useEffect(() => {
    if (phase !== "intro") return

    const timer = setTimeout(() => {
      if (introStep < introMessages.length - 1) {
        setIntroStep(introStep + 1)
      } else {
        // Transition to question phase
        setTimeout(() => setPhase("question"), 1000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [phase, introStep])

  const moveNoButton = () => {
    // Get viewport dimensions
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
    
    // Button dimensions (approximate with extra padding for safety)
    const buttonWidth = 200
    const buttonHeight = 60
    const margin = 20

    // Calculate safe boundaries - ensure button stays fully visible
    const minX = margin
    const maxX = viewportWidth - buttonWidth - margin
    const minY = margin
    const maxY = viewportHeight - buttonHeight - margin

    // Generate random position within safe boundaries
    const newX = Math.random() * (maxX - minX) + minX
    const newY = Math.random() * (maxY - minY) + minY

    setNoButtonPosition({ x: newX, y: newY })
    setNoButtonIndex((prev) => (prev + 1) % noButtonTexts.length)
    setHasMovedNoButton(true)
    
    // Grow yes button
    setYesButtonScale((prev) => prev + 0.1)
    setYesButtonSaturation((prev) => Math.min(prev + 5, 150))
  }

  const handleNoHover = () => {
    moveNoButton()
  }

  const handleNoTouch = (e: React.TouchEvent) => {
    e.preventDefault()
    moveNoButton()
  }

  const handleYesClick = () => {
    setPhase("success")
  }

  const resetApp = () => {
    setPhase("intro")
    setIntroStep(0)
    setNoButtonIndex(0)
    setNoButtonPosition({ x: 0, y: 0 })
    setYesButtonScale(1)
    setYesButtonSaturation(100)
    setHasMovedNoButton(false)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-b from-white to-[#FFDEE9]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Great+Vibes&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif;
        }
        
        .calligraphy {
          font-family: 'Great Vibes', cursive;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {/* Phase 1: Intro */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full flex-col items-center justify-center"
          >
            {/* Pulsing Heart */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mb-8 text-8xl"
            >
              ❤️
            </motion.div>

            {/* Text Messages with Blur Transition */}
            <AnimatePresence mode="wait">
              <motion.p
                key={introStep}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="text-center text-2xl text-gray-600 px-8"
              >
                {introMessages[introStep]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

        {/* Phase 2: Question */}
        {phase === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full w-full flex-col items-center justify-center gap-12 px-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-semibold text-center text-rose-400"
            >
              Naderay, will you be my Valentine? 💝
            </motion.h1>

            <div className="flex flex-col items-center gap-6 relative w-full max-w-md">
              {/* Yes Button */}
              <motion.button
                onClick={handleYesClick}
                animate={{
                  scale: [yesButtonScale, yesButtonScale * 1.02, yesButtonScale],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  scale: yesButtonScale,
                  filter: `saturate(${yesButtonSaturation}%)`
                }}
                className="px-12 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Yes 💕
              </motion.button>

              {/* No Button - Moves on Hover/Touch */}
              <motion.button
                ref={noButtonRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoTouch}
                animate={hasMovedNoButton ? {
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                } : {}}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  duration: 0.6
                }}
                style={hasMovedNoButton ? {
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform'
                } : {}}
                className="px-8 py-3 border-2 border-gray-300 text-gray-500 rounded-full text-lg font-medium hover:border-gray-400 transition-colors"
              >
                {noButtonTexts[noButtonIndex]}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Phase 3: Success */}
        {phase === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full w-full flex-col items-center justify-center relative"
          >
            {/* Floating Hearts - Full Screen Layer */}
            <div className="fixed inset-0 pointer-events-none z-0">
              {screenWidth > 0 && screenHeight > 0 && Array.from({ length: 50 }).map((_, i) => {
                // Distribute hearts evenly across the screen width
                const startX = (screenWidth / 50) * i + Math.random() * (screenWidth / 50)
                // Add horizontal drift for more natural movement
                const driftAmount = (Math.random() - 0.5) * 200
                
                return (
                  <motion.div
                    key={i}
                    initial={{
                      x: startX,
                      y: screenHeight + 50,
                      opacity: 0.3 + Math.random() * 0.5,
                      scale: 0.5 + Math.random() * 0.8,
                      rotate: Math.random() * 360
                    }}
                    animate={{
                      y: -100,
                      x: startX + driftAmount,
                      rotate: Math.random() * 360 + 360
                    }}
                    transition={{
                      duration: 6 + Math.random() * 4,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      ease: "linear"
                    }}
                    className="absolute text-4xl text-pink-300"
                    style={{ 
                      transform: 'translate3d(0, 0, 0)',
                      willChange: 'transform',
                      left: 0,
                      top: 0
                    }}
                  >
                    💗
                  </motion.div>
                )
              })}
            </div>

            {/* Success Messages */}
            <div className="z-10 flex flex-col items-center gap-8 px-8">
              <motion.h1
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1.2 }}
                className="calligraphy text-6xl md:text-7xl text-center text-rose-400"
              >
                Naderay, you make my world bloom 🌸
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 1.5 }}
                className="text-2xl md:text-3xl text-center text-gray-600 font-light"
              >
                I love you more than words can say 💖
              </motion.p>
            </div>

            {/* Reset Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={resetApp}
              className="absolute bottom-8 z-20 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={16} />
              Answer again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
