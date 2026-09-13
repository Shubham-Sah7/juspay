"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, 
  MoreHorizontal, 
  Send, 
  Plus, 
  Mic, 
  MicOff, 
  ArrowRight,
  MessageSquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"

interface AIAssistantScreenProps {
  onOpenDrilldown: () => void
  onBack?: () => void
}

type AIMode = "chat" | "voice"

interface CategoryBreakdown {
  id: string
  label: string
  pct: number
  amount: string
  color: string
}

const DEFAULT_BREAKDOWN: CategoryBreakdown[] = [
  { id: "food", label: "Food", pct: 35, amount: "₹18,400", color: "#F95738" },
  { id: "rent", label: "Rent", pct: 29, amount: "₹15,000", color: "#2563EB" },
  { id: "shopping", label: "Shopping", pct: 16, amount: "₹8,200", color: "#A3E635" },
  { id: "other", label: "Other", pct: 20, amount: "₹10,800", color: "#FBBF24" }
]

// Interactive Donut Chart for inside the AI card
function InteractiveDonutChart({
  breakdown,
  activeId,
  onSelect
}: {
  breakdown: CategoryBreakdown[]
  activeId: string | null
  onSelect: (id: string | null) => void
}) {
  const size = 140
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2 - 4
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const activeCategory = breakdown.find(b => b.id === activeId)

  const segmentsWithOffset = breakdown.map((item, index) => {
    const prevSum = breakdown.slice(0, index).reduce((acc, curr) => acc + curr.pct, 0)
    const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`
    const strokeDashoffset = -((prevSum / 100) * circumference)
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset
    }
  })

  return (
    <div className="flex flex-col items-center my-2">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`} 
          className="transform -rotate-90 overflow-visible"
        >
          {segmentsWithOffset.map((item) => {
            const isSelected = activeId === item.id

            return (
              <circle
                key={item.id}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={isSelected ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => onSelect(item.id)}
                onMouseLeave={() => onSelect(null)}
                onClick={() => onSelect(activeId === item.id ? null : item.id)}
                style={{
                  filter: isSelected ? `drop-shadow(0 0 6px ${item.color}80)` : undefined,
                  opacity: activeId && !isSelected ? 0.45 : 1
                }}
              />
            )
          })}
        </svg>

        {/* Center label & value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
          <AnimatePresence mode="wait">
            {activeCategory ? (
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                  {activeCategory.label}
                </span>
                <span className="text-base font-black text-neutral-900 tracking-tight font-sans">
                  {activeCategory.amount}
                </span>
                <span className="text-[10px] font-bold text-neutral-500 block font-mono">
                  {activeCategory.pct}%
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="total"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Total
                </span>
                <span className="text-base font-black text-neutral-900 tracking-tight font-sans">
                  ₹52,400
                </span>
                <span className="text-[9px] font-medium text-emerald-600 block">
                  August
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function RibbedAudioWaveOrb({ isListening = true, size = 150 }: { isListening?: boolean; size?: number }) {
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
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  )
}

interface ExtraChatTurn {
  id: string
  userText: string
  aiText: string
  actionPills?: string[]
}

export function AIAssistantScreen({ onOpenDrilldown, onBack }: AIAssistantScreenProps) {
  const [mode, setMode] = useState<AIMode>("chat")
  const [userQuery, setUserQuery] = useState("")
  const [activeChartCat, setActiveChartCat] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [voiceSeconds, setVoiceSeconds] = useState(4)
  const [spokenResponse, setSpokenResponse] = useState<string>(
    "“Food delivery was up 31% in August. Cut 2 orders weekly to save ₹2,400 monthly.”"
  )
  const [extraTurns, setExtraTurns] = useState<ExtraChatTurn[]>([])

  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isListening) return
    const timer = setInterval(() => {
      setVoiceSeconds(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [isListening])

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleChipClick = (chip: string) => {
    if (chip === "Last 3 months") {
      setExtraTurns(prev => [
        ...prev,
        {
          id: `turn_${Date.now()}`,
          userText: "Last 3 months",
          aiText: "Food spending trend: June ₹12,500 → July ₹14,800 → August ₹18,400 (+47% across 3 months). Order count grew from 10 to 24 orders.",
          actionPills: ["Delivery", "Ways to save"]
        }
      ])
    } else if (chip === "Delivery") {
      setExtraTurns(prev => [
        ...prev,
        {
          id: `turn_${Date.now()}`,
          userText: "Delivery",
          aiText: "Swiggy was ₹7,850 (14 orders), and Zomato was ₹5,400 (10 orders). Delivery accounts for 72% of your entire food budget.",
          actionPills: ["Ways to save", "Set delivery cap"]
        }
      ])
    } else if (chip === "Ways to save") {
      setExtraTurns(prev => [
        ...prev,
        {
          id: `turn_${Date.now()}`,
          userText: "Ways to save",
          aiText: "💡 Top 2 strategies: 1) Cook dinner on 2 weekend nights (saves ~₹1,800/mo). 2) Cap delivery at 3 orders/week (saves ~₹3,200/mo).",
          actionPills: ["Cap alert at 2/wk", "See food breakdown →"]
        }
      ])
    } else if (chip === "See food breakdown →") {
      onOpenDrilldown()
      return
    } else {
      handleSend(chip)
      return
    }
    setTimeout(scrollToBottom, 100)
  }

  const handleSend = (textToSend?: string) => {
    const query = textToSend || userQuery
    if (!query.trim()) return

    setUserQuery("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const qLower = query.toLowerCase()
      let aiText = "You have saved ₹12,450 this month towards your Tokyo trip goal (68% complete). Keep it up!"
      let pills: string[] = ["Check Tokyo goal", "Ways to save"]

      if (qLower.includes("food") || qLower.includes("zomato") || qLower.includes("swiggy")) {
        aiText = "Food & Dining jumped +31% mainly via online delivery apps. Cutting 2 orders/week will save you ₹2,400 every month."
        pills = ["Last 3 months", "Delivery", "Ways to save"]
      } else if (qLower.includes("rent") || qLower.includes("housing")) {
        aiText = "Rent is fixed at ₹15,000 paid on the 1st of every month. It accounts for 29% of your total budget."
        pills = ["Utilities", "Ways to save"]
      } else if (qLower.includes("save") || qLower.includes("budget")) {
        aiText = "Your potential savings this month is ₹4,200 by trimming 3 delivery orders and 1 unused subscription."
        pills = ["Ways to save", "Tokyo Trip"]
      }

      setExtraTurns(prev => [
        ...prev,
        {
          id: `turn_${Date.now()}`,
          userText: query,
          aiText,
          actionPills: pills
        }
      ])
      setTimeout(scrollToBottom, 100)
    }, 600)
  }

  const handleToggleListening = (forcedState?: boolean) => {
    const nextState = forcedState !== undefined ? forcedState : !isListening
    setIsListening(nextState)
    if (!nextState) {
      setVoiceSeconds(0)
    }
  }

  return (
    <div className="p-4 flex flex-col justify-between h-full select-none bg-[#F9FAFB] relative overflow-hidden font-sans">
      {/* Top Header: Back Arrow, Juspay AI, Three Dots */}
      <div className="space-y-3 pb-2.5">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full hover:bg-neutral-200/60 text-neutral-800 transition cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-1.5 text-neutral-950">
            <JuspayLogoMark size={18} />
            <h1 className="text-base font-bold tracking-tight">Juspay AI</h1>
          </div>

          <button className="p-1.5 -mr-1 rounded-full hover:bg-neutral-200/60 text-neutral-700 transition cursor-pointer">
            <MoreHorizontal className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Segmented Control: Chat vs Voice */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-neutral-200/70 text-xs font-semibold max-w-[210px] mx-auto">
          <button
            onClick={() => setMode("chat")}
            className={cn(
              "py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer",
              mode === "chat" 
                ? "bg-white text-neutral-950 font-bold shadow-xs" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 stroke-[2]" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => setMode("voice")}
            className={cn(
              "py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1.5 cursor-pointer",
              mode === "voice" 
                ? "bg-white text-neutral-950 font-bold shadow-xs" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <Mic className="w-3.5 h-3.5 stroke-[2]" />
            <span>Voice</span>
          </button>
        </div>
      </div>

      {/* Subtle Horizontal Divider matching wireframe */}
      <div className="border-b border-neutral-200/80 -mx-4 mb-2" />

      {/* Mode 1: CHAT INTERFACE */}
      {mode === "chat" ? (
        <>
          {/* Chat Message Thread */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-5 py-1 px-1 relative">
            {/* Conversation Item 1: User */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-400 block tracking-tight">You</span>
              <div className="p-3.5 rounded-2xl rounded-tl-xs bg-neutral-100 border border-neutral-200/60 text-neutral-900 text-sm font-medium leading-snug w-fit max-w-[90%]">
                Where is my money going this month?
              </div>
            </div>

            {/* Conversation Item 2: Juspay AI */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <JuspayLogoMark size={14} />
                <span className="text-xs font-bold text-neutral-900 tracking-tight">Juspay AI</span>
              </div>

              {/* Text Paragraph 1 */}
              <div className="text-sm text-neutral-800 space-y-1 leading-relaxed">
                <p>
                  You spent <strong className="font-bold text-neutral-950">₹52,400</strong> in August.
                </p>
                <p className="text-neutral-600">
                  Most of it went to Food &amp; Dining, Rent, and Shopping.
                </p>
              </div>

              {/* Embedded Interactive Chart Card */}
              <motion.div 
                whileHover={{ y: -1 }}
                className="w-full rounded-2xl bg-white border border-neutral-200/90 p-4 shadow-sm space-y-2"
              >
                {/* Total Top Amount */}
                <div className="text-center pt-1">
                  <div className="text-2xl font-black tracking-tight text-neutral-950 font-sans">
                    ₹52,400
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block mt-0.5">
                    Total August Spending
                  </span>
                </div>

                {/* Interactive Chart */}
                <InteractiveDonutChart 
                  breakdown={DEFAULT_BREAKDOWN} 
                  activeId={activeChartCat} 
                  onSelect={setActiveChartCat} 
                />

                {/* Breakdown Rows */}
                <div className="divide-y divide-neutral-100 text-xs pt-1">
                  {DEFAULT_BREAKDOWN.slice(0, 3).map((item) => (
                    <div 
                      key={item.id}
                      onMouseEnter={() => setActiveChartCat(item.id)}
                      onMouseLeave={() => setActiveChartCat(null)}
                      onClick={() => setActiveChartCat(activeChartCat === item.id ? null : item.id)}
                      className={cn(
                        "py-2 px-1 flex items-center justify-between rounded-lg transition cursor-pointer",
                        activeChartCat === item.id ? "bg-neutral-50" : "hover:bg-neutral-50/70"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }} 
                        />
                        <span className="font-semibold text-neutral-800">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-neutral-400 text-[11px] font-medium w-8 text-right">
                          {item.pct}%
                        </span>
                        <span className="font-sans font-bold text-neutral-950 w-16 text-right">
                          {item.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Text Paragraph 2 */}
              <div className="text-sm text-neutral-800 space-y-1 leading-relaxed pt-1">
                <p className="font-medium">
                  <strong className="text-neutral-950 font-bold">Food &amp; Dining</strong> is the one to watch.
                </p>
                <p className="text-neutral-600">
                  You spent <strong className="text-neutral-900 font-semibold">₹3,600 more</strong> than last month, mostly on delivery.
                </p>
              </div>

              {/* Action Button: [ See food breakdown → ] */}
              <div className="pt-1">
                <button
                  onClick={onOpenDrilldown}
                  className="px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold shadow-xs hover:shadow transition flex items-center gap-2 cursor-pointer group"
                >
                  <span>See food breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Conversation Item 3: User */}
            <div className="space-y-1 pt-2">
              <span className="text-xs font-bold text-neutral-400 block tracking-tight">You</span>
              <div className="p-3.5 rounded-2xl rounded-tl-xs bg-neutral-100 border border-neutral-200/60 text-neutral-900 text-sm font-medium leading-snug w-fit max-w-[90%]">
                Why did food jump?
              </div>
            </div>

            {/* Conversation Item 4: Juspay AI */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <JuspayLogoMark size={14} />
                <span className="text-xs font-bold text-neutral-900 tracking-tight">Juspay AI</span>
              </div>

              <p className="text-sm text-neutral-800 leading-relaxed">
                Mostly delivery. Your <strong className="font-bold text-neutral-950">Swiggy + Zomato</strong> spending increased <strong className="text-rose-600 font-bold">31%</strong>.
              </p>

              {/* Action Suggestion Pills */}
              <div className="flex items-center flex-wrap gap-2 pt-1">
                {["Last 3 months", "Delivery", "Ways to save"].map((pill) => (
                  <button
                    key={pill}
                    onClick={() => handleChipClick(pill)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 hover:border-[#0055FF] text-xs font-semibold text-neutral-700 hover:text-[#0055FF] shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamically Added Turns */}
            {extraTurns.map((turn) => (
              <div key={turn.id} className="space-y-4 pt-1">
                {/* User Turn */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-400 block tracking-tight">You</span>
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-neutral-100 border border-neutral-200/60 text-neutral-900 text-sm font-medium leading-snug w-fit max-w-[90%]">
                    {turn.userText}
                  </div>
                </div>

                {/* AI Turn */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <JuspayLogoMark size={14} />
                    <span className="text-xs font-bold text-neutral-900 tracking-tight">Juspay AI</span>
                  </div>

                  <p className="text-sm text-neutral-800 leading-relaxed">
                    {turn.aiText}
                  </p>

                  {turn.actionPills && turn.actionPills.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 pt-1">
                      {turn.actionPills.map((pill) => (
                        <button
                          key={pill}
                          onClick={() => handleChipClick(pill)}
                          className="px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 hover:border-[#0055FF] text-xs font-semibold text-neutral-700 hover:text-[#0055FF] shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* AI Typing Animation */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-neutral-200/80 w-24">
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Divider & Input Bar */}
          <div className="border-t border-neutral-200/80 -mx-4 px-4 pt-2.5 pb-1">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs focus-within:ring-2 focus-within:ring-[#0055FF]/20 focus-within:border-[#0055FF] transition"
            >
              {/* Plus Button */}
              <button 
                type="button"
                onClick={() => setUserQuery("How can I save ₹2,000 this week?")}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#0055FF]/10 text-neutral-600 hover:text-[#0055FF] flex items-center justify-center shrink-0 transition cursor-pointer"
                title="Add prompt"
              >
                <Plus className="w-4 h-4 stroke-[2.2]" />
              </button>

              <input
                type="text"
                placeholder="Ask anything about your money…"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs font-medium text-neutral-900 placeholder:text-neutral-400 outline-none px-1"
              />

              {/* Right Button: Mic when empty, Send when typed */}
              {userQuery.trim() ? (
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-[#0055FF] hover:bg-[#0048E6] text-white flex items-center justify-center shadow-sm shrink-0 cursor-pointer transition"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2]" />
                </motion.button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("voice")}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 text-neutral-600 hover:text-[#0055FF] flex items-center justify-center shrink-0 transition cursor-pointer"
                  title="Voice Mode"
                >
                  <Mic className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        /* Mode 2: VOICE INTERFACE WITH 3D ORB */
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-between py-2 px-1 text-center select-none relative"
        >
          {/* Ambient aurora glow background */}
          <div className="absolute inset-x-0 bottom-8 h-60 bg-gradient-to-t from-[#0055FF]/12 via-[#0099FF]/4 to-transparent pointer-events-none rounded-3xl blur-2xl" />

          {/* Status Pill */}
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

          {/* Central Ribbed Royal Blue Sound Orb */}
          <div 
            className="my-auto flex flex-col items-center relative z-10 cursor-pointer py-1" 
            onClick={() => handleToggleListening()}
          >
            <RibbedAudioWaveOrb isListening={isListening} size={140} />
          </div>

          {/* Spoken Response Card */}
          <motion.div 
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-[310px] mx-auto px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/70 shadow-xs mb-2 space-y-1"
          >
            <p className="text-xs font-semibold text-neutral-800 leading-relaxed">
              {spokenResponse}
            </p>
            <span className="text-[10px] text-neutral-400 font-medium block">
              {isListening ? "Ask follow-ups or tap a suggestion" : "Tap orb or start voice to speak"}
            </span>
          </motion.div>

          {/* Interactive Voice Suggestion Pills */}
          <div className="w-full relative z-10 mb-3 px-2">
            <div className="flex items-center justify-center gap-1.5 max-w-full">
              {[
                { q: "Why food jumped?", a: "Food delivery is up 31% this month, mostly due to 24 orders on Swiggy and Zomato." },
                { q: "Tokyo Trip progress", a: "You have saved ₹68,000 of ₹1,00,000, which is 68% of your goal." },
                { q: "Ways to save?", a: "Yes, reducing delivery by two orders per week will save ₹2,400 monthly." }
              ].map((item) => (
                <button
                  key={item.q}
                  onClick={() => {
                    setSpokenResponse(`“${item.a}”`)
                  }}
                  className="shrink-0 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 text-[10.5px] font-medium text-neutral-700 shadow-2xs hover:border-[#0055FF] hover:text-[#0055FF] transition cursor-pointer"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>

          {/* Waveform & Voice Control Bar */}
          <div className="space-y-2 flex flex-col items-center relative z-10 pb-1 w-full">
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-2xs max-w-[280px] w-full"
              >
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
    </div>
  )
}
