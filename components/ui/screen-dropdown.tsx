"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  TrendingUp, 
  Sparkles, 
  CreditCard, 
  Layers, 
  ChevronDown, 
  Check,
  LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ActiveScreenType } from "@/components/mobile-frame"

export interface ScreenOption {
  id: ActiveScreenType
  badge: string
  label: string
  description: string
  icon: LucideIcon
  colorClass: string
  accentColor: string
  tag: string
}

export const SCREEN_OPTIONS: ScreenOption[] = [
  {
    id: "intro",
    badge: "00",
    label: "Intro & Onboarding",
    description: "Interactive Flow & 3D Cards",
    icon: Layers,
    colorClass: "text-violet-600 bg-violet-50 border-violet-200/60",
    accentColor: "#8B5CF6",
    tag: "Welcome"
  },
  {
    id: "home",
    badge: "01",
    label: "Home Overview",
    description: "Balance, Vaults & Live Feed",
    icon: Home,
    colorClass: "text-[#0055FF] bg-blue-50 border-blue-200/60",
    accentColor: "#0055FF",
    tag: "Overview"
  },
  {
    id: "insights",
    badge: "02",
    label: "Spending Analytics",
    description: "Daily Chart & Categories",
    icon: TrendingUp,
    colorClass: "text-indigo-600 bg-indigo-50 border-indigo-200/60",
    accentColor: "#6366F1",
    tag: "Analytics"
  },
  {
    id: "ai",
    badge: "03",
    label: "Juspay AI Assistant",
    description: "Voice & Smart Spend Nudge",
    icon: Sparkles,
    colorClass: "text-blue-600 bg-blue-50 border-blue-200/60",
    accentColor: "#0055FF",
    tag: "AI Core"
  },
  {
    id: "profile",
    badge: "04",
    label: "Wallet & Cards",
    description: "Card Security, Limits & Details",
    icon: CreditCard,
    colorClass: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
    accentColor: "#10B981",
    tag: "Security"
  }
]

interface ScreenDropdownProps {
  currentScreen: ActiveScreenType
  onSelectScreen: (screen: ActiveScreenType) => void
  labelPrefix?: string
  align?: "left" | "right" | "center"
  showPulseDot?: boolean
  className?: string
  buttonClassName?: string
}

export function ScreenDropdown({
  currentScreen,
  onSelectScreen,
  labelPrefix,
  align = "left",
  showPulseDot = false,
  className,
  buttonClassName
}: ScreenDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = SCREEN_OPTIONS.find((opt) => opt.id === currentScreen) || SCREEN_OPTIONS[0]
  const CurrentIcon = currentOption.icon

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left select-none", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-neutral-800 border border-neutral-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer font-sans text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0055FF]/20",
          isOpen && "ring-2 ring-[#0055FF]/20 border-[#0055FF]/40 bg-white",
          buttonClassName
        )}
      >
        {showPulseDot ? (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        ) : (
          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center border shrink-0", currentOption.colorClass)}>
            <CurrentIcon className="w-3 h-3 stroke-[2.2]" />
          </div>
        )}

        {labelPrefix && (
          <span className="text-[11px] font-mono text-neutral-600 font-semibold tracking-wide">
            {labelPrefix}
          </span>
        )}

        <span className="font-semibold text-neutral-900 tracking-tight">
          {currentOption.label}
        </span>

        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/70">
          {currentOption.badge}
        </span>

        <ChevronDown 
          className={cn(
            "w-3.5 h-3.5 text-neutral-600 transition-transform duration-200 ease-out group-hover:text-neutral-900 ml-0.5",
            isOpen && "rotate-180 text-[#0055FF]"
          )} 
        />
      </button>

      {/* Floating Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute top-full mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-2xl p-2 z-50 text-neutral-900",
              align === "left" && "left-0",
              align === "right" && "right-0",
              align === "center" && "left-1/2 -translate-x-1/2"
            )}
          >
            {/* Header / Subtitle */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-neutral-100 mb-1">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-neutral-600 font-mono">
                Switch Screen
              </span>
              <span className="text-[10px] font-mono text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded-full">
                5 screens
              </span>
            </div>

            {/* List of Screens */}
            <div className="space-y-1">
              {SCREEN_OPTIONS.map((option) => {
                const isSelected = option.id === currentScreen
                const IconComp = option.icon

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onSelectScreen(option.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer group",
                      isSelected 
                        ? "bg-blue-50/80 border border-blue-200/80 text-[#0055FF] shadow-2xs" 
                        : "hover:bg-neutral-100/80 text-neutral-700 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Icon */}
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105",
                        option.colorClass
                      )}>
                        <IconComp className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>

                      {/* Labels */}
                      <div className="min-w-0 flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "text-xs font-semibold tracking-tight truncate",
                            isSelected ? "text-[#0055FF]" : "text-neutral-900"
                          )}>
                            {option.label}
                          </span>
                          <span className="text-[9.5px] font-mono font-medium px-1 rounded bg-neutral-100/90 text-neutral-600">
                            {option.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-600 truncate mt-0.5">
                          {option.description}
                        </span>
                      </div>
                    </div>

                    {/* Checkmark or Selection Tag */}
                    <div className="shrink-0 pl-1.5">
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-[#0055FF] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[9px] font-medium text-neutral-600 group-hover:text-neutral-600 transition">
                          {option.tag}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
