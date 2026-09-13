"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface RingSegment {
  id: string
  label: string
  percentage: number
  color: string
  amount?: string
}

interface SegmentedRingChartProps {
  title?: string
  amount?: string
  cents?: string
  trend?: string
  isPositive?: boolean
  segments?: RingSegment[]
  size?: number
  strokeWidth?: number
  theme?: "dark" | "light"
  interactive?: boolean
  onSegmentClick?: (segment: RingSegment) => void
}

const DEFAULT_SEGMENTS: RingSegment[] = [
  { id: "savings", label: "Investments & Liquid", percentage: 38, color: "#A3E635", amount: "₹18,335" },   // Lime Green
  { id: "fixed", label: "Fixed & Housing", percentage: 25, color: "#A5B4FC", amount: "₹12,062" },       // Lavender / Periwinkle
  { id: "recurring", label: "Subscriptions", percentage: 15, color: "#FDE047", amount: "₹7,238" },     // Sunny Yellow
  { id: "expenses", label: "Discretionary & Food", percentage: 22, color: "#FB7185", amount: "₹10,615" } // Coral / Salmon
]

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ")
}

export function SegmentedRingChart({
  title = "Total Savings",
  amount = "₹48,250",
  cents = ".00",
  trend = "+2.5% ↑",
  isPositive = true,
  segments = DEFAULT_SEGMENTS,
  size = 230,
  strokeWidth = 22,
  theme = "light",
  interactive = true,
  onSegmentClick
}: SegmentedRingChartProps) {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null)
  const [cardTheme, setCardTheme] = useState<"dark" | "light">(theme)

  const center = size / 2
  const radius = center - strokeWidth / 2 - 8
  const gapDegrees = 12 // Gap between rounded pill ends in degrees

  // Calculate arc angles
  const totalGapDegrees = segments.length * gapDegrees
  const availableDegrees = 360 - totalGapDegrees

  const arcSegments = segments.map((seg, i) => {
    const prevSpanSum = segments
      .slice(0, i)
      .reduce((sum, s) => sum + (s.percentage / 100) * availableDegrees + gapDegrees, 0)
    const arcSpan = (seg.percentage / 100) * availableDegrees
    const startAngle = prevSpanSum + gapDegrees / 2
    const endAngle = startAngle + arcSpan

    return {
      ...seg,
      path: describeArc(center, center, radius, startAngle, endAngle),
      startAngle,
      endAngle
    }
  })

  const activeSegment = segments.find(s => s.id === activeSegmentId)

  const isDark = cardTheme === "dark"

  return (
    <div className={cn(
      "relative rounded-[28px] p-5 flex flex-col items-center justify-center select-none transition-colors duration-300 shadow-xl border",
      isDark 
        ? "bg-[#0B0E14] text-white border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)]" 
        : "bg-white text-neutral-900 border-neutral-200/80 shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
    )}>
      {/* Top Controls: Subtle Theme Pill & Header */}
      <div className="w-full flex items-center justify-between pb-2 px-1">
        <span className={cn(
          "text-[10px] font-bold tracking-wider uppercase",
          isDark ? "text-neutral-400" : "text-neutral-400"
        )}>
          Financial Distribution
        </span>

        <button
          onClick={() => setCardTheme(isDark ? "light" : "dark")}
          className={cn(
            "text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition cursor-pointer",
            isDark 
              ? "bg-white/10 text-neutral-300 border-white/15 hover:bg-white/20" 
              : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
          )}
        >
          {isDark ? "Dark View" : "Light View"}
        </button>
      </div>

      {/* Center Circular Donut Ring */}
      <div 
        className="relative flex items-center justify-center my-2" 
        style={{ width: size, height: size }}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          {arcSegments.map((arc, index) => {
            const isHovered = activeSegmentId === arc.id
            return (
              <motion.path
                key={arc.id}
                d={arc.path}
                fill="none"
                stroke={arc.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: activeSegmentId && !isHovered ? 0.45 : 1,
                  filter: isHovered ? "drop-shadow(0px 0px 8px rgba(255,255,255,0.4))" : "none"
                }}
                transition={{ 
                  pathLength: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2 },
                  strokeWidth: { duration: 0.2 }
                }}
                onMouseEnter={() => interactive && setActiveSegmentId(arc.id)}
                onMouseLeave={() => interactive && setActiveSegmentId(null)}
                onClick={() => onSegmentClick?.(arc)}
                className="cursor-pointer transition-transform duration-200"
              />
            )
          })}
        </svg>

        {/* Center Typography matching Reference Image 1:1 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <AnimatePresence mode="wait">
            {activeSegment ? (
              <motion.div
                key={activeSegment.id}
                initial={{ opacity: 0, y: 3, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="space-y-0.5"
              >
                <span className={cn(
                  "text-xs font-medium block truncate max-w-[140px]",
                  isDark ? "text-neutral-400" : "text-neutral-500"
                )}>
                  {activeSegment.label}
                </span>

                <div className="flex items-baseline justify-center">
                  <span className={cn(
                    "text-2xl md:text-3xl font-black tracking-tight font-sans",
                    isDark ? "text-white" : "text-neutral-900"
                  )}>
                    {activeSegment.amount || `${activeSegment.percentage}%`}
                  </span>
                </div>

                <span 
                  className="text-xs font-bold font-mono px-2 py-0.5 rounded-full inline-block mt-0.5"
                  style={{ 
                    backgroundColor: `${activeSegment.color}25`, 
                    color: activeSegment.color 
                  }}
                >
                  {activeSegment.percentage}% of total
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default-center"
                initial={{ opacity: 0, y: 3, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -3, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="space-y-0.5"
              >
                {/* Title */}
                <span className={cn(
                  "text-xs md:text-sm font-medium block",
                  isDark ? "text-neutral-400" : "text-neutral-500"
                )}>
                  {title}
                </span>

                {/* Amount + .00 Cents */}
                <div className="flex items-baseline justify-center">
                  <span className={cn(
                    "text-2xl md:text-3xl font-black tracking-tight font-sans",
                    isDark ? "text-white" : "text-neutral-900"
                  )}>
                    {amount}
                  </span>
                  {cents && (
                    <span className={cn(
                      "text-base md:text-lg font-bold ml-0.5",
                      isDark ? "text-neutral-400" : "text-neutral-400"
                    )}>
                      {cents}
                    </span>
                  )}
                </div>

                {/* Trend Metric with Arrow */}
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-0.5",
                    isPositive ? "text-[#34D399]" : "text-rose-500"
                  )}>
                    {trend}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Segment Legend Pill Badges */}
      <div className="w-full flex items-center justify-center flex-wrap gap-2 pt-3">
        {segments.map((seg) => (
          <button
            key={seg.id}
            onMouseEnter={() => interactive && setActiveSegmentId(seg.id)}
            onMouseLeave={() => interactive && setActiveSegmentId(null)}
            onClick={() => onSegmentClick?.(seg)}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-medium transition flex items-center gap-1.5 cursor-pointer border",
              activeSegmentId === seg.id 
                ? (isDark ? "bg-white/20 border-white/30 text-white shadow-xs" : "bg-neutral-900 text-white border-neutral-900 shadow-xs")
                : (isDark ? "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10" : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100")
            )}
          >
            <span 
              className="w-2 h-2 rounded-full shrink-0" 
              style={{ backgroundColor: seg.color }} 
            />
            <span>{seg.label}</span>
            <span className="font-mono text-[10px] opacity-75">{seg.percentage}%</span>
          </button>
        ))}
      </div>
    </div>
  )
}
