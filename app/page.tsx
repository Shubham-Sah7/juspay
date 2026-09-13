"use client"

import React, { useState } from "react"
import { MobileFrame, ActiveScreenType } from "@/components/mobile-frame"
import { HomeScreen } from "@/components/screens/home-screen"
import { SpendingScreen } from "@/components/screens/spending-screen"
import { AIAssistantScreen } from "@/components/screens/ai-assistant-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { IntroScreen } from "@/components/screens/intro-screen"
import { AIDrilldownModal } from "@/components/screens/ai-drilldown-modal"
import { DesignDeckView } from "@/components/design-deck-view"
import { JuspayLogo } from "@/components/ui/juspay-logo"
import { 
  Smartphone, 
  Grid, 
  Play,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ViewMode = "mobile" | "deck"

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreenType>("home")
  const [viewMode, setViewMode] = useState<ViewMode>("deck")
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false)
  const [isDrilldownOpen, setIsDrilldownOpen] = useState<boolean>(false)

  const handleNavigateScreen = (screen: ActiveScreenType) => {
    setActiveScreen(screen)
  }

  // Auto-Guided Walkthrough Demo Player
  const runAutoDemo = () => {
    setIsPlayingDemo(true)
    setViewMode("mobile")
    setIsDrilldownOpen(false)
    setActiveScreen("home")

    setTimeout(() => {
      setActiveScreen("insights")
    }, 2500)

    setTimeout(() => {
      setIsDrilldownOpen(true)
    }, 5500)

    setTimeout(() => {
      setIsDrilldownOpen(false)
      setActiveScreen("ai")
    }, 8500)

    setTimeout(() => {
      setActiveScreen("profile")
    }, 11500)

    setTimeout(() => {
      setIsPlayingDemo(false)
    }, 14500)
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-neutral-900 flex flex-col font-sans">
      {/* Clean Showcase Header */}
      <header className="z-50 sticky top-0 bg-white/80 backdrop-blur-md border-b border-neutral-200/70 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2.5">
            <JuspayLogo size={26} showText={true} textColor="#0F172A" />
            <span className="text-xs text-neutral-400 font-medium font-mono hidden sm:inline">|</span>
            <span className="text-xs font-medium text-neutral-500 hidden sm:inline">Gen-Z AI Personal Finance</span>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setViewMode("mobile")
                setActiveScreen("intro")
                setIsDrilldownOpen(false)
              }}
              className={cn(
                "text-xs rounded-full border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium h-8 px-3 gap-1.5 cursor-pointer transition",
                activeScreen === "intro" && viewMode === "mobile" 
                  ? "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800" 
                  : "bg-white"
              )}
            >
              <Sparkles className="w-3 h-3 text-[#0055FF]" />
              <span>Intro Screen</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={runAutoDemo}
              disabled={isPlayingDemo}
              className="text-xs rounded-full border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-medium h-8 px-3 gap-1.5 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current text-emerald-600" />
              <span>{isPlayingDemo ? "Playing..." : "Demo Tour"}</span>
            </Button>

            <div className="flex items-center bg-neutral-100 p-0.5 rounded-full border border-neutral-200/80">
              <button
                onClick={() => setViewMode("deck")}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1.5 cursor-pointer",
                  viewMode === "deck" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
                )}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>3-Screen Deck</span>
              </button>
              <button
                onClick={() => setViewMode("mobile")}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition flex items-center gap-1.5 cursor-pointer",
                  viewMode === "mobile" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500 hover:text-neutral-800"
                )}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Showcase Body */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative">
        {viewMode === "mobile" ? (
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            {/* Context Badge */}
            <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-neutral-200 text-xs font-medium text-neutral-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {isDrilldownOpen && "Drill Down Modal: Food Spending (+24%)"}
                {!isDrilldownOpen && activeScreen === "intro" && "Intro / Onboarding Screen (3D Folders)"}
                {!isDrilldownOpen && activeScreen === "home" && "Screen 1: Home / Financial Overview"}
                {!isDrilldownOpen && activeScreen === "insights" && "Screen 2: Spending Analytics & Categories"}
                {!isDrilldownOpen && activeScreen === "ai" && "Screen 3: Nudge AI Assistant ('Where is my money going?')"}
                {!isDrilldownOpen && activeScreen === "profile" && "Screen 4: Card & Wallet Details"}
              </span>
            </div>

            {/* Mobile Device Frame */}
            <MobileFrame activeScreen={activeScreen} onNavigateScreen={handleNavigateScreen}>
              {activeScreen === "intro" && (
                <IntroScreen onContinue={() => setActiveScreen("home")} />
              )}
              {activeScreen === "home" && (
                <HomeScreen 
                  onNavigateToInsights={() => setActiveScreen("insights")} 
                  onOpenDrilldown={() => setIsDrilldownOpen(true)} 
                />
              )}
              {activeScreen === "insights" && (
                <SpendingScreen 
                  onOpenDrilldown={() => setIsDrilldownOpen(true)} 
                />
              )}
              {activeScreen === "ai" && (
                <AIAssistantScreen 
                  onOpenDrilldown={() => setIsDrilldownOpen(true)} 
                />
              )}
              {activeScreen === "profile" && (
                <ProfileScreen 
                  onOpenDrilldown={() => setIsDrilldownOpen(true)} 
                />
              )}

              {/* Interactive Drill Down Modal */}
              <AIDrilldownModal 
                isOpen={isDrilldownOpen} 
                onClose={() => setIsDrilldownOpen(false)} 
              />
            </MobileFrame>
          </div>
        ) : (
          <DesignDeckView onNavigateToScreen={(screen) => {
            setActiveScreen(screen)
            setViewMode("mobile")
          }} />
        )}
      </main>
    </div>
  )
}
