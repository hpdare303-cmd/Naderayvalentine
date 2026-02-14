
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Page() {
  const [phase, setPhase] = useState<"intro" | "question" | "success">("intro")

  useEffect(() => {
    const t = setTimeout(() => setPhase("question"), 4000)
    return () => clearTimeout(t)
  }, [])

  const playMusic = () => {
    const audio = new Audio("/audio/music.mp3")
    audio.volume = 0.6
    audio.play()
  }

  const handleYes = () => {
    playMusic()
    setPhase("success")
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      background: "linear-gradient(to bottom, #fff, #ffd6e7)",
      fontFamily: "sans-serif",
      textAlign: "center"
    }}>

      <AnimatePresence mode="wait">

        {phase === "intro" && (
          <motion.h1 key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            Dear Naderay... 💭
          </motion.h1>
        )}

        {phase === "question" && (
          <motion.div key="q" initial={{opacity:0}} animate={{opacity:1}}>
            <h1 style={{marginBottom:20}}>Will you be my Valentine? 💝</h1>
            <button onClick={handleYes} style={{
              padding:"14px 28px",
              fontSize:20,
              borderRadius:999,
              border:"none",
              background:"#ff4d88",
              color:"white",
              cursor:"pointer"
            }}>Yes 💕</button>
          </motion.div>
        )}

        {phase === "success" && (
          <motion.h1
            key="s"
            initial={{scale:0.8, opacity:0}}
            animate={{scale:1.1, opacity:1}}
            transition={{duration:1}}
          >
            You make my world bloom 🌸
          </motion.h1>
        )}

      </AnimatePresence>
    </div>
  )
}
