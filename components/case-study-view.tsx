"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Home, 
  CreditCard, 
  Layers, 
  Shield, 
  Zap, 
  Eye, 
  Target, 
  MessageSquare, 
  Mic, 
  Database, 
  Cpu, 
  PieChart, 
  CornerDownRight, 
  ChevronRight,
  ExternalLink,
  Smartphone,
  BarChart3,
  Lightbulb,
  Compass,
  CheckCircle2
} from "lucide-react"
import { HomeScreen } from "./screens/home-screen"
import { SpendingScreen } from "./screens/spending-screen"
import { AIAssistantScreen } from "./screens/ai-assistant-screen"
import { IntroScreen } from "./screens/intro-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { AIDrilldownModal } from "./screens/ai-drilldown-modal"
import { ActiveScreenType } from "./mobile-frame"
import { JuspayLogo } from "./ui/juspay-logo"
import { cn } from "@/lib/utils"

interface CaseStudyViewProps {
  onNavigateToMobile?: (screen: ActiveScreenType) => void
}

/* Annotation Card Helper */
function AnnotationCard({
  num,
  title,
  what,
  why,
  problem,
  problemSolved
}: {
  num: string
  title: string
  what: string
  why: string
  problem?: string
  problemSolved?: string
}) {
  const solved = problemSolved || problem

  return (
    <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-sm hover:border-neutral-300 transition group">
      {/* Arrow line header: ① ─────────────→ Feature */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-[11px] flex items-center justify-center font-bold shrink-0 shadow-xs">
          {num}
        </span>
        <div className="h-[1px] w-7 bg-neutral-300 group-hover:bg-[#0055FF] transition-colors shrink-0" />
        <span className="text-neutral-400 group-hover:text-[#0055FF] text-xs font-mono transition-colors">→</span>
        <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-neutral-900 font-sans">
          {title}
        </h4>
      </div>

      <div className="space-y-2 text-[12px] leading-relaxed text-neutral-600 pl-1">
        <div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-neutral-600 block mb-0.5">
            What is it?
          </span>
          <p className="text-neutral-800 font-normal">{what}</p>
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#0055FF] block mb-0.5">
            Why is it there?
          </span>
          <p className="text-neutral-800 font-normal">{why}</p>
        </div>
        {solved && (
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-neutral-600 block mb-0.5">
              What problem does it solve?
            </span>
            <p className="text-neutral-800 font-normal">{solved}</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* Section Header Helper */
function SectionHeader({
  number,
  title,
  category,
  description
}: {
  number: string
  title: string
  category: string
  description?: string
}) {
  return (
    <div className="space-y-2 pb-6 border-b border-neutral-200/80 mb-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-bold tracking-widest text-[#0055FF] uppercase bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
          Section {number}
        </span>
        <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider">
          {category}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 font-sans">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-neutral-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export function CaseStudyView({ onNavigateToMobile }: CaseStudyViewProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("01")

  const sectionsList = [
    { id: "01", label: "01 Product Overview" },
    { id: "02", label: "02 The Problem" },
    { id: "03", label: "03 Product Idea" },
    { id: "04", label: "04 Design Principles" },
    { id: "05", label: "05 User Flow" },
    { id: "06", label: "06 Intro / Onboarding" },
    { id: "07", label: "07 Home / Financial Overview" },
    { id: "08", label: "08 Spending Analytics" },
    { id: "09", label: "09 Nudge AI — Chat" },
    { id: "10", label: "10 Interactive Insights" },
    { id: "11", label: "11 Nudge AI — Voice" },
    { id: "12", label: "12 Goals / Piggy Vault" },
    { id: "13", label: "13 Profile & Security" },
    { id: "14", label: "14 Navigation & Interactions" },
    { id: "15", label: "15 Design System" },
    { id: "16", label: "16 End-to-End Experience" },
    { id: "17", label: "17 Key Product Decisions" },
    { id: "18", label: "18 Final Takeaway" }
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(`section-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-24 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sticky Case Study Navigation Bar */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-xl border border-neutral-200/80 rounded-2xl p-2 shadow-sm flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pl-1">
          {sectionsList.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap transition cursor-pointer",
                activeSection === sec.id
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              )}
            >
              {sec.id}
            </button>
          ))}
        </div>

        <div className="shrink-0 pr-1 hidden md:flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-600">Case Study Format:</span>
          <span className="text-[11px] font-mono font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200/70">
            Screen on Left + Arrows & Thinking on Right
          </span>
        </div>
      </div>

      {/* ==================================================
          01 — PRODUCT OVERVIEW
          ================================================== */}
      <section id="section-01" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="01" 
          title="Product Overview" 
          category="Executive Summary"
        />

        <div className="max-w-4xl space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-sans">
              Nudge Money
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 font-normal leading-relaxed">
              A personal finance experience that helps people see where their money goes, understand why, and decide what to do next.
            </p>
          </div>

          {/* 3 Simple Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
              <span className="font-mono text-xs font-bold text-[#0055FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                01 · SEE
              </span>
              <h3 className="text-base font-bold text-neutral-900">Understand your position</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Provide instant clarity over your total balance, monthly velocity, and active vaults without cognitive load.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
              <span className="font-mono text-xs font-bold text-[#0055FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                02 · UNDERSTAND
              </span>
              <h3 className="text-base font-bold text-neutral-900">Discover spending patterns</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Connect the dots behind what drove spending changes with interactive visual evidence and category drilldowns.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
              <span className="font-mono text-xs font-bold text-[#0055FF] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/50">
                03 · ACT
              </span>
              <h3 className="text-base font-bold text-neutral-900">Turn insights into decisions</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Convert behavioral observations directly into automated saving actions and long-term goal contributions.
              </p>
            </div>
          </div>

          {/* Core Philosophy Quote */}
          <div className="p-6 rounded-2xl bg-neutral-900 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#0055FF]/20 rounded-full blur-3xl pointer-events-none" />
            <p className="text-lg md:text-xl font-medium leading-relaxed relative z-10 italic">
              “Nudge Money is designed around the idea that financial data is only useful when people can understand what it means and what they should do next.”
            </p>
            <span className="block mt-3 text-xs font-mono text-neutral-400 uppercase tracking-wider relative z-10">
              — Senior Product Design Thesis
            </span>
          </div>
        </div>

        {/* Triple Screen Preview (Home + Spending + AI) */}
        <div className="pt-4">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-3">
            Core Triad: Home (Overview) + Spending (Analytics) + Nudge AI (Reasoning)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Screen 1 · Home</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <HomeScreen onNavigateToInsights={() => {}} onOpenDrilldown={() => {}} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Screen 2 · Spending</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <SpendingScreen onOpenDrilldown={() => {}} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Screen 3 · Nudge AI</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <AIAssistantScreen onOpenDrilldown={() => {}} onBack={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          02 — THE PROBLEM
          ================================================== */}
      <section id="section-02" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="02" 
          title="The Problem" 
          category="Market Gap & User Mental Model"
          description="Most finance apps give users balances, transactions, charts, and categories. But users still have to interpret the information themselves."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Apps */}
          <div className="p-6 rounded-3xl bg-neutral-100/80 border border-neutral-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                Traditional Finance Apps
              </span>
              <h3 className="text-lg font-bold text-neutral-900">Data Dumping Without Context</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Users are confronted with dense transaction ledgers and raw percentages, forcing high mental effort to understand what caused shifts.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white border border-neutral-200 text-neutral-800 text-center">
                RAW DATA (Transactions & Numbers)
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-center font-bold">
                USER INTERPRETS ALONE
              </div>
              <div className="text-center text-neutral-400">↓</div>
              <div className="p-3 rounded-xl bg-neutral-200/80 border border-neutral-300 text-neutral-700 text-center">
                CONFUSION, EFFORT & INACTION
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/60 border border-neutral-200 text-xs text-neutral-600">
              <strong>The real problem:</strong> It is not that users lack data. It is that users have data, but lack context.
            </div>
          </div>

          {/* Nudge Model */}
          <div className="p-6 rounded-3xl bg-blue-50/60 border border-blue-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#0055FF] font-bold bg-white px-2 py-0.5 rounded shadow-2xs">
                The Nudge Paradigm
              </span>
              <h3 className="text-lg font-bold text-neutral-900">Contextual Financial Intelligence</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Nudge synthesizes transaction histories, isolates causal drivers (+24% food delivery), presents visual proof, and translates it into an actionable recommendation.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-blue-200 text-neutral-800 text-center">
                DATA (Transactions & History)
              </div>
              <div className="text-center text-[#0055FF]">↓</div>
              <div className="p-2.5 rounded-xl bg-blue-100 border border-blue-300 text-[#0055FF] text-center font-bold">
                CONTEXT (Behavioral Shifts & Drivers)
              </div>
              <div className="text-center text-[#0055FF]">↓</div>
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-center font-bold">
                INSIGHT (Evidence & Causality)
              </div>
              <div className="text-center text-[#0055FF]">↓</div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-center font-bold">
                ACTION (Save ₹2,400 to Tokyo Piggy)
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/80 border border-blue-200 text-xs text-neutral-700">
              <strong>Key Takeaway:</strong> Shift cognitive burden from the user onto ambient intelligence.
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          03 — PRODUCT IDEA
          ================================================== */}
      <section id="section-03" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="03" 
          title="Product Idea" 
          category="Core Thesis"
        />

        <div className="space-y-6">
          <blockquote className="p-6 rounded-2xl bg-white border-l-4 border-[#0055FF] border border-neutral-200/90 shadow-2xs text-lg md:text-xl font-medium text-neutral-800 italic">
            “Nudge is not another chatbot layered onto a banking app. It is a financial intelligence layer across the product.”
          </blockquote>

          {/* Connected Flow Diagram */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
              The Central Product Narrative Arc
            </span>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold block">STEP 01</span>
                <h4 className="text-xs font-bold text-neutral-900">HOME</h4>
                <p className="text-[11px] text-neutral-600">Notice something worth attention.</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold block">STEP 02</span>
                <h4 className="text-xs font-bold text-neutral-900">SPENDING</h4>
                <p className="text-[11px] text-neutral-600">Investigate the category distribution.</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold block">STEP 03</span>
                <h4 className="text-xs font-bold text-neutral-900">AI CHAT</h4>
                <p className="text-[11px] text-neutral-600">Ask natural questions: “Why did food jump?”</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-1.5">
                <span className="text-[10px] font-mono text-indigo-700 font-bold block">STEP 04</span>
                <h4 className="text-xs font-bold text-neutral-900">VISUALIZATION</h4>
                <p className="text-[11px] text-neutral-600">See the evidence (Swiggy vs Zomato breakdown).</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-700 font-bold block">STEP 05</span>
                <h4 className="text-xs font-bold text-neutral-900">ACTION</h4>
                <p className="text-[11px] text-neutral-600">Decide to save ₹2,400 into Tokyo Fund.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          04 — DESIGN PRINCIPLES
          ================================================== */}
      <section id="section-04" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="04" 
          title="Design Principles" 
          category="Foundational Guardrails"
          description="Five product and visual design principles that governed every layout, animation, and system decision."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Principle 1 */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#0055FF]">01</span>
              <h3 className="text-sm font-bold text-neutral-900">CLARITY</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Financial information should be understood quickly without eye strain or ambiguity.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70 text-[11px] font-mono text-neutral-700">
              ₹52,400 <span className="text-neutral-600 font-normal">total spent</span>
            </div>
          </div>

          {/* Principle 2 */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#0055FF]">02</span>
              <h3 className="text-sm font-bold text-neutral-900">CONTEXT</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Numbers should always have meaning. A solitary figure is noise; compared to last month it is an insight.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-[11px] font-mono text-emerald-800">
              +12.4% <span className="text-neutral-600 font-normal">vs July</span>
            </div>
          </div>

          {/* Principle 3 */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#0055FF]">03</span>
              <h3 className="text-sm font-bold text-neutral-900">PROGRESSIVE DISCOVERY</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Don't overwhelm users with everything at once. Unfold depth as intent is demonstrated.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/70 text-[11px] font-mono text-[#0055FF]">
              Ask Nudge why →
            </div>
          </div>

          {/* Principle 4 */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#0055FF]">04</span>
              <h3 className="text-sm font-bold text-neutral-900">CONVERSATION + VISUALIZATION</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                The AI should explain financial data visually with inline interactive charts, not long text walls.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200/70 text-[11px] font-mono text-indigo-900">
              Inline chart card
            </div>
          </div>

          {/* Principle 5 */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold text-[#0055FF]">05</span>
              <h3 className="text-sm font-bold text-neutral-900">ACTIONABILITY</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Insights should always lead somewhere useful. Never leave the user stranded after an alert.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-[11px] font-mono text-emerald-800">
              Try saving ₹2,400
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          05 — USER FLOW
          ================================================== */}
      <section id="section-05" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="05" 
          title="User Flow" 
          category="Architecture of User Intent"
          description="A mapping of what the user is trying to accomplish at each step of their financial journey."
        />

        <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {[
              { step: "INTRO", quote: "“I want to know what Nudge does for me.”", role: "Orientation" },
              { step: "HOME", quote: "“I want to know how I'm doing right now.”", role: "Pulse Check" },
              { step: "SPENDING", quote: "“I notice something unusual in Food & Dining.”", role: "Investigation" },
              { step: "AI CHAT", quote: "“I want to ask why it jumped this month.”", role: "Inquiry" },
              { step: "INSIGHT", quote: "“Now I see the delivery orders that caused it.”", role: "Understanding" },
              { step: "ACTION", quote: "“I know what I can do: cut 2 orders to save ₹2,400.”", role: "Decision" },
              { step: "GOALS", quote: "“I turn that decision into progress for Tokyo.”", role: "Progress" }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] font-mono text-[#0055FF] font-bold block mb-1">
                    0{idx + 1} · {item.role}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900">{item.step}</h4>
                </div>
                <p className="text-[11px] text-neutral-600 italic leading-snug">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          06 — INTRO / ONBOARDING
          ================================================== */}
      <section id="section-06" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="06" 
          title="Intro / Onboarding" 
          category="First Impression & Personality"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                <IntroScreen onContinue={() => {}} />
              </div>
            </div>
          </div>

          {/* Right: Numbered Annotations */}
          <div className="lg:col-span-7 space-y-4">
            <AnnotationCard
              num="①"
              title="Brand / Product Introduction"
              what="Top Juspay branding with high-contrast headline 'Your money, but intelligent'."
              why="Immediately frames Nudge as an active intelligence layer rather than a cold banking registry."
              problemSolved="Overcomes user fatigue from traditional banking apps that feel like spreadsheets."
            />

            <AnnotationCard
              num="②"
              title="Interactive 3D Folders & Visual Identity"
              what="A physical folder stack displaying 'Spending Intelligence', 'Smart Piggy Vault', and 'Instant Insights'."
              why="Uses tangible skeuomorphic depth and delightful physics to communicate security and modern craftsmanship."
              problemSolved="Makes financial concepts engaging rather than intimidating for Gen-Z users."
            />

            <AnnotationCard
              num="③"
              title="Supporting Value Information"
              what="Concise micro-copy highlighting 'Auto-categorization, proactive nudges, and goal acceleration'."
              why="Communicates value quickly without overwhelming users with onboarding carousels."
              problemSolved="Eliminates the 5-step onboarding fatigue that causes 40%+ drop-off in fintech apps."
            />

            <AnnotationCard
              num="④"
              title="Single Primary CTA: 'Explore Your Vault'"
              what="High-contrast dark rounded button at the base with forward arrow icon."
              why="Provides a single unambiguous next step with zero cognitive overhead."
              problemSolved="Prevents decision paralysis before the user has even touched their finances."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          07 — HOME / FINANCIAL OVERVIEW
          ================================================== */}
      <section id="section-07" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="07" 
          title="Home / Financial Overview" 
          category="Daily Financial Orientation"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                <HomeScreen onNavigateToInsights={() => {}} onOpenDrilldown={() => setModalOpen(true)} />
              </div>
            </div>
          </div>

          {/* Right: Annotations ① to ⑩ */}
          <div className="lg:col-span-7 space-y-3.5">
            <AnnotationCard
              num="①"
              title="Greeting & Personal Entry Point"
              what="Personalized 'Good evening, Alex' greeting alongside avatar and status notification bell."
              why="Establishes a human, calm tone right upon opening rather than alarming the user."
              problemSolved="Reduces initial anxiety when checking finances."
            />

            <AnnotationCard
              num="②"
              title="Total Balance Hero"
              what="High-emphasis financial balance displayed prominently in INR (₹1,48,250)."
              why="Gives the fastest answer to the fundamental question: 'Where do I stand right now?'"
              problemSolved="Eliminates navigating multiple sub-accounts to see combined liquidity."
            />

            <AnnotationCard
              num="③"
              title="Monthly Velocity Context (+12.4%)"
              what="Green positive trend pill showing relative growth compared to last month."
              why="Transforms a static number into dynamic trajectory."
              problemSolved="Prevents users from misinterpreting raw balances without historical context."
            />

            <AnnotationCard
              num="④"
              title="Money In Metric"
              what="Clean incoming cash flow badge with downward diagonal arrow (₹64,200)."
              why="Isolates salary, refunds, and inflows separately from balances."
              problemSolved="Allows instant verification that expected income arrived."
            />

            <AnnotationCard
              num="⑤"
              title="Money Out Metric"
              what="Outgoing cash flow badge with upward diagonal arrow (₹52,400)."
              why="Pairs directly with Money In to provide instant net cash-flow awareness."
              problemSolved="Solves user confusion about how much of their paycheck was consumed."
            />

            <AnnotationCard
              num="⑥"
              title="Spending Overview Banner"
              what="Highlighted card showing August total spending with 'Check it out' quick button."
              why="Acts as a bridge between high-level orientation and analytical deep dives."
              problemSolved="Eliminates the friction of hunting through sub-menus for spending reports."
            />

            <AnnotationCard
              num="⑦"
              title="Spending Category Cards"
              what="Interactive category cards showing top expense drivers (Food, Housing, Tech)."
              why="Provides hierarchy of where the user's money is flowing at a glance."
              problemSolved="Stops users from having to mentally sum multiple transactions."
            />

            <AnnotationCard
              num="⑧"
              title="Ambient AI Insight Flag"
              what="Proactive banner flagging anomalous food spending (+24%)."
              why="Highlights an issue before the user even thinks to investigate it."
              problemSolved="Solves the problem of passive dashboards where problems hide unnoticed."
            />

            <AnnotationCard
              num="⑨"
              title="Goals / Tokyo Trip Piggy Vault"
              what="3D interactive Piggy Bank visual showing 68% progress to ₹1,00,000 with quick +₹500 feed."
              why="Keeps long-term aspirational goals visible alongside daily spending to motivate savings."
              problemSolved="Bridges the disconnect between saving intentions and daily spending habits."
            />

            <AnnotationCard
              num="⑩"
              title="Quick Actions Bar"
              what="One-tap shortcuts for Send, Request, TopUp, and More."
              why="Ensures high-frequency utility tasks don't require navigating away from Home."
              problemSolved="Minimizes friction for everyday financial transactions."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          08 — SPENDING ANALYTICS
          ================================================== */}
      <section id="section-08" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="08" 
          title="Spending Analytics" 
          category="Diagnostic Engine"
          description="The Spending screen answers WHAT happened. Nudge AI helps answer WHY it happened."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                <SpendingScreen onOpenDrilldown={() => setModalOpen(true)} />
              </div>
            </div>
          </div>

          {/* Right: Annotations ① to ⑦ */}
          <div className="lg:col-span-7 space-y-4">
            <AnnotationCard
              num="①"
              title="Time Selector (Day / Week / Month / Year)"
              what="Segmented pill control allowing users to switch the timeframe of observation."
              why="Enables shifting from macro monthly budgeting to micro day-to-day spending."
              problemSolved="Prevents lock-in to fixed calendar months."
            />

            <AnnotationCard
              num="②"
              title="Total Spent Hero (₹52,400)"
              what="Prominent ₹52,400 figure labeled explicitly as 'Total Spent' (not savings)."
              why="Eliminates the critical ambiguity between savings versus expenditures."
              problemSolved="Ensures users never confuse their outflow with accumulated wealth."
            />

            <AnnotationCard
              num="③"
              title="Spending Visualization (Donut & Catmull-Rom Curve)"
              what="Interactive segmented distribution ring paired with smooth cubic Bézier daily curve."
              why="Makes proportion and daily burn rate visual rather than a table of numbers."
              problemSolved="Overcomes numeracy barriers in understanding financial distribution."
            />

            <AnnotationCard
              num="④"
              title="Category Breakdown Cards"
              what="Exact amounts and percentages (Food: 35% ₹18,400; Rent: 29% ₹15,000; Tech: 16% ₹8,200)."
              why="Provides concrete transparency behind the visual charts."
              problemSolved="Allows quick verification of exact amounts."
            />

            <AnnotationCard
              num="⑤"
              title="Change Indicators (+24% Delivery)"
              what="Contextual delta tags showing which categories surged."
              why="Directs attention to the specific category that requires attention."
              problemSolved="Stops the user from having to compare two statements manually."
            />

            <AnnotationCard
              num="⑥"
              title="Category Details & Merchant Breakdowns"
              what="Merchant lists showing Swiggy and Zomato order frequency (14 delivery orders)."
              why="Provides the causal explanation behind the category surge."
              problemSolved="Solves 'mystery spending' where users know money went out but not where."
            />

            <AnnotationCard
              num="⑦"
              title="'Ask Nudge Why' Connection Link"
              what="Prominent conversational trigger button linking Spending directly into AI."
              why="Seamlessly transitions passive analytics into active diagnostic conversation."
              problemSolved="Removes the wall between static charts and AI assistance."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          09 — NUDGE AI — CHAT
          ================================================== */}
      <section id="section-09" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="09" 
          title="Nudge AI — Chat" 
          category="Conversational Financial Intelligence"
          description="A comparison between a generic chatbot and Nudge's contextual conversational architecture."
        />

        {/* Chatbot vs Nudge Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
          <div className="p-5 rounded-2xl bg-neutral-100 border border-neutral-200 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
              Standard Finance Chatbot
            </span>
            <p className="text-xs font-mono text-neutral-700">
              User asks question → Chatbot responds with long wall of generic text.
            </p>
            <span className="text-[11px] text-rose-600 block">Result: High cognitive load, zero visualization, no path to action.</span>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0055FF] font-bold">
              Nudge AI Architecture
            </span>
            <p className="text-xs font-mono text-neutral-800">
              Question → Financial context → Inline chart → Progressive drilldown → Direct saving action.
            </p>
            <span className="text-[11px] text-emerald-700 block font-medium">Result: Visual proof, verified evidence, instant goal contribution.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                <AIAssistantScreen onOpenDrilldown={() => setModalOpen(true)} onBack={() => {}} />
              </div>
            </div>
          </div>

          {/* Right: Annotations ① to ⑦ */}
          <div className="lg:col-span-7 space-y-4">
            <AnnotationCard
              num="①"
              title="Natural-Language User Query"
              what="User prompt: 'Where is my money going this month?'"
              why="Provides a frictionless entry point without needing complex filter dropdowns."
              problemSolved="Eliminates learning curves for navigating financial databases."
            />

            <AnnotationCard
              num="②"
              title="Concise AI Financial Response"
              what="Direct answer: 'You spent ₹52,400 in August. Food & Dining is your biggest category at ₹18,400.'"
              why="Gives the core summary in 2 sentences before showing details."
              problemSolved="Avoids lengthy boilerplate LLM essays that users skip."
            />

            <AnnotationCard
              num="③"
              title="Inline Interactive Spending Chart"
              what="Compact visual card showing exact distribution (Food 35%, Rent 29%, Tech 16%)."
              why="Makes the evidence visible inside the chat thread rather than sending user away."
              problemSolved="Ensures the user can visually verify the AI's claims."
            />

            <AnnotationCard
              num="④"
              title="Progressive Follow-Up Prompt"
              what="Follow-up turn: 'Why did food jump?'"
              why="Enables step-by-step investigation rather than trying to explain everything in turn 1."
              problemSolved="Matches natural human cognitive processing."
            />

            <AnnotationCard
              num="⑤"
              title="Causal Drilldown Evidence"
              what="Response explaining that spending is up 24% (+₹3,600), mostly from 14 delivery orders."
              why="Moves past generic categories down to actual consumer behavior."
              problemSolved="Answers the 'why' instead of just restating the 'what'."
            />

            <AnnotationCard
              num="⑥"
              title="Actionable Recommendation"
              what="Concrete advice: 'Cutting 2 orders weekly could save roughly ₹2,400/month.'"
              why="Translates observation into practical financial advice."
              problemSolved="Prevents feelings of helplessness about overspending."
            />

            <AnnotationCard
              num="⑦"
              title="Direct Action Button: 'Try saving ₹2,400'"
              what="One-tap pill button that automatically routes saved delivery funds to the Tokyo Fund."
              why="Connects cognitive agreement directly to executable financial movement."
              problemSolved="Bridges the gap between intention and real-world saving."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          10 — INTERACTIVE AI INSIGHTS
          ================================================== */}
      <section id="section-10" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="10" 
          title="Interactive AI Insights" 
          category="Visual Proof & Diagnostic Deep Dive"
        />

        <div className="space-y-6">
          <blockquote className="p-6 rounded-2xl bg-white border-l-4 border-indigo-600 border border-neutral-200/90 shadow-2xs text-lg font-medium text-neutral-800 italic">
            “The chart isn't decoration. It acts as an interface for investigating the AI's reasoning.”
          </blockquote>

          {/* Drilldown Evidence Flow */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
              Exploratory Investigation Hierarchy
            </span>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <span className="text-xs font-mono text-neutral-500 font-bold block">LEVEL 1 · CATEGORY</span>
                <h4 className="text-sm font-bold text-neutral-900">Food & Dining</h4>
                <p className="text-xs text-neutral-600">₹18,400 total (35% of monthly outflow, surging +24%).</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                <span className="text-xs font-mono text-[#0055FF] font-bold block">LEVEL 2 · SUB-CATEGORY</span>
                <h4 className="text-sm font-bold text-neutral-900">Delivery Orders</h4>
                <p className="text-xs text-neutral-600">₹7,850 spent across 14 separate delivery orders.</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2">
                <span className="text-xs font-mono text-indigo-700 font-bold block">LEVEL 3 · MERCHANTS</span>
                <h4 className="text-sm font-bold text-neutral-900">Swiggy & Zomato</h4>
                <p className="text-xs text-neutral-600">Swiggy (8 orders: ₹4,650), Zomato (6 orders: ₹3,200).</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-mono text-emerald-700 font-bold block">LEVEL 4 · RESOLUTION</span>
                <h4 className="text-sm font-bold text-neutral-900">Save ₹2,400 / Month</h4>
                <p className="text-xs text-neutral-600">Cut 2 orders/week to accelerate Tokyo Trip fund by 18 days.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2 text-xs text-neutral-700">
              <h5 className="font-bold text-neutral-900 font-mono uppercase text-[11px]">Why this matters for hiring evaluators:</h5>
              <p>
                Generic AI implementations simply output text summaries. Nudge treats the data visualization as a live document: users can tap bars to filter, tap months to compare deltas, and drill down to individual line items to verify the AI's math independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          11 — NUDGE AI — VOICE
          ================================================== */}
      <section id="section-11" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="11" 
          title="Nudge AI — Voice" 
          category="Zero-Friction Audio Modality"
          description="Voice is another modality of the SAME financial assistant, eliminating typing friction on the go."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                {/* Voice mode state */}
                <AIAssistantScreen onOpenDrilldown={() => setModalOpen(true)} onBack={() => {}} initialMode="voice" />
              </div>
            </div>
          </div>

          {/* Right: Annotations ① to ⑥ */}
          <div className="lg:col-span-7 space-y-4">
            <AnnotationCard
              num="①"
              title="Chat / Voice Mode Switcher"
              what="Segmented top pill allowing users to switch between visual text chat and real-time voice interaction."
              why="Allows user to adapt modality depending on context (public commute vs private home)."
              problemSolved="Avoids forcing awkward voice interactions in quiet public environments."
            />

            <AnnotationCard
              num="②"
              title="Ambient Status Pill ('Listening to your voice...')"
              what="Top blue status pill with active pulsing indicator."
              why="Unambiguously communicates system microphone state."
              problemSolved="Eliminates the common 'is it listening to me?' audio uncertainty."
            />

            <AnnotationCard
              num="③"
              title="Ribbed Royal Blue 3D Sound Orb"
              what="Interactive animated 3D sphere that breathes and ripples with ambient voice feedback."
              why="Provides rich visual feedback while speaking, establishing a warm physical presence."
              problemSolved="Prevents dead silence and makes speech interfaces feel responsive."
            />

            <AnnotationCard
              num="④"
              title="Spoken Response Card"
              what="Concise transcript card showing the exact spoken summary."
              why="Pairs auditory output with written reinforcement for comprehension."
              problemSolved="Solves transient audio forgetting where users miss numbers spoken aloud."
            />

            <AnnotationCard
              num="⑤"
              title="Suggested Query Pills"
              what="One-tap query prompts: 'Why food jumped?', 'Tokyo Trip progress', 'How can I save?'"
              why="Prompts users on what they can ask without staring at a blank prompt."
              problemSolved="Eliminates the 'blank page syndrome' common to AI voice interfaces."
            />

            <AnnotationCard
              num="⑥"
              title="Microphone Control Button"
              what="High-contrast pill button to toggle active listening."
              why="Puts the user in complete control of when audio streaming is active."
              problemSolved="Ensures total user trust and microphone privacy."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          12 — GOALS / PIGGY VAULT
          ================================================== */}
      <section id="section-12" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="12" 
          title="Goals / Piggy Vault" 
          category="Long-Term Behavioral Reinforcement"
        />

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-xs font-mono text-[#0055FF] uppercase font-bold">Goal Architecture</span>
                <h3 className="text-lg font-bold text-neutral-900">Tokyo Trip Piggy Vault (₹1,00,000 Target)</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                68% Completed · ₹68,250 Saved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <AnnotationCard
                  num="①"
                  title="Goal Identity & Emotional Anchoring"
                  what="Named fund ('Tokyo Trip 🇯🇵') with tactile 3D Piggy Bank visual."
                  why="Associates saving with an exciting reward rather than deprivation."
                  problemSolved="Overcomes the psychological pain of saving money."
                />
                <AnnotationCard
                  num="②"
                  title="Concrete Progress Metrics (₹68,250 / ₹1,00,000)"
                  what="Exact amount saved and explicit remaining amount (₹31,750 left)."
                  why="Replaces fuzzy percentages with exact achievable milestones."
                  problemSolved="Stops users from guessing how much longer a goal will take."
                />
              </div>

              <div className="space-y-3">
                <AnnotationCard
                  num="③"
                  title="One-Tap Micro-Contribution (+₹500)"
                  what="Instant 'Feed Piggy' button with physics bounce animation."
                  why="Lowers the barrier to save small spare amounts instantly."
                  problemSolved="Transforms saving from a monthly chore into a daily micro-habit."
                />
                <AnnotationCard
                  num="④"
                  title="AI-to-Goal Auto-Routing Bridge"
                  what="When user accepts AI savings recommendation, the ₹2,400 auto-routes to Tokyo Fund."
                  why="Connects the AI's diagnostic findings directly to the goal outcome."
                  problemSolved="Closes the loop between behavioral insight and net worth accumulation."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          13 — PROFILE & SECURITY
          ================================================== */}
      <section id="section-13" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="13" 
          title="Profile & Security" 
          category="Control, Trust & Card Management"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Actual Screen */}
          <div className="lg:col-span-5 flex justify-center sticky top-28">
            <div className="w-full max-w-[390px] h-[830px] rounded-[50px] border-[9px] border-neutral-900 bg-[#F4F5F7] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col relative">
              <div className="flex-1 overflow-y-auto no-scrollbar relative bg-[#F4F5F7]">
                <ProfileScreen onOpenDrilldown={() => setModalOpen(true)} />
              </div>
            </div>
          </div>

          {/* Right: Annotations ① to ⑦ */}
          <div className="lg:col-span-7 space-y-4">
            <AnnotationCard
              num="①"
              title="User Identity & Account Status"
              what="Verified profile card with avatar, username, and active account tier."
              why="Confirms system identity and account standing."
              problemSolved="Ensures clarity over multi-user setups or account switching."
            />

            <AnnotationCard
              num="②"
              title="Interactive Virtual Debit Card"
              what="Glossy dark metallic card visual showing masked card number and tap-to-reveal CVV."
              why="Provides immediate utility for digital payments without searching for plastic card."
              problemSolved="Eliminates the friction of locating physical wallets for online checkouts."
            />

            <AnnotationCard
              num="③"
              title="Instant Card Freeze Toggle"
              what="One-tap switch to temporarily lock card transactions with immediate visual feedback."
              why="Provides maximum peace of mind in suspect merchant scenarios."
              problemSolved="Stops fraudulent charges without needing to call bank phone support."
            />

            <AnnotationCard
              num="④"
              title="Transaction Limits & Spending Controls"
              what="Slider controls for daily ATM, online, and contactless spend thresholds."
              why="Allows granular perimeter defense over capital."
              problemSolved="Prevents unauthorized runaway subscriptions or overdraft charges."
            />

            <AnnotationCard
              num="⑤"
              title="AI & Notification Preferences"
              what="Toggles for anomaly detection alerts, weekly digests, and voice permissions."
              why="Puts users in control of nudge frequency."
              problemSolved="Prevents notification fatigue and app uninstalls."
            />

            <AnnotationCard
              num="⑥"
              title="Security & Biometric Settings"
              what="FaceID / TouchID authentication switches and encryption audits."
              why="Communicates rigorous institutional-grade Juspay security standards."
              problemSolved="Establishes trust with privacy-conscious users."
            />

            <AnnotationCard
              num="⑦"
              title="Clean Separation from Core Dashboard"
              what="Housed in its own tab, accessible whenever needed."
              why="Keeps settings available without cluttering the primary Home and Spending workflows."
              problemSolved="Maintains a clutter-free daily financial experience."
            />
          </div>
        </div>
      </section>

      {/* ==================================================
          14 — NAVIGATION & INTERACTIONS
          ================================================== */}
      <section id="section-14" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="14" 
          title="Navigation & Interactions" 
          category="Information Architecture"
        />

        <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-neutral-900">Intentional 4-Tab Core Structure</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Why the navigation is limited to 4 core tabs: <strong>Home</strong> (Orientation), <strong>Spending</strong> (Investigation), <strong>Juspay AI</strong> (Reasoning), and <strong>Wallet</strong> (Control). Any additional tab increases cognitive burden.
            </p>
          </div>

          {/* Cross-Screen Interaction Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-[10px] text-[#0055FF] font-bold">FLOW 01</span>
              <div className="font-bold text-neutral-900">Home → Spending</div>
              <p className="text-[11px] text-neutral-600 font-sans">Tap spending card on Home to jump directly into monthly analytics.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="text-[10px] text-[#0055FF] font-bold">FLOW 02</span>
              <div className="font-bold text-neutral-900">Spending → Ask Nudge Why</div>
              <p className="text-[11px] text-neutral-600 font-sans">Tap anomaly pill in spending to launch AI chat preloaded with food context.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] text-emerald-800 font-bold">FLOW 03</span>
              <div className="font-bold text-neutral-900">AI Chat → Goal Action</div>
              <p className="text-[11px] text-neutral-600 font-sans">Tap 'Try saving ₹2,400' to commit funds directly into the Tokyo Piggy Vault.</p>
            </div>
          </div>

          {/* Prototype-Only Screen Switcher Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
            <span className="font-bold font-mono text-[11px] uppercase tracking-wider block">
              Design Architecture Note: Screen Switcher Dropdowns
            </span>
            <p className="leading-relaxed">
              The floating dropdown above each small screen and the header controls are <strong>presentation & prototyping conveniences</strong> designed to help design evaluators inspect and compare all screens simultaneously. They do not replace the intentional 4-tab mobile navigation bar.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          15 — DESIGN SYSTEM
          ================================================== */}
      <section id="section-15" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="15" 
          title="Design System" 
          category="Tokens, Visual Hierarchy & Craft"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Typography & Spacing */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#0055FF]">01 · TYPOGRAPHY</span>
            <h4 className="text-sm font-bold text-neutral-900">Inter + JetBrains Mono</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Financial numbers utilize tabular monospace typography to maintain vertical alignment and immediate scannability. Hierarchy is established through scale and weight, not random coloring.
            </p>
          </div>

          {/* Restrained Palette */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#0055FF]">02 · COLOR PALETTE</span>
            <h4 className="text-sm font-bold text-neutral-900">Calm Slate & Royal Blue</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Semantic colors (emerald for positive inflow, rose for critical alerts, royal blue `#0055FF` for interactive AI) are reserved strictly for moments requiring user attention.
            </p>
          </div>

          {/* Iconography & Cards */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
            <span className="text-xs font-mono font-bold text-[#0055FF]">03 · CARDS & ICONOGRAPHY</span>
            <h4 className="text-sm font-bold text-neutral-900">Lucide Vector System</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Consistent 20px / 16px Lucide vector stroke weights across all screens. Cards are used only to group relational context, avoiding visual container bloat.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          16 — END-TO-END EXPERIENCE
          ================================================== */}
      <section id="section-16" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="16" 
          title="End-to-End Experience" 
          category="The Unified System"
        />

        <div className="space-y-6">
          <blockquote className="p-6 rounded-2xl bg-neutral-900 text-white shadow-md text-lg font-medium italic">
            “The strongest part of Nudge is not any individual screen. It is the seamless connection between the screens.”
          </blockquote>

          {/* Large Horizontal Story */}
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold">PHASE 1</span>
                <h5 className="text-xs font-bold text-neutral-900">NOTICE</h5>
                <p className="text-[11px] text-neutral-600">Home flags anomalous food burn rate.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold">PHASE 2</span>
                <h5 className="text-xs font-bold text-neutral-900">INVESTIGATE</h5>
                <p className="text-[11px] text-neutral-600">Spending screen displays category distribution.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-[10px] font-mono text-[#0055FF] font-bold">PHASE 3</span>
                <h5 className="text-xs font-bold text-neutral-900">ASK</h5>
                <p className="text-[11px] text-neutral-600">User taps 'Ask Nudge why' to inquire naturally.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-[10px] font-mono text-indigo-700 font-bold">PHASE 4</span>
                <h5 className="text-xs font-bold text-neutral-900">UNDERSTAND</h5>
                <p className="text-[11px] text-neutral-600">AI renders inline chart proving delivery causes 43%.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-[10px] font-mono text-emerald-700 font-bold">PHASE 5</span>
                <h5 className="text-xs font-bold text-neutral-900">DECIDE</h5>
                <p className="text-[11px] text-neutral-600">User agrees to cap delivery orders at 2/week.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-100/80 border border-emerald-300 space-y-1">
                <span className="text-[10px] font-mono text-emerald-800 font-bold">PHASE 6</span>
                <h5 className="text-xs font-bold text-neutral-900">ACT</h5>
                <p className="text-[11px] text-neutral-700 font-semibold">₹2,400 saved automatically routes to Tokyo fund.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          17 — KEY PRODUCT DECISIONS
          ================================================== */}
      <section id="section-17" className="space-y-8 scroll-mt-28">
        <SectionHeader 
          number="017" 
          title="Key Product Decisions" 
          category="Strategic Rationale"
          description="8 fundamental architectural decisions and the explicit product reasoning behind each."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              num: "01",
              title: "Designed Home as an orientation layer rather than a raw dashboard",
              why: "Users open apps multiple times daily. Showing complex graphs immediately causes cognitive exhaustion. Home gives immediate bearings in 3 seconds."
            },
            {
              num: "02",
              title: "Made Spending focused on understanding behaviour, not just transactions",
              why: "Knowing you spent ₹240 at Starbucks is trivia; knowing dining grew 24% and consumed 35% of income is actionable intelligence."
            },
            {
              num: "03",
              title: "Connected Spending directly to AI through 'Ask Nudge Why'",
              why: "Passive analytics create dead ends. Bridging charts directly into conversational diagnosis solves user curiosity when intent is highest."
            },
            {
              num: "04",
              title: "Designed AI around progressive discovery rather than long answers",
              why: "People do not read 400-word LLM essays on mobile screens. Micro-turns with interactive options mirror natural human dialogue."
            },
            {
              num: "05",
              title: "Used interactive visualizations as part of the conversation",
              why: "Financial trust requires verification. An inline chart allows users to visually validate the AI's claims."
            },
            {
              num: "06",
              title: "Made Voice another modality of the same assistant",
              why: "Voice shouldn't be a siloed sub-app. It accesses the same underlying reasoning layer for hands-free queries on the go."
            },
            {
              num: "07",
              title: "Connected insights to Goals so understanding can lead to action",
              why: "Knowing you overspent on food changes nothing unless that insight is converted directly into automated savings."
            },
            {
              num: "08",
              title: "Kept the UI visually calm because finance already carries high cognitive load",
              why: "Money is inherently stressful. A restrained palette with generous whitespace keeps users calm and confident."
            }
          ].map((decision) => (
            <div key={decision.num} className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0055FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                  Decision {decision.num}
                </span>
                <h4 className="text-xs font-bold text-neutral-900">{decision.title}</h4>
              </div>
              <div className="text-[12px] text-neutral-600 leading-relaxed pl-1 pt-1">
                <strong className="text-neutral-800 font-mono text-[10px] uppercase tracking-wider block text-neutral-500">
                  Why this decision was made:
                </strong>
                {decision.why}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          18 — FINAL TAKEAWAY
          ================================================== */}
      <section id="section-18" className="space-y-8 scroll-mt-28 pb-16">
        <SectionHeader 
          number="18" 
          title="Final Takeaway" 
          category="Conclusion & Product Vision"
        />

        <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white shadow-xl relative overflow-hidden space-y-8">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#0055FF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-mono text-[#0055FF] uppercase font-bold tracking-widest bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
              The Nudge Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              “Nudge Money doesn't just show users what happened to their money. It helps them understand why, explore the evidence, and decide what to do next.”
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10 pt-4 font-mono text-xs text-center">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="block text-[#38BDF8] font-bold">SEE</span>
              <span className="text-neutral-300 text-[11px]">Financial Position</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="block text-[#38BDF8] font-bold">UNDERSTAND</span>
              <span className="text-neutral-300 text-[11px]">Causal Drivers</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="block text-[#38BDF8] font-bold">EXPLORE</span>
              <span className="text-neutral-300 text-[11px]">Visual Evidence</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 border border-white/15">
              <span className="block text-emerald-400 font-bold">ACT</span>
              <span className="text-neutral-300 text-[11px]">Goal Progress</span>
            </div>
          </div>
        </div>

        {/* Finish with the Three Strongest Screens */}
        <div className="pt-6 space-y-3">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
            The Shipped Trifecta: Home · Spending · Nudge AI
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Home Screen</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <HomeScreen onNavigateToInsights={() => {}} onOpenDrilldown={() => {}} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Spending Analytics</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <SpendingScreen onOpenDrilldown={() => {}} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-[#F4F5F7] p-2 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-600 font-semibold px-2 py-1 block">Nudge AI Assistant</span>
              <div className="h-[460px] rounded-2xl overflow-hidden border border-neutral-200 bg-white">
                <div className="scale-[0.56] origin-top-left w-[178%] h-[178%] pointer-events-none">
                  <AIAssistantScreen onOpenDrilldown={() => {}} onBack={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drilldown Modal instance if needed */}
      <AIDrilldownModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
