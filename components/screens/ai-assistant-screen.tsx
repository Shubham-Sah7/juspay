"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Send, 
  Plus, 
  Mic, 
  MicOff, 
  ChevronRight, 
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"

interface AIAssistantScreenProps {
  onOpenDrilldown: () => void
}

type AIMode = "chat" | "voice"

interface ChatMessage {
  id: string
  sender: "user" | "ai"
  text: string
  time?: string
  showBreakdown?: boolean
  showCallout?: boolean
}

function RibbedAudioWaveOrb({ isListening = true, size = 155 }: { isListening?: boolean; size?: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none cursor-pointer group"
      style={{ width: size, height: size }}
    >
      {/* 1. Outward-radiating soundwave ripple rings when listening */}
      {isListening && (
        <>
          <motion.div
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: [1, 1.45], opacity: [0.65, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-[#0055FF]/45 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-[#7C3AED]/35 pointer-events-none"
          />
        </>
      )}

      {/* 2. Ambient Deep Royal Blue & Violet Glow Halo */}
      <motion.div
        animate={isListening ? {
          scale: [1, 1.25, 1],
          opacity: [0.55, 0.9, 0.55]
        } : {
          scale: 1,
          opacity: 0.35
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0055FF]/50 via-[#4F46E5]/45 to-[#9333EA]/35 blur-2xl pointer-events-none"
      />

      {/* 3. 3D Ribbed Wave Fluid Sound Orb (matching user reference images 2 & 3) */}
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        animate={isListening ? {
          scale: [1, 1.045, 0.985, 1],
          rotate: [0, 360]
        } : {
          scale: 1,
          rotate: 0
        }}
        transition={{
          scale: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 24, repeat: Infinity, ease: "linear" }
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-full h-full flex items-center justify-center select-none"
      >
        <img 
          src="/images/blue-ribbed-orb.png" 
          alt="Juspay Ribbed Royal Blue Audio Wave Orb"
          className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_22px_36px_rgba(0,85,255,0.45)] drop-shadow-[0_10px_20px_rgba(124,58,237,0.3)]"
        />

        {/* Soft specular sheen overlay for dynamic 3D depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  )
}

let chatMessageCounter = 100
function getNextMessageId() {
  chatMessageCounter += 1
  return `msg_${chatMessageCounter}`
}

export function AIAssistantScreen({ onOpenDrilldown }: AIAssistantScreenProps) {
  const [mode, setMode] = useState<AIMode>("chat")
  const [userQuery, setUserQuery] = useState("")
  const [isListening, setIsListening] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [spokenResponse, setSpokenResponse] = useState<string>("“Food delivery was up 24% in August. Cut 2 orders weekly to save ₹2,400 monthly.”")
  const [voiceSeconds, setVoiceSeconds] = useState(4)

  useEffect(() => {
    if (!isListening) return
    const timer = setInterval(() => {
      setVoiceSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isListening])

  const handleToggleListening = (forcedState?: boolean) => {
    const nextState = forcedState !== undefined ? forcedState : !isListening
    setIsListening(nextState)
    if (!nextState) {
      setVoiceSeconds(0)
    } else {
      handleSpeak("I am listening. Ask me anything about your finances.")
    }
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "Where is my money going this month?",
      time: "9:41 AM"
    },
    {
      id: "2",
      sender: "ai",
      text: "Here's your August breakdown",
      showBreakdown: true,
      showCallout: true
    }
  ])

  const breakdownData = [
    { label: "Food & Dining", pctText: "35%", amount: "₹18,400" },
    { label: "Rent & Housing", pctText: "29%", amount: "₹15,000" },
    { label: "Shopping & Tech", pctText: "16%", amount: "₹8,200" },
    { label: "Travel & Commute", pctText: "12%", amount: "₹6,450" },
    { label: "Subscriptions", pctText: "8%", amount: "₹4,350" }
  ]

  const quickPrompts = [
    "Why did food jump 24%?",
    "Check Tokyo trip savings",
    "How can I save ₹3,000?",
    "Find recurring subscriptions"
  ]

  const handleSpeak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.05
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleSend = (textToSend?: string) => {
    const query = textToSend || userQuery
    if (!query.trim()) return

    const userMsg: ChatMessage = {
      id: getNextMessageId(),
      sender: "user",
      text: query,
      time: "Just now"
    }

    setChatMessages(prev => [...prev, userMsg])
    setUserQuery("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const isFoodQuery = query.toLowerCase().includes("food") || query.toLowerCase().includes("spend") || query.toLowerCase().includes("august")
      const aiResponse = isFoodQuery
        ? `Analysis for "${query}": Food & Dining is your highest variable outflow at ₹18,400 (+24%). Delivery apps like Swiggy and Zomato make up 72% of it.`
        : `Analysis for "${query}": You have saved ₹12,450 this month towards your Tokyo trip goal (68% complete). Keep it up!`

      const aiMsg: ChatMessage = {
        id: getNextMessageId(),
        sender: "ai",
        text: aiResponse,
        showCallout: isFoodQuery
      }
      setChatMessages(prev => [...prev, aiMsg])
    }, 750)
  }

  const handleVoiceQuery = (question: string, answer: string) => {
    setSpokenResponse(`“${answer}”`)
    handleSpeak(answer)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 flex flex-col justify-between h-full select-none bg-[#F8F9FA] relative overflow-hidden"
    >
      {/* 1. Header with Segmented Control */}
      <motion.div variants={itemVariants} className="space-y-3 pb-2 border-b border-neutral-200/60">
        <div className="flex items-center justify-between">
          <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700 transition">
            <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
          </button>

          <div className="flex items-center gap-1.5 text-neutral-900">
            <JuspayLogoMark size={16} />
            <h1 className="text-sm font-semibold tracking-tight font-sans">Juspay AI</h1>
          </div>

          <button className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-700 transition">
            <MoreHorizontal className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        {/* Native Segmented Control: Chat vs Voice */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-neutral-200/60 text-xs font-medium max-w-[200px] mx-auto">
          <button
            onClick={() => setMode("chat")}
            className={cn(
              "py-1 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer",
              mode === "chat" 
                ? "bg-[#0055FF] text-white font-medium shadow-[0_2px_8px_rgba(0,85,255,0.25)]" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setMode("voice")}
            className={cn(
              "py-1 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer",
              mode === "voice" 
                ? "bg-[#0055FF] text-white font-medium shadow-[0_2px_8px_rgba(0,85,255,0.25)]" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <Mic className="w-3.5 h-3.5 stroke-[1.75]" />
            <span>Voice</span>
          </button>
        </div>
      </motion.div>

      {/* Mode 1: CHAT INTERFACE */}
      {mode === "chat" ? (
        <>
          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 py-1 pr-0.5 relative">
            {/* Ambient Juspay Blue Glow */}
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-[#0055FF]/10 via-[#0099FF]/5 to-transparent pointer-events-none rounded-3xl blur-xl" />

            {/* Header Greeting */}
            <motion.div variants={itemVariants} className="pt-2 pb-1 text-center space-y-1 relative z-10 select-none">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 leading-tight">
                Hello Alex,<br />
                <span className="text-neutral-500 font-normal text-base">How can I help you today?</span>
              </h2>
            </motion.div>

            {/* Quick Suggestion Chips */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 relative z-10">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-700 shadow-none hover:border-[#0055FF] hover:text-[#0055FF] transition shrink-0 cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </motion.div>

            {chatMessages.map((msg) => (
              <div key={msg.id} className="space-y-3 relative z-10">
                {msg.sender === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-[#0055FF] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-[0_4px_16px_rgba(0,85,255,0.22)] space-y-0.5">
                      <p className="text-xs font-normal leading-normal">{msg.text}</p>
                      {msg.time && (
                        <span className="text-[9px] font-mono text-blue-100/75 block text-right">{msg.time}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                        <JuspayLogoMark size={14} />
                        <span className="font-semibold text-neutral-800">Juspay AI</span>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900 tracking-tight">{msg.text}</p>

                      {/* Unbordered Financial Breakdown Table */}
                      {msg.showBreakdown && (
                        <motion.div 
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-2 pb-1 space-y-3"
                        >
                          <div className="flex items-baseline justify-between pt-1 border-t border-neutral-200/80">
                            <span className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Total Spent</span>
                            <span className="text-2xl font-bold font-sans text-neutral-900">₹52,400</span>
                          </div>

                          <div className="divide-y divide-neutral-100 text-xs">
                            {breakdownData.map((item) => (
                              <div key={item.label} className="py-2 flex items-center justify-between">
                                <span className="font-medium text-neutral-700">{item.label}</span>
                                <div className="flex items-center gap-4">
                                  <span className="font-mono text-neutral-400 text-[11px]">{item.pctText}</span>
                                  <span className="font-sans font-bold text-neutral-900 w-16 text-right">{item.amount}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Single Scannable Insight Callout Styled like Image 1 */}
                    {msg.showCallout && (
                      <motion.div 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onOpenDrilldown}
                        className="p-4 rounded-2xl bg-[#DDD6FE] text-neutral-900 border border-purple-300/60 shadow-[0_6px_20px_rgba(221,214,254,0.35)] flex items-center justify-between gap-3 cursor-pointer hover:border-purple-400 transition group select-none mt-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-neutral-900">Food & Dining</span>
                            <span className="text-xs font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full">↑ 24%</span>
                            <span className="text-xs text-neutral-700 font-semibold font-sans">
                              (+₹3,600)
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 font-medium">Mostly delivery via Swiggy & Zomato.</p>
                        </div>
                        
                        <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-all">
                          <ChevronRight className="w-4 h-4 stroke-[2]" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-neutral-200/80 w-24"
              >
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.4s]" />
              </motion.div>
            )}
          </div>

          {/* Input Bar */}
          <motion.div variants={itemVariants} className="pt-2">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-white border border-neutral-200/90 shadow-2xs focus-within:ring-2 focus-within:ring-[#0055FF]/20 focus-within:border-[#0055FF] transition"
            >
              <button 
                type="button"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#0055FF]/10 text-neutral-600 hover:text-[#0055FF] flex items-center justify-center shrink-0 transition cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2]" />
              </button>

              <input
                type="text"
                placeholder="Ask anything about your money..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs font-medium text-neutral-900 placeholder:text-neutral-400 outline-none px-1"
              />

              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full bg-[#0055FF] hover:bg-[#0048E6] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(0,85,255,0.3)] shrink-0 cursor-pointer transition"
              >
                <Send className="w-3.5 h-3.5 stroke-[1.75]" />
              </motion.button>
            </form>
          </motion.div>
        </>
      ) : (
        /* Mode 2: TASTEFUL VOICE INTERFACE WITH IRIDESCENT GLASS ORB */
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-between py-2 px-1 text-center select-none relative"
        >
          {/* Ambient aurora glow background */}
          <div className="absolute inset-x-0 bottom-8 h-60 bg-gradient-to-t from-[#0055FF]/12 via-[#0099FF]/4 to-transparent pointer-events-none rounded-3xl blur-2xl" />

          {/* 1. Header Status Pill */}
          <div className="pt-0.5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-200/60 shadow-2xs">
              <span className="relative flex h-1.5 w-1.5">
                {isListening && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0055FF] opacity-75" />
                )}
                <span className={cn(
                  "relative inline-flex rounded-full h-1.5 w-1.5 transition-colors",
                  isListening ? "bg-[#0055FF]" : "bg-neutral-400"
                )} />
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-neutral-700">
                {isListening ? "Listening to your voice..." : "Voice paused"}
              </span>
            </div>
          </div>

          {/* 2. Central Ribbed Royal Blue Sound Orb */}
          <div 
            className="my-auto flex flex-col items-center relative z-10 cursor-pointer py-1" 
            onClick={() => handleToggleListening()}
          >
            <RibbedAudioWaveOrb isListening={isListening} size={135} />
          </div>

          {/* 3. Spoken Insight Card */}
          <motion.div 
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-[310px] mx-auto px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-neutral-200/70 shadow-xs mb-2 space-y-1"
          >
            <p className="text-xs font-semibold text-neutral-800 leading-relaxed">
              {spokenResponse}
            </p>
            <span className="text-[10px] text-neutral-400 font-medium block">
              {isListening ? "Ask follow-ups or tap a suggestion" : "Tap orb or start voice to speak"}
            </span>
          </motion.div>

          {/* 4. Interactive Voice Suggestion Pills - Perfectly Centered Single Line */}
          <div className="w-full relative z-10 mb-3 px-2">
            <div className="flex items-center justify-center gap-1.5 max-w-full">
              {[
                { q: "Why food jumped?", a: "Food delivery is up 24% this month, mostly due to 18 delivery orders." },
                { q: "Tokyo Trip progress", a: "You have saved ₹68,000 of ₹1,00,000, which is 68% of your goal." },
                { q: "Save ₹3,000?", a: "Yes, reducing dining out by two orders per week will save ₹2,400 monthly." }
              ].map((item) => (
                <button
                  key={item.q}
                  onClick={() => handleVoiceQuery(item.q, item.a)}
                  className="shrink-0 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-[10.5px] font-medium text-neutral-700 shadow-2xs hover:border-[#0055FF] hover:text-[#0055FF] transition cursor-pointer"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Waveform & Voice Control Bar */}
          <div className="space-y-2 flex flex-col items-center relative z-10 pb-1 w-full">
            {/* Premium Apple / Voice AI Waveform Capsule Track */}
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-2xs max-w-[280px] w-full"
              >
                {/* Status Indicator */}
                <div className="flex items-center gap-1.5 shrink-0 pl-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0055FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0055FF]" />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">
                    LIVE
                  </span>
                </div>

                <div className="w-[1px] h-3 bg-neutral-200 shrink-0" />

                {/* Multi-Frequency Audio Waveform Equalizer */}
                <div className="flex items-center justify-center gap-[2.5px] h-5 flex-1 px-1 overflow-hidden">
                  {[
                    { min: 3, max: 12, delay: 0.04 },
                    { min: 5, max: 16, delay: 0.12 },
                    { min: 3, max: 13, delay: 0.22 },
                    { min: 6, max: 20, delay: 0.08 },
                    { min: 8, max: 22, delay: 0.18 },
                    { min: 5, max: 17, delay: 0.28 },
                    { min: 9, max: 22, delay: 0.05 },
                    { min: 11, max: 24, delay: 0.15 },
                    { min: 9, max: 20, delay: 0.25 },
                    { min: 11, max: 24, delay: 0.09 },
                    { min: 8, max: 22, delay: 0.19 },
                    { min: 9, max: 20, delay: 0.29 },
                    { min: 6, max: 18, delay: 0.07 },
                    { min: 8, max: 17, delay: 0.17 },
                    { min: 5, max: 14, delay: 0.27 },
                    { min: 3, max: 11, delay: 0.13 },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        height: [bar.min, bar.max, bar.min * 1.4, bar.max * 0.8, bar.min] 
                      }}
                      transition={{ 
                        duration: 0.85, 
                        repeat: Infinity, 
                        delay: bar.delay, 
                        ease: "easeInOut" 
                      }}
                      className="w-[2.5px] rounded-full bg-gradient-to-t from-[#0055FF] to-[#38BDF8]"
                    />
                  ))}
                </div>

                <div className="w-[1px] h-3 bg-neutral-200 shrink-0" />

                {/* Live Audio Elapsed Duration */}
                <div className="shrink-0 pr-0.5">
                  <span className="text-[11px] font-mono font-bold text-neutral-700">
                    {Math.floor(voiceSeconds / 60).toString().padStart(2, "0")}:{(voiceSeconds % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggleListening()}
              className={cn(
                "w-full max-w-[250px] py-2.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer text-sm font-semibold tracking-wide shadow-md",
                isListening 
                  ? "bg-[#0055FF] hover:bg-[#0048E6] text-white shadow-[0_6px_20px_rgba(0,85,255,0.3)] active:bg-[#003ECC]" 
                  : "bg-neutral-900 hover:bg-neutral-800 text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] active:bg-black"
              )}
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 text-white animate-pulse" />
                  <span>Stop Listening</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 text-white/80" />
                  <span>Start Voice</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
