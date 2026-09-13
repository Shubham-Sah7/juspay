"use client"

import React, { useState } from "react"
import { HomeScreen } from "./screens/home-screen"
import { SpendingScreen } from "./screens/spending-screen"
import { AIAssistantScreen } from "./screens/ai-assistant-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { IntroScreen } from "./screens/intro-screen"
import { AIDrilldownModal } from "./screens/ai-drilldown-modal"
import { ActiveScreenType } from "./mobile-frame"
import { ScreenDropdown } from "./ui/screen-dropdown"
import { ArrowRight, RotateCcw } from "lucide-react"

interface DesignDeckViewProps {
  onNavigateToScreen: (screen: ActiveScreenType) => void
}

export function DesignDeckView({ onNavigateToScreen }: DesignDeckViewProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [slotScreens, setSlotScreens] = useState<ActiveScreenType[]>([
    "home",
    "insights",
    "ai"
  ])

  const handleSelectScreen = (slotIndex: number, screen: ActiveScreenType) => {
    setSlotScreens(prev => {
      const updated = [...prev]
      updated[slotIndex] = screen
      return updated
    })
  }

  const handleResetSlots = () => {
    setSlotScreens(["home", "insights", "ai"])
  }

  const renderScreen = (screenId: ActiveScreenType, slotIndex: number) => {
    switch (screenId) {
      case "intro":
        return <IntroScreen onContinue={() => handleSelectScreen(slotIndex, "home")} />
      case "home":
        return (
          <HomeScreen 
            onNavigateToInsights={() => handleSelectScreen(slotIndex, "insights")} 
            onOpenDrilldown={() => setModalOpen(true)} 
          />
        )
      case "insights":
        return (
          <SpendingScreen 
            onOpenDrilldown={() => setModalOpen(true)} 
          />
        )
      case "ai":
        return (
          <AIAssistantScreen 
            onOpenDrilldown={() => setModalOpen(true)} 
            onBack={() => handleSelectScreen(slotIndex, "home")}
          />
        )
      case "profile":
        return (
          <ProfileScreen 
            onOpenDrilldown={() => setModalOpen(true)} 
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 py-2 px-2">
      {/* 3-Screen Deck Grid with individual dropdown for EVERY small screen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {slotScreens.map((currentScreenId, index) => (
          <div 
            key={`slot-${index}`} 
            className="flex flex-col items-center relative z-10"
          >
            {/* Screen Header Controls: Dropdown for this specific small screen */}
            <div className="w-full mb-3 flex items-center justify-between px-1 gap-2 relative z-30">
              <ScreenDropdown
                currentScreen={currentScreenId}
                onSelectScreen={(screen) => handleSelectScreen(index, screen)}
                labelPrefix={`Screen ${index + 1}:`}
              />

              <button
                onClick={() => onNavigateToScreen(currentScreenId)}
                className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-neutral-200/80 shadow-2xs hover:shadow-xs cursor-pointer shrink-0"
                title="Open in full mobile frame"
              >
                <span>Focus</span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900" />
              </button>
            </div>

            {/* Mobile Phone Mockup Box */}
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative z-0">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                {renderScreen(currentScreenId, index)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deck Quick Bar */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={handleResetSlots}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 bg-white/80 hover:bg-white px-3 py-1.5 rounded-full border border-neutral-200/70 shadow-2xs transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Deck Layout (Home · Spending · AI)</span>
        </button>
      </div>

      <AIDrilldownModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
