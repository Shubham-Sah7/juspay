"use client"

import React, { useState } from "react"
import { HomeScreen } from "./screens/home-screen"
import { SpendingScreen } from "./screens/spending-screen"
import { AIAssistantScreen } from "./screens/ai-assistant-screen"
import { AIDrilldownModal } from "./screens/ai-drilldown-modal"
import { ActiveScreenType } from "./mobile-frame"
import { ArrowRight } from "lucide-react"

interface DesignDeckViewProps {
  onNavigateToScreen: (screen: ActiveScreenType) => void
}

export function DesignDeckView({ onNavigateToScreen }: DesignDeckViewProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const steps = [
    {
      id: "home" as const,
      stepNum: "01",
      title: "Home / Overview",
      subtitle: "Screen 1 Overview",
      component: <HomeScreen onNavigateToInsights={() => onNavigateToScreen("insights")} onOpenDrilldown={() => setModalOpen(true)} />
    },
    {
      id: "insights" as const,
      stepNum: "02",
      title: "Spending Analytics",
      subtitle: "Screen 2 Spending",
      component: <SpendingScreen onOpenDrilldown={() => setModalOpen(true)} />
    },
    {
      id: "ai" as const,
      stepNum: "03",
      title: "Nudge AI Assistant",
      subtitle: "Screen 3 AI Assistant",
      component: <AIAssistantScreen onOpenDrilldown={() => setModalOpen(true)} />
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 py-2 px-2">
      {/* 3-Screen Deck Grid Replicating Reference Image 1:1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="flex flex-col items-center"
          >
            {/* Screen Header Badge */}
            <div className="w-full mb-3 flex items-center justify-between px-2">
              <span className="text-xs font-mono font-medium text-neutral-900 bg-white px-2.5 py-1 rounded-full border border-neutral-200 shadow-2xs">
                {step.title}
              </span>
              <button
                onClick={() => onNavigateToScreen(step.id)}
                className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 transition flex items-center gap-1"
              >
                Focus View <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Mobile Phone Mockup Box */}
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                {step.component}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AIDrilldownModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
