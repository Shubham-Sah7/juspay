"use client"

import React, { useState, useEffect } from "react"
import { 
  Home, 
  TrendingUp, 
  MessageSquare, 
  User,
  Wifi,
  Battery
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"

export type ActiveScreenType = "intro" | "home" | "insights" | "ai" | "profile"

interface MobileFrameProps {
  children: React.ReactNode
  activeScreen: ActiveScreenType
  onNavigateScreen: (screen: ActiveScreenType) => void
}

export function MobileFrame({ children, activeScreen, onNavigateScreen }: MobileFrameProps) {
  const [time, setTime] = useState("9:41")
  const [isIslandExpanded, setIsIslandExpanded] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "insights" as const, label: "Spending", icon: TrendingUp },
    { id: "ai" as const, label: "Juspay AI", icon: MessageSquare },
    { id: "profile" as const, label: "Wallet", icon: User },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[390px] h-[844px] rounded-[52px] border-[10px] border-neutral-900 bg-[#F3F4F6] shadow-[0_35px_100px_-15px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col transition-all duration-300">
      {/* Side Hardware Buttons */}
      <div className="absolute -left-[14px] top-28 w-[4px] h-10 bg-neutral-800 rounded-l-md" />
      <div className="absolute -left-[14px] top-42 w-[4px] h-14 bg-neutral-800 rounded-l-md" />
      <div className="absolute -left-[14px] top-60 w-[4px] h-14 bg-neutral-800 rounded-l-md" />
      <div className="absolute -right-[14px] top-36 w-[4px] h-20 bg-neutral-800 rounded-r-md" />

      {/* Top Status Bar & Interactive Dynamic Island */}
      <div className="relative z-50 pt-3 pb-1 px-6 flex items-center justify-between text-xs font-medium select-none bg-[#F3F4F6] text-neutral-900">
        <span className="text-[13px] font-medium font-mono tracking-tight text-neutral-900">{time}</span>
        
        {/* Interactive Dynamic Island Capsule */}
        <motion.div 
          layout
          onClick={() => setIsIslandExpanded(!isIslandExpanded)}
          className="absolute left-1/2 -translate-x-1/2 top-2.5 z-50 bg-[#0F172A] text-white rounded-full flex items-center justify-between px-3 py-1 border border-white/15 cursor-pointer select-none overflow-hidden shadow-md"
          style={{ width: isIslandExpanded ? "260px" : "110px", height: isIslandExpanded ? "36px" : "24px" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {!isIslandExpanded ? (
            <>
              {/* Left Camera Lens */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E293B] border border-neutral-700/80 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#0099FF]/80" />
                </div>
              </div>

              {/* Right Live Activity Indicator Dot & Sensor */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[#1E293B] border border-neutral-700/80" />
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex items-center justify-between w-full text-[11px] font-medium px-1"
            >
              <div className="flex items-center gap-1.5 text-[#0099FF]">
                <JuspayLogoMark size={14} />
                <span>Juspay Nudge</span>
              </div>
              <span className="font-mono text-white text-[10px] truncate max-w-[140px]">
                Food ↑ 24% (Delivery)
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Right Status Bar Icons */}
        <div className="flex items-center gap-1.5 text-neutral-900">
          <span className="text-[10px] font-mono tracking-tighter font-medium">5G</span>
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 overflow-y-auto no-scrollbar relative bg-[#F8F9FA] text-neutral-900",
        activeScreen === "intro" ? "pb-0 flex flex-col h-full" : "pb-24"
      )}>
        {children}
      </div>

      {/* Floating Dark Dock Navigation (Hidden during Intro/Onboarding) */}
      {activeScreen !== "intro" && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto">
        <div className="bg-[#181C24]/90 backdrop-blur-xl p-1.5 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.35)] border border-white/10 flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeScreen === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigateScreen(item.id)}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={cn(
                  "relative flex items-center cursor-pointer transition-all duration-200 outline-none select-none",
                  isActive 
                    ? "bg-[#0055FF] text-white px-4 py-2.5 rounded-full font-semibold text-xs shadow-[0_4px_16px_rgba(0,85,255,0.4)] gap-2" 
                    : "w-11 h-11 rounded-full bg-white text-neutral-800 flex items-center justify-center hover:scale-105 shadow-xs transition hover:text-[#0055FF]"
                )}
              >
                {item.id === "ai" ? (
                  <JuspayLogoMark 
                    size={isActive ? 16 : 20} 
                    variant={isActive ? "white" : "default"}
                    className="shrink-0 transition-transform" 
                  />
                ) : (
                  <Icon className={cn(
                    "shrink-0 transition-transform", 
                    isActive ? "w-4 h-4 text-white stroke-[2]" : "w-4.5 h-4.5 text-neutral-800 stroke-[1.75]"
                  )} />
                )}

                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="whitespace-nowrap font-medium tracking-tight text-xs text-white"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
      )}
    </div>
  )
}
