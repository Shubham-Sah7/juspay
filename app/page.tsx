"use client"

import React, { useState } from "react"
import { MobileFrame, ActiveScreenType } from "@/components/mobile-frame"
import { HomeScreen } from "@/components/screens/home-screen"
import { SpendingScreen } from "@/components/screens/spending-screen"
import { AIAssistantScreen } from "@/components/screens/ai-assistant-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { IntroScreen } from "@/components/screens/intro-screen"
import { AIDrilldownModal } from "@/components/screens/ai-drilldown-modal"
import { JuspayLogo } from "@/components/ui/juspay-logo"
import { ScreenDropdown } from "@/components/ui/screen-dropdown"

export default function Page() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreenType>("intro")
  const [isDrilldownOpen, setIsDrilldownOpen] = useState<boolean>(false)

  const handleNavigateScreen = (screen: ActiveScreenType) => {
    setIsDrilldownOpen(false)
    setActiveScreen(screen)
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-neutral-900 flex flex-col font-sans">
      {/* Clean Minimal Header: Branding & Screen Switcher Dropdown */}
      <header className="z-50 sticky top-0 bg-white/85 backdrop-blur-md border-b border-neutral-200/80 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2.5">
            <JuspayLogo size={26} showText={true} textColor="#0F172A" />
            <span className="text-xs text-neutral-300 font-medium font-mono hidden sm:inline">|</span>
            <span className="text-xs font-medium text-neutral-500 hidden sm:inline">Gen-Z AI Personal Finance</span>
          </div>

          {/* Screen Dropdown for quick evaluation navigation */}
          <div className="flex items-center gap-2">
            <ScreenDropdown
              currentScreen={activeScreen}
              onSelectScreen={(screen) => {
                setIsDrilldownOpen(false)
                setActiveScreen(screen)
              }}
              labelPrefix="Screen:"
              showPulseDot={true}
              align="right"
            />
          </div>
        </div>
      </header>

      {/* Main Mobile Device Experience */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative">
        <div className="w-full flex flex-col items-center justify-center">
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
                onBack={() => setActiveScreen("home")}
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
      </main>
    </div>
  )
}

