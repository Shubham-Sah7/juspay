"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DailyPoint {
  day: string
  dateLabel: string
  amount: number
  x: number // percentage 0-100
  y: number // svg coordinate
}

const periodChartData: Record<"day" | "week" | "month" | "year", {
  header: string
  stat: string
  sublabel: string
  startLabel: string
  midLabel: string
  endLabel: string
  points: DailyPoint[]
  defaultIndex: number
}> = {
  day: {
    header: "September 14, 2025",
    stat: "₹650",
    sublabel: "Peak at 1 PM",
    startLabel: "9 AM",
    midLabel: "1 PM",
    endLabel: "9 PM",
    defaultIndex: 2,
    points: [
      { day: "9 AM", dateLabel: "Sep 14, 9:00 AM", amount: 180, x: 5, y: 65 },
      { day: "11 AM", dateLabel: "Sep 14, 11:30 AM", amount: 420, x: 25, y: 45 },
      { day: "1 PM", dateLabel: "Sep 14, 1:15 PM", amount: 650, x: 50, y: 18 },
      { day: "4 PM", dateLabel: "Sep 14, 4:00 PM", amount: 240, x: 68, y: 60 },
      { day: "7 PM", dateLabel: "Sep 14, 7:30 PM", amount: 560, x: 82, y: 35 },
      { day: "9 PM", dateLabel: "Sep 14, 9:00 PM", amount: 400, x: 95, y: 48 },
    ]
  },
  week: {
    header: "Sep 8 – 14, 2025",
    stat: "₹3,400",
    sublabel: "Peak on Friday",
    startLabel: "Mon",
    midLabel: "Thu",
    endLabel: "Sun",
    defaultIndex: 4,
    points: [
      { day: "Mon", dateLabel: "Sep 8, 2025", amount: 1200, x: 5, y: 55 },
      { day: "Tue", dateLabel: "Sep 9, 2025", amount: 850, x: 20, y: 65 },
      { day: "Wed", dateLabel: "Sep 10, 2025", amount: 2100, x: 35, y: 38 },
      { day: "Thu", dateLabel: "Sep 11, 2025", amount: 1450, x: 50, y: 50 },
      { day: "Fri", dateLabel: "Sep 12, 2025", amount: 3400, x: 65, y: 15 },
      { day: "Sat", dateLabel: "Sep 13, 2025", amount: 2650, x: 80, y: 28 },
      { day: "Sun", dateLabel: "Sep 14, 2025", amount: 1200, x: 95, y: 55 },
    ]
  },
  month: {
    header: "September, 2025",
    stat: "₹6,850",
    sublabel: "Spent on Sep 7",
    startLabel: "Sep 1",
    midLabel: "Sep 7",
    endLabel: "Sep 15",
    defaultIndex: 6,
    points: [
      { day: "Sep 1", dateLabel: "Sep 1, 2025", amount: 1250, x: 2, y: 45 },
      { day: "Sep 2", dateLabel: "Sep 2, 2025", amount: 480, x: 10, y: 70 },
      { day: "Sep 3", dateLabel: "Sep 3, 2025", amount: 3200, x: 18, y: 25 },
      { day: "Sep 4", dateLabel: "Sep 4, 2025", amount: 1100, x: 25, y: 60 },
      { day: "Sep 5", dateLabel: "Sep 5, 2025", amount: 2100, x: 33, y: 40 },
      { day: "Sep 6", dateLabel: "Sep 6, 2025", amount: 890, x: 42, y: 65 },
      { day: "Sep 7", dateLabel: "Sep 7, 2025", amount: 6850, x: 50, y: 15 },
      { day: "Sep 8", dateLabel: "Sep 8, 2025", amount: 1420, x: 58, y: 55 },
      { day: "Sep 9", dateLabel: "Sep 9, 2025", amount: 3900, x: 66, y: 30 },
      { day: "Sep 10", dateLabel: "Sep 10, 2025", amount: 650, x: 74, y: 72 },
      { day: "Sep 11", dateLabel: "Sep 11, 2025", amount: 4800, x: 82, y: 20 },
      { day: "Sep 12", dateLabel: "Sep 12, 2025", amount: 950, x: 90, y: 68 },
      { day: "Sep 15", dateLabel: "Sep 15, 2025", amount: 2400, x: 98, y: 35 },
    ]
  },
  year: {
    header: "Year 2025",
    stat: "₹62,000",
    sublabel: "Peak in July",
    startLabel: "Jan",
    midLabel: "May",
    endLabel: "Sep",
    defaultIndex: 6,
    points: [
      { day: "Jan", dateLabel: "January 2025", amount: 48000, x: 5, y: 42 },
      { day: "Feb", dateLabel: "February 2025", amount: 42000, x: 17, y: 55 },
      { day: "Mar", dateLabel: "March 2025", amount: 55000, x: 29, y: 30 },
      { day: "Apr", dateLabel: "April 2025", amount: 46000, x: 40, y: 48 },
      { day: "May", dateLabel: "May 2025", amount: 58000, x: 52, y: 25 },
      { day: "Jun", dateLabel: "June 2025", amount: 51000, x: 63, y: 38 },
      { day: "Jul", dateLabel: "July 2025", amount: 62000, x: 75, y: 15 },
      { day: "Aug", dateLabel: "August 2025", amount: 52400, x: 86, y: 35 },
      { day: "Sep", dateLabel: "September 2025", amount: 49000, x: 96, y: 40 },
    ]
  }
}

interface DailySpendingChartProps {
  period?: "day" | "week" | "month" | "year"
}

export function DailySpendingChart({ period = "month" }: DailySpendingChartProps) {
  const current = periodChartData[period] || periodChartData.month
  const points = current.points

  const [activeIndex, setActiveIndex] = useState<number>(current.defaultIndex)
  const safeIndex = Math.min(activeIndex, points.length - 1)
  const activePoint = points[safeIndex] || points[0]

  // Generate SVG path string
  const svgPath = points.reduce((acc, pt, i) => {
    return `${acc} ${i === 0 ? "M" : "L"} ${pt.x * 3.4} ${pt.y}`
  }, "")

  const firstX = points[0]?.x ?? 2
  const lastX = points[points.length - 1]?.x ?? 98
  const svgAreaPath = `${svgPath} L ${lastX * 3.4} 80 L ${firstX * 3.4} 80 Z`

  return (
    <div className="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-3.5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -right-8 -top-8 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Date Header & Selector */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 border border-blue-500/20">
              📅 {current.header}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black tracking-tight text-neutral-950 font-sans">
              ₹{activePoint.amount.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-neutral-500">
              {activePoint.day ? `on ${activePoint.day}` : current.sublabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            className="w-8.5 h-8.5 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Previous point"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => Math.min(points.length - 1, prev + 1))}
            className="w-8.5 h-8.5 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Next point"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* SVG Daily Spending Line Chart matching Reference Image */}
      <div className="relative pt-6 pb-2 h-44 w-full select-none">
        {/* Active Vertical Column Highlight */}
        <div 
          className="absolute top-0 bottom-6 w-8 bg-blue-500/10 rounded-xl pointer-events-none transition-all duration-200 -translate-x-1/2"
          style={{ left: `${activePoint.x}%` }}
        />

        {/* Floating Dark Tooltip matching Homepage styling */}
        <motion.div 
          layout
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute z-30 bg-neutral-950 text-white px-3 py-1.5 rounded-xl shadow-xl border border-white/20 flex flex-col pointer-events-none -translate-x-1/2 whitespace-nowrap"
          style={{ 
            left: `${activePoint.x}%`, 
            top: `${Math.max(activePoint.y - 45, 0)}px` 
          }}
        >
          <span className="text-xs font-bold text-white">₹{activePoint.amount.toLocaleString()}</span>
          <span className="text-[10px] font-medium text-neutral-400">{activePoint.dateLabel}</span>
        </motion.div>

        {/* SVG Line Chart */}
        <svg className="w-full h-28 overflow-visible" viewBox="0 0 340 80">
          <defs>
            <linearGradient id="chart-blue-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
              <stop offset="80%" stopColor="#2563EB" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Gradient Area Fill */}
          <path d={svgAreaPath} fill="url(#chart-blue-gradient)" />

          {/* Solid Vector Line Path */}
          <motion.path 
            key={`${period}-${points.length}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            d={svgPath} 
            fill="none" 
            stroke="#2563EB" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Vertical Dashed Guide Line passing through active node */}
          <line 
            x1={activePoint.x * 3.4} 
            y1={0} 
            x2={activePoint.x * 3.4} 
            y2={80} 
            stroke="#2563EB" 
            strokeWidth="1.5" 
            strokeDasharray="3 3" 
          />

          {/* Active Dot Cursor with halo */}
          <circle 
            cx={activePoint.x * 3.4} 
            cy={activePoint.y} 
            r="6" 
            fill="#2563EB" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
            className="filter drop-shadow-md"
          />

          {/* Clickable Overlay Hit Areas for all points */}
          {points.map((pt, index) => (
            <circle
              key={`${pt.day}-${index}`}
              cx={pt.x * 3.4}
              cy={pt.y}
              r="14"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </svg>

        {/* X-Axis Date Labels */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400 pt-2 px-1">
          <span className={activeIndex === 0 ? "text-[#2563EB] font-bold" : ""}>{current.startLabel}</span>
          <span className={activeIndex === Math.floor(points.length / 2) ? "px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] font-bold border border-blue-100" : ""}>{current.midLabel}</span>
          <span className={activeIndex === points.length - 1 ? "text-[#2563EB] font-bold" : ""}>{current.endLabel}</span>
        </div>
      </div>

      {/* Bottom Outlined Insight Chips matching Homepage */}
      <div className="flex items-center flex-wrap gap-2 pt-1 border-t border-neutral-100 relative z-10">
        <span className="text-[11px] font-medium px-3 py-1 rounded-full border border-neutral-900/15 bg-neutral-900/5 text-neutral-800">
          📊 Avg ₹2,240/day
        </span>
        <span className="text-[11px] font-medium px-3 py-1 rounded-full border border-neutral-900/15 bg-neutral-900/5 text-neutral-800">
          ⚡️ Sep 7 Peak (₹6,850)
        </span>
        <span className="text-[11px] font-medium px-3 py-1 rounded-full border border-neutral-900/15 bg-neutral-900/5 text-neutral-800">
          🎯 On Budget
        </span>
      </div>
    </div>
  )
}
