"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bell, 
  Settings, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Scan, 
  Plus, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Lock,
  Eye,
  EyeOff,
  X,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"


const INCOME_WEEKS = [
  { week: "W1", label: "Week 1 (Aug 1–7)", amount: "₹8,450", x: 42, y: 52, sources: "Consulting" },
  { week: "W2", label: "Week 2 (Aug 8–14)", amount: "₹11,280", x: 122, y: 36, sources: "Client Work" },
  { week: "W3", label: "Week 3 (Aug 15–21)", amount: "₹9,702", x: 204, y: 46, sources: "Dividends" },
  { week: "W4", label: "Week 4 (Aug 22–31)", amount: "₹13,000", x: 304, y: 12, sources: "Bonus & Salary" },
]

interface ProfileScreenProps {
  onOpenDrilldown: () => void
}

export function ProfileScreen({ onOpenDrilldown }: ProfileScreenProps) {
  const [isCardFrozen, setIsCardFrozen] = useState(false)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [activeTransferUser, setActiveTransferUser] = useState<{ name: string; img: string } | null>(null)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [selectedIncomeWeek, setSelectedIncomeWeek] = useState<number>(3)

  const handleSendTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!transferAmount) return
    setTransferSuccess(true)
    setTimeout(() => {
      setTransferSuccess(false)
      setActiveTransferUser(null)
      setTransferAmount("")
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }
  }



  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 space-y-4 pb-6 relative"
    >
      {/* Header Bar */}
      <motion.div variants={itemVariants} className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-sm font-black text-neutral-900 leading-none">Hi Alex!</h1>
          <span className="text-[11px] font-semibold text-neutral-400 block mt-0.5">Welcome to your wallet</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </div>
      </motion.div>

      {/* Interactive Main Balance Card matching Homepage Sapphire Design */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setShowCardDetails(!showCardDetails)}
        className="p-5.5 rounded-[26px] bg-gradient-to-br from-[#0B1528] via-[#0D245A] to-[#0055FF] text-white shadow-[0_20px_50px_rgba(0,85,255,0.30),inset_0_1px_1.5px_rgba(255,255,255,0.35)] border border-white/20 space-y-4 relative overflow-hidden cursor-pointer select-none group"
      >
        {/* Subtle Ambient Light Glows */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#0099FF]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#0055FF]/25 blur-3xl pointer-events-none" />

        {/* Top Card Row */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <JuspayLogoMark size={20} />
            <span className="text-xs font-bold tracking-[0.18em] uppercase font-sans text-white">
              Juspay Card
            </span>
            {/* Contactless Radio Wave Mark */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-white/50 -rotate-90 ml-0.5">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            </svg>
            {isCardFrozen && (
              <span className="flex items-center gap-1 text-[10px] bg-rose-500/80 text-white px-2 py-0.5 rounded-full font-medium ml-1">
                <Lock className="w-2.5 h-2.5" /> Frozen
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-xs font-medium text-white/90">
            <span>VISA • 9934</span>
            {showCardDetails ? <EyeOff className="w-3.5 h-3.5 text-white/70" /> : <Eye className="w-3.5 h-3.5 text-white/70" />}
          </div>
        </div>

        {/* Balance & Details */}
        <div className="relative z-10 pt-1">
          {!showCardDetails ? (
            <div>
              <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-white/70 block">
                Total Available Balance
              </span>
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans mt-1">
                ₹1,48,250
              </div>

              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> +2.10% this week
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-2 py-1"
            >
              <div className="text-xs text-white/60 font-medium tracking-wider uppercase">Card Number</div>
              <div className="text-lg font-bold text-white tracking-widest font-mono">4532 •••• •••• 9934</div>
              <div className="flex items-center justify-between pt-1 text-xs text-white/80">
                <span>EXP: <strong className="text-white font-mono">08/28</strong></span>
                <span>CVV: <strong className="text-white font-mono">482</strong></span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Action Buttons with Apple Glassmorphism */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5">
        <motion.button 
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveTransferUser({ name: "Amara", img: "/avatars/amara.jpg" })}
          className="p-3.5 rounded-2xl bg-neutral-900 text-white shadow-md flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition"
        >
          <span>Send</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl text-neutral-900 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer border border-white/80 hover:bg-white transition"
        >
          <Scan className="w-4.5 h-4.5 stroke-[2.2]" />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onOpenDrilldown}
          className="p-3.5 rounded-2xl bg-neutral-900 text-white shadow-md flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition"
        >
          <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Request</span>
        </motion.button>
      </motion.div>

      {/* "Send Again" Avatars Grid with Clickable Quick Transfer */}
      <motion.div variants={itemVariants} className="space-y-2 pt-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Send Again
        </h3>

        <div className="grid grid-cols-4 gap-2.5">
          {[
            { name: "Amara", img: "/avatars/amara.jpg" },
            { name: "Ridho", img: "/avatars/ridho.jpg" },
            { name: "Safira", img: "/avatars/safira.jpg" }
          ].map((user) => (
            <motion.div 
              key={user.name} 
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTransferUser(user)}
              className="p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#0055FF]/40 hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-100 shadow-2xs">
                <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-700 truncate w-full text-center">{user.name}</span>
            </motion.div>
          ))}

          <motion.div 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTransferUser({ name: "Inara", img: "/avatars/inara.jpg" })}
            className="p-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#0055FF]/40 hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[11px] font-semibold text-neutral-700">Add</span>
          </motion.div>
        </div>
      </motion.div>

      {/* "Your Income" Analytics Card */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="p-4.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_6px_25px_rgba(0,0,0,0.04)] space-y-3 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Your Income</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-bold text-neutral-900">This Month · August 2025</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
            <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Big Stats Row */}
        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <span className="text-2xl font-bold font-sans text-neutral-900 tracking-tight">
              ₹42,432<span className="text-base text-neutral-400">.43</span>
            </span>
            <span className="text-[11px] text-neutral-500 block mt-0.5 font-medium">
              {INCOME_WEEKS[selectedIncomeWeek].label}: <strong className="text-emerald-600">{INCOME_WEEKS[selectedIncomeWeek].amount}</strong> ({INCOME_WEEKS[selectedIncomeWeek].sources})
            </span>
          </div>

          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300/60 shadow-2xs flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3 h-3" />
            +2.10%
          </span>
        </div>

        {/* State-of-the-art Interactive Area Sparkline Graph */}
        <div className="relative w-full h-24 pt-2 select-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 80" fill="none">
            <defs>
              <linearGradient id="incomeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#10B981" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
              <filter id="incomeLineGlow" x="-10%" y="-20%" width="120%" height="150%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#10B981" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Subtle Grid Guidelines */}
            <line x1="0" y1="24" x2="320" y2="24" stroke="#F1F5F9" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="0" y1="52" x2="320" y2="52" stroke="#F1F5F9" strokeDasharray="3 3" strokeWidth="1" />

            {/* Gradient Area Fill */}
            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              d="M 0,66 C 18,64 26,52 42,52 C 72,52 92,36 122,36 C 152,36 174,46 204,46 C 240,46 270,14 304,12 L 304,80 L 0,80 Z"
              fill="url(#incomeAreaGrad)"
            />

            {/* Smooth Vibrant Spline Curve with Glow */}
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d="M 0,66 C 18,64 26,52 42,52 C 72,52 92,36 122,36 C 152,36 174,46 204,46 C 240,46 270,14 304,12"
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2.75" 
              strokeLinecap="round" 
              filter="url(#incomeLineGlow)"
            />

            {/* Dotted cursor drop line on selected point */}
            <line 
              x1={INCOME_WEEKS[selectedIncomeWeek].x} 
              y1={INCOME_WEEKS[selectedIncomeWeek].y} 
              x2={INCOME_WEEKS[selectedIncomeWeek].x} 
              y2="80" 
              stroke="#10B981" 
              strokeDasharray="2 2" 
              strokeWidth="1.2" 
              opacity="0.5"
            />

            {/* All Data Point Nodes */}
            {INCOME_WEEKS.map((pt, idx) => (
              <g 
                key={pt.week} 
                className="cursor-pointer" 
                onClick={() => setSelectedIncomeWeek(idx)}
              >
                {selectedIncomeWeek === idx && (
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="8" 
                    fill="#10B981" 
                    opacity="0.25" 
                    className="animate-ping" 
                  />
                )}
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r={selectedIncomeWeek === idx ? 5 : 3.5} 
                  fill={selectedIncomeWeek === idx ? "#10B981" : "#A7F3D0"} 
                  stroke="white" 
                  strokeWidth={selectedIncomeWeek === idx ? "2.5" : "1.5"} 
                />
              </g>
            ))}
          </svg>
        </div>

        {/* 4-Week Interactive Selector Pills */}
        <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-neutral-100">
          {INCOME_WEEKS.map((w, idx) => (
            <button
              key={w.week}
              onClick={() => setSelectedIncomeWeek(idx)}
              className={cn(
                "py-1.5 px-1 rounded-xl text-center transition-all cursor-pointer",
                selectedIncomeWeek === idx
                  ? "bg-neutral-900 text-white shadow-xs scale-102"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 border border-neutral-200/60"
              )}
            >
              <span className="text-[10px] font-bold block leading-none">{w.week}</span>
              <span className="text-[10px] opacity-85 block mt-1 font-medium">{w.amount}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Card Settings & Security with Interactive Freeze Toggle */}
      <motion.div variants={itemVariants} className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Card Settings & Security
        </h3>

        <div className="space-y-2">
          {/* Card Freeze Toggle */}
          <div 
            onClick={() => setIsCardFrozen(!isCardFrozen)}
            className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:bg-white transition select-none"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition shadow-2xs", isCardFrozen ? "bg-rose-100 text-rose-700 border-rose-200" : "bg-blue-50 text-[#0055FF] border-blue-100")}>
                {isCardFrozen ? <Lock className="w-4.5 h-4.5 stroke-[2.2]" /> : <ShieldCheck className="w-4.5 h-4.5 stroke-[2.2]" />}
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 block leading-tight">
                  {isCardFrozen ? "Card Frozen" : "Card Freeze & Limits"}
                </span>
                <span className="text-[10px] font-medium text-neutral-400 block mt-0.5">
                  {isCardFrozen ? "Payments locked securely" : "Daily limit: ₹1,00,000"}
                </span>
              </div>
            </div>

            <div className={cn("w-11 h-6.5 rounded-full p-1 transition-colors flex items-center cursor-pointer", isCardFrozen ? "bg-rose-500 justify-end" : "bg-neutral-300 justify-start")}>
              <motion.div layout className="w-4.5 h-4.5 rounded-full bg-white shadow-md" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer hover:bg-white transition">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 block leading-tight">Instant Cashbacks</span>
                <span className="text-[10px] font-medium text-neutral-400 block mt-0.5">₹1,240 earned this month</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </motion.div>

      {/* Quick Transfer Modal Sheet */}
      <AnimatePresence>
        {activeTransferUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 flex items-end p-3 rounded-[40px]"
          >
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full bg-white rounded-lg p-4 space-y-4 shadow-xl border border-neutral-200"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={activeTransferUser.img} alt={activeTransferUser.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900">Send Money to {activeTransferUser.name}</h3>
                    <span className="text-[10px] text-neutral-400">Instant UPI Transfer</span>
                  </div>
                </div>
                <button onClick={() => setActiveTransferUser(null)} className="p-1 text-neutral-400 hover:text-neutral-900">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!transferSuccess ? (
                <form onSubmit={handleSendTransfer} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">Amount</label>
                    <div className="flex items-center gap-1 border-b-2 border-neutral-900 py-1">
                      <span className="text-lg font-black font-mono">₹</span>
                      <input 
                        type="number"
                        placeholder="500"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full text-2xl font-black font-mono outline-none bg-transparent"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 rounded-md bg-[#0A0E17] text-white text-xs font-bold shadow-md hover:bg-neutral-800 transition"
                  >
                    Confirm Transfer
                  </button>
                </form>
              ) : (
                <div className="py-4 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-sm font-black text-neutral-900">₹{transferAmount} Sent to {activeTransferUser.name}!</h4>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

