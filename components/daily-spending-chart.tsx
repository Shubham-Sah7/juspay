"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  BarChart3, 
  Zap, 
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DailyPoint {
  day: string
  dateLabel: string
  amount: number
  x: number // percentage 0-100
  y: number // svg coordinate
  category?: string
  isPeak?: boolean
}

const periodChartData: Record<"day" | "week" | "month" | "year", {
  header: string
  stat: string
  sublabel: string
  startLabel: string
  midLabel: string
  endLabel: string
  avgAmount: string
  peakDay: string
  points: DailyPoint[]
  defaultIndex: number
}> = {
  day: {
    header: "September 14, 2026",
    stat: "₹650",
    sublabel: "Peak at 1 PM",
    startLabel: "9 AM",
    midLabel: "1 PM",
    endLabel: "9 PM",
    avgAmount: "₹410",
    peakDay: "1 PM",
    defaultIndex: 2,
    points: [
      { day: "9 AM", dateLabel: "Sep 14, 9:00 AM", amount: 180, x: 5, y: 65, category: "Morning Coffee" },
      { day: "11 AM", dateLabel: "Sep 14, 11:30 AM", amount: 420, x: 25, y: 45, category: "Quick Transit" },
      { day: "1 PM", dateLabel: "Sep 14, 1:15 PM", amount: 650, x: 50, y: 18, category: "Team Lunch", isPeak: true },
      { day: "4 PM", dateLabel: "Sep 14, 4:00 PM", amount: 240, x: 68, y: 60, category: "Snacks" },
      { day: "7 PM", dateLabel: "Sep 14, 7:30 PM", amount: 560, x: 82, y: 35, category: "Dinner Pickup" },
      { day: "9 PM", dateLabel: "Sep 14, 9:00 PM", amount: 400, x: 95, y: 48, category: "Late Groceries" },
    ]
  },
  week: {
    header: "Sep 8 – 14, 2026",
    stat: "₹3,400",
    sublabel: "Peak on Friday",
    startLabel: "Mon",
    midLabel: "Thu",
    endLabel: "Sun",
    avgAmount: "₹1,835",
    peakDay: "Fri",
    defaultIndex: 4,
    points: [
      { day: "Mon", dateLabel: "Sep 8, 2026", amount: 1200, x: 5, y: 55, category: "Work Commute" },
      { day: "Tue", dateLabel: "Sep 9, 2026", amount: 850, x: 20, y: 65, category: "Lunch Out" },
      { day: "Wed", dateLabel: "Sep 10, 2026", amount: 2100, x: 35, y: 38, category: "Supermarket" },
      { day: "Thu", dateLabel: "Sep 11, 2026", amount: 1450, x: 50, y: 50, category: "Books & Station" },
      { day: "Fri", dateLabel: "Sep 12, 2026", amount: 3400, x: 65, y: 15, category: "Dinner & Movie", isPeak: true },
      { day: "Sat", dateLabel: "Sep 13, 2026", amount: 2650, x: 80, y: 28, category: "Weekend Shopping" },
      { day: "Sun", dateLabel: "Sep 14, 2026", amount: 1200, x: 95, y: 55, category: "Cafe & Leisure" },
    ]
  },
  month: {
    header: "SEPTEMBER, 2026",
    stat: "₹6,850",
    sublabel: "on Sep 7",
    startLabel: "Sep 1",
    midLabel: "Sep 7",
    endLabel: "Sep 15",
    avgAmount: "₹2,240",
    peakDay: "Sep 7",
    defaultIndex: 6,
    points: [
      { day: "Sep 1", dateLabel: "Sep 1, 2026", amount: 1250, x: 3, y: 52, category: "Coffee & Pantry" },
      { day: "Sep 2", dateLabel: "Sep 2, 2026", amount: 680, x: 11, y: 68, category: "Metro Pass" },
      { day: "Sep 3", dateLabel: "Sep 3, 2026", amount: 3200, x: 19, y: 34, category: "Dining Out" },
      { day: "Sep 4", dateLabel: "Sep 4, 2026", amount: 1400, x: 27, y: 58, category: "Quick Delivery" },
      { day: "Sep 5", dateLabel: "Sep 5, 2026", amount: 2600, x: 35, y: 44, category: "Clothing Item" },
      { day: "Sep 6", dateLabel: "Sep 6, 2026", amount: 1100, x: 42, y: 64, category: "Bakery & Treats" },
      { day: "Sep 7", dateLabel: "Sep 7, 2026", amount: 6850, x: 50, y: 16, category: "Weekend Dining & Tech", isPeak: true },
      { day: "Sep 8", dateLabel: "Sep 8, 2026", amount: 1850, x: 58, y: 54, category: "Subscriptions" },
      { day: "Sep 9", dateLabel: "Sep 9, 2026", amount: 3900, x: 66, y: 30, category: "Weekly Groceries" },
      { day: "Sep 10", dateLabel: "Sep 10, 2026", amount: 850, x: 74, y: 66, category: "Pharmacy & Care" },
      { day: "Sep 11", dateLabel: "Sep 11, 2026", amount: 4800, x: 82, y: 22, category: "Electronics Accessory" },
      { day: "Sep 12", dateLabel: "Sep 12, 2026", amount: 1200, x: 90, y: 62, category: "Food Delivery" },
      { day: "Sep 15", dateLabel: "Sep 15, 2026", amount: 2400, x: 97, y: 46, category: "Fuel & Travel" },
    ]
  },
  year: {
    header: "Year 2026",
    stat: "₹62,000",
    sublabel: "Peak in July",
    startLabel: "Jan",
    midLabel: "May",
    endLabel: "Sep",
    avgAmount: "₹51,400",
    peakDay: "Jul",
    defaultIndex: 6,
    points: [
      { day: "Jan", dateLabel: "January 2026", amount: 48000, x: 5, y: 42, category: "New Year Trip" },
      { day: "Feb", dateLabel: "February 2026", amount: 42000, x: 17, y: 55, category: "Routine Spends" },
      { day: "Mar", dateLabel: "March 2026", amount: 55000, x: 29, y: 30, category: "Tax & Insurance" },
      { day: "Apr", dateLabel: "April 2026", amount: 46000, x: 40, y: 48, category: "Spring Setup" },
      { day: "May", dateLabel: "May 2026", amount: 58000, x: 52, y: 25, category: "Gadgets Upgrade" },
      { day: "Jun", dateLabel: "June 2026", amount: 51000, x: 63, y: 38, category: "Summer Outings" },
      { day: "Jul", dateLabel: "July 2026", amount: 62000, x: 75, y: 15, category: "Annual Vacation", isPeak: true },
      { day: "Aug", dateLabel: "August 2026", amount: 52400, x: 86, y: 35, category: "Festive Prep" },
      { day: "Sep", dateLabel: "September 2026", amount: 49000, x: 96, y: 40, category: "Mid-Year Savings" },
    ]
  }
}

// Catmull-Rom cubic Bézier curve helper for smooth fintech line chart
function getSmoothSplinePath(pts: { x: number; y: number }[], scaleX = 3.4): string {
  if (!pts || pts.length === 0) return ""
  const scaledPts = pts.map(p => ({ x: p.x * scaleX, y: p.y }))
  if (scaledPts.length === 1) return `M ${scaledPts[0].x} ${scaledPts[0].y}`
  
  let d = `M ${scaledPts[0].x.toFixed(1)} ${scaledPts[0].y.toFixed(1)}`
  for (let i = 0; i < scaledPts.length - 1; i++) {
    const p0 = i > 0 ? scaledPts[i - 1] : scaledPts[i]
    const p1 = scaledPts[i]
    const p2 = scaledPts[i + 1]
    const p3 = i < scaledPts.length - 2 ? scaledPts[i + 2] : p2

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

interface DailySpendingChartProps {
  period?: "day" | "week" | "month" | "year"
}

export function DailySpendingChart({ period = "month" }: DailySpendingChartProps) {
  const current = periodChartData[period] || periodChartData.month
  const points = current.points

  const [activeIndex, setActiveIndex] = useState<number>(current.defaultIndex)
  const [showAvgLine, setShowAvgLine] = useState<boolean>(false)

  const safeIndex = Math.min(activeIndex, points.length - 1)
  const activePoint = points[safeIndex] || points[0]

  // Generate smooth cubic Bézier vector curve
  const splinePath = getSmoothSplinePath(points, 3.4)
  const firstX = (points[0]?.x ?? 2) * 3.4
  const lastX = (points[points.length - 1]?.x ?? 98) * 3.4
  const bottomY = 88
  const svgAreaPath = `${splinePath} L ${lastX.toFixed(1)} ${bottomY} L ${firstX.toFixed(1)} ${bottomY} Z`

  // Average reference position
  const avgY = 48

  return (
    <div className="p-5 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(0,0,0,0.04)] space-y-4 relative overflow-hidden">
      {/* Subtle top-right ambient glow */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Date Header & Navigation Controls */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          {/* Refined Calendar Icon Pill Badge */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#2563EB] border border-blue-500/20 text-[10px] font-bold tracking-wider uppercase">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB] stroke-[2.2]" />
              <span>{current.header}</span>
            </span>
          </div>

          {/* Amount & Active Label */}
          <div className="flex items-baseline gap-2">
            <motion.span 
              key={activePoint.amount}
              initial={{ opacity: 0.8, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black tracking-tight text-neutral-950 font-sans"
            >
              ₹{activePoint.amount.toLocaleString("en-IN")}
            </motion.span>
            <span className="text-xs font-semibold text-neutral-500">
              {activePoint.day ? `on ${activePoint.day}` : current.sublabel}
            </span>
          </div>
        </div>

        {/* Refined Tactile Chevron Buttons */}
        <div className="flex items-center gap-1.5">
          <motion.button 
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className={cn(
              "w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all shadow-xs",
              activeIndex === 0 
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200" 
                : "bg-[#111827] text-white hover:bg-black border border-white/10 cursor-pointer shadow-sm"
            )}
            title="Previous data point"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveIndex((prev) => Math.min(points.length - 1, prev + 1))}
            disabled={activeIndex === points.length - 1}
            className={cn(
              "w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all shadow-xs",
              activeIndex === points.length - 1 
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200" 
                : "bg-[#111827] text-white hover:bg-black border border-white/10 cursor-pointer shadow-sm"
            )}
            title="Next data point"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>

      {/* Smooth Vector Spending Line Chart */}
      <div className="relative pt-8 pb-2 h-44 w-full select-none">
        {/* Luminous Active Column Highlight */}
        <div 
          className="absolute top-0 bottom-6 w-9 bg-gradient-to-b from-blue-500/15 via-blue-500/5 to-transparent rounded-2xl pointer-events-none transition-all duration-200 -translate-x-1/2"
          style={{ left: `${activePoint.x}%` }}
        />

        {/* Floating Dark Tooltip Card with Downward Pointer */}
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="absolute z-30 bg-[#0F172A] text-white px-3 py-1.5 rounded-xl shadow-xl border border-white/15 flex flex-col pointer-events-none -translate-x-1/2 whitespace-nowrap"
          style={{ 
            left: `${activePoint.x}%`, 
            top: `${Math.max(activePoint.y - 48, -4)}px` 
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black font-sans text-white">
              ₹{activePoint.amount.toLocaleString("en-IN")}
            </span>
            {activePoint.isPeak && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                PEAK
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-neutral-300">
            {activePoint.dateLabel}
          </span>
          {/* Tooltip Downward Pointer Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0F172A] rotate-45 border-r border-b border-white/15" />
        </motion.div>

        {/* SVG Spline Canvas */}
        <svg className="w-full h-28 overflow-visible" viewBox="0 0 340 88">
          <defs>
            <linearGradient id="chart-blue-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.30" />
              <stop offset="60%" stopColor="#2563EB" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
            <filter id="chart-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563EB" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Smooth Gradient Area Fill */}
          <path d={svgAreaPath} fill="url(#chart-blue-gradient)" />

          {/* Optional Average Guideline */}
          {showAvgLine && (
            <g>
              <line 
                x1={firstX} 
                y1={avgY} 
                x2={lastX} 
                y2={avgY} 
                stroke="#94A3B8" 
                strokeWidth="1.2" 
                strokeDasharray="4 4" 
                opacity="0.8"
              />
              <text 
                x={lastX - 44} 
                y={avgY - 4} 
                fill="#64748B" 
                fontSize="8.5" 
                fontWeight="700"
              >
                Avg {current.avgAmount}
              </text>
            </g>
          )}

          {/* Smooth Vector Spline Line */}
          <motion.path 
            key={`${period}-${points.length}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            d={splinePath} 
            fill="none" 
            stroke="#2563EB" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#chart-line-glow)"
          />

          {/* Vertical Dashed Guide Line passing through active node */}
          <line 
            x1={activePoint.x * 3.4} 
            y1={activePoint.y} 
            x2={activePoint.x * 3.4} 
            y2={85} 
            stroke="#2563EB" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
            opacity="0.8"
          />

          {/* Pulsing Radar Halo on Active Point */}
          <motion.circle 
            cx={activePoint.x * 3.4} 
            cy={activePoint.y} 
            r="10" 
            fill="#2563EB" 
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: [0.35, 0.05, 0.35], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Active Dot Cursor with Crisp White Halo */}
          <circle 
            cx={activePoint.x * 3.4} 
            cy={activePoint.y} 
            r="5.5" 
            fill="#2563EB" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            className="filter drop-shadow-md"
          />

          {/* Interactive Hit Areas */}
          {points.map((pt, index) => (
            <circle
              key={`${pt.day}-${index}`}
              cx={pt.x * 3.4}
              cy={pt.y}
              r="16"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </svg>

        {/* X-Axis Date Labels with Active Highlight Pill */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 pt-2 px-1">
          <span className={activePoint.day === current.startLabel ? "text-[#2563EB] font-bold" : ""}>
            {current.startLabel}
          </span>
          <span className={cn(
            "text-[11px] font-semibold transition-all px-2.5 py-0.5 rounded-full",
            activePoint.day === current.midLabel 
              ? "bg-blue-100/80 text-[#2563EB] font-bold border border-blue-200/90 shadow-2xs" 
              : "text-neutral-400"
          )}>
            {current.midLabel}
          </span>
          <span className={activePoint.day === current.endLabel ? "text-[#2563EB] font-bold" : ""}>
            {current.endLabel}
          </span>
        </div>
      </div>

      {/* Bottom Outlined Insight Chips with Vector Lucide Icons */}
      <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-neutral-100 relative z-10">
        {/* 1. Average Chip */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAvgLine(!showAvgLine)}
          className={cn(
            "text-[11px] font-semibold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs",
            showAvgLine 
              ? "border-blue-300 bg-blue-50 text-blue-800 ring-2 ring-blue-400/20" 
              : "border-neutral-900/15 bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-800"
          )}
          title="Toggle average reference line"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#2563EB] stroke-[2.2]" />
          <span>Avg {current.avgAmount}/day</span>
        </motion.button>

        {/* 2. Peak Chip (Click to jump to peak) */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            const peakIdx = points.findIndex(p => p.isPeak)
            if (peakIdx !== -1) setActiveIndex(peakIdx)
          }}
          className={cn(
            "text-[11px] font-semibold px-3 py-1 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs",
            activePoint.isPeak 
              ? "border-amber-300 bg-amber-50 text-amber-800 ring-2 ring-amber-400/20" 
              : "border-neutral-900/15 bg-neutral-900/5 hover:bg-amber-50 hover:border-amber-200 text-neutral-800"
          )}
          title="Jump to peak spend"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30 stroke-[2.2]" />
          <span>{current.peakDay} Peak ({current.stat})</span>
        </motion.button>

        {/* 3. On Budget Chip */}
        <div className="text-[11px] font-semibold px-3 py-1 rounded-full border border-neutral-900/15 bg-neutral-900/5 text-neutral-800 flex items-center gap-1.5 shadow-2xs">
          <Target className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
          <span>On Budget</span>
        </div>
      </div>
    </div>
  )
}
