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
  MessageSquare,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  UtensilsCrossed,
  Home,
  ShoppingBag,
  Car,
  Tv
} from "lucide-react"
import { cn } from "@/lib/utils"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"

interface AIAssistantScreenProps {
  onOpenDrilldown: () => void
  onBack?: () => void
  initialMode?: "chat" | "voice"
}

type AIMode = "chat" | "voice"

interface CategoryItem {
  id: string
  name: string
  pct: number
  amount: string
  color: string
  detail: string
  icon: React.ComponentType<{ className?: string }>
  iconBg: string
  iconColor: string
}

const CATEGORIES: CategoryItem[] = [
  { 
    id: "food", 
    name: "Food & Dining", 
    pct: 35, 
    amount: "₹18,400", 
    color: "#F95738", 
    detail: "14 delivery orders · Swiggy & Zomato",
    icon: UtensilsCrossed,
    iconBg: "bg-rose-50 border-rose-200/80",
    iconColor: "text-[#F95738]"
  },
  { 
    id: "rent", 
    name: "Rent & Housing", 
    pct: 29, 
    amount: "₹15,000", 
    color: "#2563EB", 
    detail: "Fixed monthly rent · Paid on 1st",
    icon: Home,
    iconBg: "bg-blue-50 border-blue-200/80",
    iconColor: "text-[#2563EB]"
  },
  { 
    id: "shopping", 
    name: "Shopping & Tech", 
    pct: 16, 
    amount: "₹8,200", 
    color: "#0284C7", 
    detail: "Amazon & gadgets · 8 items",
    icon: ShoppingBag,
    iconBg: "bg-sky-50 border-sky-200/80",
    iconColor: "text-[#0284C7]"
  },
  { 
    id: "travel", 
    name: "Travel & Commute", 
    pct: 12, 
    amount: "₹6,450", 
    color: "#8B5CF6", 
    detail: "Uber & Metro transit · 14 rides",
    icon: Car,
    iconBg: "bg-purple-50 border-purple-200/80",
    iconColor: "text-[#8B5CF6]"
  },
  { 
    id: "subscriptions", 
    name: "Subscriptions", 
    pct: 8, 
    amount: "₹4,350", 
    color: "#F59E0B", 
    detail: "Spotify, Netflix, iCloud · 5 active",
    icon: Tv,
    iconBg: "bg-amber-50 border-amber-200/80",
    iconColor: "text-[#F59E0B]"
  }
]

// 3D Ribbed Audio Wave Orb for Voice Mode
function RibbedAudioWaveOrb({ isListening = true, size = 100 }: { isListening?: boolean; size?: number }) {
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
          className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_16px_28px_rgba(0,85,255,0.4)] drop-shadow-[0_8px_16px_rgba(124,58,237,0.25)]"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none mix-blend-overlay" />
      </motion.div>
    </div>
  )
}

interface ExtraTurn {
  id: string
  userText: string
  aiText: string
  actionButtons?: { label: string; action: () => void }[]
}

export function AIAssistantScreen({ onOpenDrilldown, onBack, initialMode = "chat" }: AIAssistantScreenProps) {
  const [mode, setMode] = useState<AIMode>(initialMode)
  const [userQuery, setUserQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>("food")
  const [isListening, setIsListening] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [hasSavedPlan, setHasSavedPlan] = useState(false)
  const [spokenResponse, setSpokenResponse] = useState<string>(
    "“Food delivery was up 24% in August. Cutting 2 orders weekly could save ₹2,400/month.”"
  )
  const [extraTurns, setExtraTurns] = useState<ExtraTurn[]>([])

  const chatBottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleTrySaving = () => {
    setHasSavedPlan(true)
    const newTurn: ExtraTurn = {
      id: `turn_${Date.now()}`,
      userText: "Try saving ₹2,400",
      aiText: "Savings plan activated! I've set an alert cap for 2 delivery orders per week. When you stay under, your saved ₹2,400 will auto-route to your Tokyo Trip Fund.",
      actionButtons: [
        { label: "View Tokyo Trip Piggy", action: () => onBack?.() }
      ]
    }
    setExtraTurns(prev => [...prev, newTurn])
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
      let aiText = "You've saved ₹12,450 this month towards your Tokyo Trip goal (68% completed). Keep this pace to reach ₹1,00,000 by November."
      let buttons: { label: string; action: () => void }[] | undefined = [
        { label: "See delivery spending", action: onOpenDrilldown }
      ]

      if (qLower.includes("food") || qLower.includes("swiggy") || qLower.includes("zomato")) {
        aiText = "Food delivery made up 14 of your 24 total food transactions this month, totaling ₹7,850. Capping deliveries at 2/week is the fastest way to trim ₹2,400."
        buttons = [
          { label: "See delivery spending", action: onOpenDrilldown },
          { label: "Try saving ₹2,400", action: handleTrySaving }
        ]
      } else if (qLower.includes("save") || qLower.includes("budget") || qLower.includes("cut")) {
        aiText = "Based on your spending patterns, your top 2 savings opportunities are: 1) Cutting 2 delivery orders/week (₹2,400/mo), and 2) Pausing 1 unused gym subscription (₹950/mo)."
        buttons = [
          { label: "Try saving ₹2,400", action: handleTrySaving }
        ]
      } else if (qLower.includes("rent") || qLower.includes("fixed")) {
        aiText = "Rent & Housing was ₹15,000 (29% of total), paid on August 1st. Utilities added ₹2,500."
        buttons = undefined
      }

      setExtraTurns(prev => [
        ...prev,
        {
          id: `turn_${Date.now()}`,
          userText: query,
          aiText,
          actionButtons: buttons
        }
      ])
      setTimeout(scrollToBottom, 100)
    }, 600)
  }

  const handleToggleListening = (forcedState?: boolean) => {
    const nextState = forcedState !== undefined ? forcedState : !isListening
    setIsListening(nextState)
  }

  return (
    <div className="p-4 flex flex-col justify-between h-full select-none bg-[#FAFAFA] relative overflow-hidden font-sans">
      {/* 1. TOP HEADER: Back Arrow, Juspay AI, Three Dots & Chat/Voice Switcher */}
      <div className="space-y-2.5 pb-2">
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
            <h1 className="text-sm font-bold tracking-tight">Juspay AI</h1>
          </div>

          <button className="p-1.5 -mr-1 rounded-full hover:bg-neutral-200/60 text-neutral-700 transition cursor-pointer">
            <MoreHorizontal className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Premium Animated Chat / Voice Capsule Toggle */}
        <div className="relative flex items-center p-1 rounded-full bg-neutral-200/80 border border-neutral-300/60 max-w-[200px] mx-auto select-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
          {/* Animated Sliding White Capsule Indicator */}
          {mode === "chat" && (
            <motion.div
              layoutId="activeModeSlider"
              className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-black/5"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}
          {mode === "voice" && (
            <motion.div
              layoutId="activeModeSlider"
              className="absolute inset-y-1 right-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] border border-black/5"
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
            />
          )}

          <button
            type="button"
            onClick={() => setMode("chat")}
            className={cn(
              "relative z-10 flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              mode === "chat" 
                ? "text-neutral-950 font-bold" 
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            <MessageSquare className={cn("w-3.5 h-3.5 transition-colors stroke-[2.2]", mode === "chat" ? "text-[#0055FF]" : "text-neutral-400")} />
            <span>Chat</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("voice")}
            className={cn(
              "relative z-10 flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none",
              mode === "voice" 
                ? "text-neutral-950 font-bold" 
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            <Mic className={cn("w-3.5 h-3.5 transition-colors stroke-[2.2]", mode === "voice" ? "text-[#0055FF]" : "text-neutral-400")} />
            <span>Voice</span>
            {mode === "voice" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="border-b border-neutral-200/80 -mx-4 mb-2" />

      {/* Mode 1: CONVERSATIONAL AI THREAD */}
      {mode === "chat" ? (
        <>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 py-1 px-1 relative">
            
            {/* ================================================================= */}
            {/* TURN 1: USER → AI (Where is my money going this month?)           */}
            {/* ================================================================= */}
            
            {/* USER 1 */}
            <div className="flex flex-col items-end space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">You</span>
              <div className="px-4 py-2.5 rounded-2xl rounded-tr-xs bg-[#0055FF] text-white text-sm font-medium leading-snug shadow-xs max-w-[85%]">
                Where is my money going this month?
              </div>
            </div>

            {/* AI 1 */}
            <div className="space-y-2.5 max-w-[95%]">
              <div className="flex items-center gap-2">
                <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-[#0055FF] to-[#38BDF8] flex items-center justify-center text-white shadow-xs ring-2 ring-blue-100/90 shrink-0">
                  <JuspayLogoMark size={12} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-950 tracking-tight">Juspay AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0055FF] border border-blue-200/70">
                    Insight
                  </span>
                </div>
              </div>

              {/* Conversational Text */}
              <div className="text-sm text-neutral-800 leading-relaxed font-normal">
                You spent <strong className="font-bold text-neutral-950">₹52,400</strong> in August. Food &amp; Dining is your biggest category at <strong className="font-bold text-neutral-950">₹18,400</strong>, and it’s also the one growing fastest.
              </div>

              {/* COMPACT INTERACTIVE SPENDING VISUALIZATION INSIDE RESPONSE */}
              <div className="rounded-2xl bg-white border border-neutral-200/90 p-3.5 shadow-2xs space-y-3">
                {/* Multi-segment horizontal stacked track */}
                <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-neutral-100 p-0.5 gap-0.5">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      style={{ 
                        width: `${cat.pct}%`, 
                        backgroundColor: cat.color,
                        opacity: activeCategory && activeCategory !== cat.id ? 0.35 : 1
                      }}
                      className="h-full rounded-full transition-all cursor-pointer hover:scale-y-110"
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                      title={`${cat.name}: ${cat.pct}% (${cat.amount})`}
                    />
                  ))}
                </div>

                {/* 5-Category Clean Scannable List with Vector Icons */}
                <div className="divide-y divide-neutral-100 text-xs">
                  {CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat.id
                    const CatIcon = cat.icon
                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        onClick={() => setActiveCategory(isSelected ? null : cat.id)}
                        className={cn(
                          "py-2 px-2 flex items-center justify-between rounded-xl transition cursor-pointer group",
                          isSelected ? "bg-blue-50/70 ring-1 ring-blue-200/80" : "hover:bg-neutral-50"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 shadow-2xs",
                            cat.iconBg
                          )}>
                            <CatIcon className={cn("w-3.5 h-3.5 stroke-[2.2]", cat.iconColor)} />
                          </div>
                          <span className={cn(
                            "font-medium truncate",
                            isSelected ? "text-neutral-950 font-bold" : "text-neutral-800"
                          )}>
                            {cat.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span className="text-neutral-400 text-[11px] font-semibold font-mono w-8 text-right">
                            {cat.pct}%
                          </span>
                          <span className="text-neutral-950 font-black font-sans text-xs w-16 text-right">
                            {cat.amount}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Micro Detail Strip for selected category */}
                {activeCategory && (
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600 font-medium px-1">
                    <span className="truncate mr-2">{CATEGORIES.find(c => c.id === activeCategory)?.detail}</span>
                    <span className="text-[#0055FF] font-bold shrink-0 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/70 shadow-2xs">
                      Active
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ================================================================= */}
            {/* TURN 2: USER → AI (Why did food jump?)                            */}
            {/* ================================================================= */}
            
            {/* USER 2 */}
            <div className="flex flex-col items-end space-y-1 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">You</span>
              <div className="px-4 py-2.5 rounded-2xl rounded-tr-xs bg-[#0055FF] text-white text-sm font-medium leading-snug shadow-xs max-w-[85%]">
                Why did food jump?
              </div>
            </div>

            {/* AI 2 */}
            <div className="space-y-2.5 max-w-[95%]">
              <div className="flex items-center gap-2">
                <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-[#0055FF] to-[#38BDF8] flex items-center justify-center text-white shadow-xs ring-2 ring-blue-100/90 shrink-0">
                  <JuspayLogoMark size={12} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-950 tracking-tight">Juspay AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-50 text-rose-600 border border-rose-200/70">
                    Alert
                  </span>
                </div>
              </div>

              {/* Conversational Text */}
              <div className="text-sm text-neutral-800 leading-relaxed font-normal">
                Food spending is up <strong className="text-rose-600 font-bold">24% (+₹3,600)</strong>, mostly from Swiggy and Zomato. You made <strong className="text-neutral-950 font-bold">14 delivery orders</strong> this month, compared with 9 last month.
              </div>

              {/* COMPACT VISUAL COMPARISON (JULY VS AUGUST) */}
              <div className="rounded-2xl bg-white border border-neutral-200/90 p-3.5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-rose-50 border border-rose-200/80 flex items-center justify-center text-[#F95738] shrink-0 shadow-2xs">
                      <UtensilsCrossed className="w-3 h-3 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      Food Spending Comparison
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <TrendingUp className="w-2.5 h-2.5 stroke-[2.5]" /> +24% Jump
                  </span>
                </div>

                {/* Comparative Horizontal Bars */}
                <div className="space-y-2.5 pt-0.5 text-xs">
                  {/* July Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600">
                      <span>July</span>
                      <span className="font-bold text-neutral-800 font-sans">₹14,800</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden p-0.5">
                      <div className="h-full bg-neutral-300 rounded-full" style={{ width: "80%" }} />
                    </div>
                  </div>

                  {/* August Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium text-neutral-900">
                      <span className="font-bold">August</span>
                      <span className="font-bold text-rose-600 font-sans">₹18,400</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-rose-50 overflow-hidden p-0.5 border border-rose-200/60">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-[#F95738] rounded-full shadow-xs" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>

                <div className="pt-1.5 text-[11px] text-neutral-500 font-medium flex items-center gap-1.5 border-t border-neutral-100">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>+5 extra delivery orders contributed to 82% of this jump.</span>
                </div>
              </div>
            </div>

            {/* ================================================================= */}
            {/* TURN 3: USER → AI (How much did I spend on delivery?)              */}
            {/* ================================================================= */}
            
            {/* USER 3 */}
            <div className="flex flex-col items-end space-y-1 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">You</span>
              <div className="px-4 py-2.5 rounded-2xl rounded-tr-xs bg-[#0055FF] text-white text-sm font-medium leading-snug shadow-xs max-w-[85%]">
                How much did I spend on delivery?
              </div>
            </div>

            {/* AI 3 */}
            <div className="space-y-2.5 max-w-[95%]">
              <div className="flex items-center gap-2">
                <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-[#0055FF] to-[#38BDF8] flex items-center justify-center text-white shadow-xs ring-2 ring-blue-100/90 shrink-0">
                  <JuspayLogoMark size={12} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-950 tracking-tight">Juspay AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0055FF] border border-blue-200/70">
                    Breakdown
                  </span>
                </div>
              </div>

              {/* Conversational Text */}
              <div className="text-sm text-neutral-800 leading-relaxed font-normal">
                <strong className="text-neutral-950 font-bold text-base font-sans">₹7,850</strong> — about 43% of your food spending.
              </div>

              {/* Simple Actionable Insight Callout */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white border border-blue-200/80 text-xs text-neutral-800 space-y-1.5 leading-relaxed shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#0055FF] font-bold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Actionable Nudge</span>
                </div>
                <p className="font-medium text-neutral-800">
                  Cutting 2 delivery orders per week could save roughly <strong className="font-bold text-neutral-950">₹2,400/month</strong>.
                </p>
              </div>

              {/* Subtle Action Buttons */}
              <div className="flex items-center flex-wrap gap-2 pt-0.5">
                <button
                  onClick={onOpenDrilldown}
                  className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:border-[#0055FF] text-xs font-semibold text-neutral-800 hover:text-[#0055FF] shadow-2xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>See delivery spending</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                </button>

                <button
                  onClick={handleTrySaving}
                  disabled={hasSavedPlan}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95",
                    hasSavedPlan
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-[#0055FF] hover:bg-[#0048E6] text-white"
                  )}
                >
                  {hasSavedPlan ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                      <span>Saving ₹2,400/mo active</span>
                    </>
                  ) : (
                    <span>Try saving ₹2,400</span>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamically Added Turns (User Questions / Next Steps) */}
            {extraTurns.map((turn) => (
              <div key={turn.id} className="space-y-3 pt-2">
                {/* User Turn */}
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mr-1">You</span>
                  <div className="px-4 py-2.5 rounded-2xl rounded-tr-xs bg-[#0055FF] text-white text-sm font-medium leading-snug shadow-xs max-w-[85%]">
                    {turn.userText}
                  </div>
                </div>

                {/* AI Turn */}
                <div className="space-y-2.5 max-w-[95%]">
                  <div className="flex items-center gap-2">
                    <div className="w-5.5 h-5.5 rounded-full bg-gradient-to-tr from-[#0055FF] to-[#38BDF8] flex items-center justify-center text-white shadow-xs ring-2 ring-blue-100/90 shrink-0">
                      <JuspayLogoMark size={12} className="text-white" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-neutral-950 tracking-tight">Juspay AI</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-50 text-[#0055FF] border border-blue-200/70">
                        Response
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-800 leading-relaxed font-normal">
                    {turn.aiText}
                  </p>

                  {turn.actionButtons && turn.actionButtons.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 pt-1">
                      {turn.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={btn.action}
                          className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 hover:border-[#0055FF] text-xs font-semibold text-neutral-800 hover:text-[#0055FF] shadow-2xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <span>{btn.label}</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-200/80 w-20 shadow-2xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* 3. PERSISTENT BOTTOM COMPOSER */}
          <div className="border-t border-neutral-200/80 -mx-4 px-4 pt-2.5 pb-1 bg-white">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/90 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0055FF]/20 focus-within:border-[#0055FF] transition"
            >
              {/* Plus Button */}
              <button 
                type="button"
                onClick={() => setUserQuery("How can I save ₹3,000 next month?")}
                className="w-7 h-7 rounded-full bg-white hover:bg-[#0055FF]/10 text-neutral-600 hover:text-[#0055FF] flex items-center justify-center shrink-0 transition cursor-pointer shadow-2xs"
                title="Suggested prompts"
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

              {/* Right Action: Mic or Send */}
              {userQuery.trim() ? (
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-full bg-[#0055FF] hover:bg-[#0048E6] text-white flex items-center justify-center shadow-xs shrink-0 cursor-pointer transition"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2]" />
                </motion.button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("voice")}
                  className="w-7 h-7 rounded-full hover:bg-neutral-200/70 text-neutral-600 hover:text-[#0055FF] flex items-center justify-center shrink-0 transition cursor-pointer"
                  title="Voice Mode"
                >
                  <Mic className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </form>
          </div>
        </>
      ) : (
        /* Mode 2: TASTEFUL VOICE INTERFACE */
        <motion.div 
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-between py-2 px-1 text-center select-none relative"
        >
          <div className="absolute inset-x-0 bottom-8 h-60 bg-gradient-to-t from-[#0055FF]/10 via-[#0099FF]/3 to-transparent pointer-events-none rounded-3xl blur-2xl" />

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
            <RibbedAudioWaveOrb isListening={isListening} size={100} />
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
              {isListening ? "Listening to your voice…" : "Tap orb or start voice to speak"}
            </span>
          </motion.div>

          {/* Interactive Voice Suggestion Pills */}
          <div className="w-full relative z-10 mb-3 px-2">
            <div className="flex items-center justify-center gap-1.5 max-w-full">
              {[
                { q: "Why food jumped?", a: "Food spending is up 24% (+₹3,600), mostly from 14 Swiggy and Zomato orders." },
                { q: "Tokyo Trip progress", a: "You've saved ₹68,000 of ₹1,00,000 (68%). You're on track for your Nov 2026 target." },
                { q: "How can I save?", a: "Cutting 2 delivery orders per week saves roughly ₹2,400 per month." }
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

          {/* Voice Control Bar */}
          <div className="flex flex-col items-center relative z-10 pb-1 w-full">
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
