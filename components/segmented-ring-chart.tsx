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
  { id: "food", label: "Food & Dining", percentage: 35, color: "#F95738", amount: "₹18,400" },
  { id: "rent", label: "Rent & Housing", percentage: 29, color: "#2563EB", amount: "₹15,000" },
  { id: "shopping", label: "Shopping & Tech", percentage: 16, color: "#0284C7", amount: "₹8,200" },
  { id: "travel", label: "Travel & Commute", percentage: 12, color: "#8B5CF6", amount: "₹6,450" },
  { id: "subscriptions", label: "Subscriptions", percentage: 8, color: "#F59E0B", amount: "₹4,350" }
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
  title = "Total spent",
  amount = "₹52,400",
  cents,
  trend = "↑ 12% vs last month",
  isPositive = false,
  segments = DEFAULT_SEGMENTS,
  size = 230,
  strokeWidth = 22,
  interactive = true,
  onSegmentClick
}: SegmentedRingChartProps) {
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null)

  const center = size / 2
  const radius = center - strokeWidth / 2 - 8
  const gapDegrees = 10 // Gap between rounded pill ends in degrees

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

  return (
    <div className={cn(
      "relative rounded-[28px] p-5 flex flex-col items-center justify-center select-none transition-colors duration-300 shadow-lg border",
      "bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#EEF2FF] border-blue-200/80 shadow-[0_12px_32px_rgba(37,99,235,0.07)] text-neutral-900"
    )}>
      {/* Top Controls: Header & Month Pill */}
      <div className="w-full flex items-center justify-between pb-2 px-1">
        <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500">
          Spending Distribution
        </span>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#2563EB] border border-blue-200/90 shadow-2xs">
          August 2026
        </span>
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
                <span className="text-xs font-medium block truncate max-w-[140px] text-neutral-600">
                  {activeSegment.label}
                </span>

                <div className="flex items-baseline justify-center">
                  <span className="text-2xl md:text-3xl font-black tracking-tight font-sans text-neutral-950">
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
                <span className="text-xs md:text-sm font-medium block text-neutral-600">
                  {title}
                </span>

                {/* Amount + .00 Cents */}
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl md:text-3xl font-black tracking-tight font-sans text-neutral-950">
                    {amount}
                  </span>
                  {cents && (
                    <span className="text-base md:text-lg font-bold ml-0.5 text-neutral-500">
                      {cents}
                    </span>
                  )}
                </div>

                {/* Trend Metric with Arrow */}
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className={cn(
                    "text-xs font-bold flex items-center gap-0.5",
                    isPositive ? "text-emerald-600" : "text-rose-500"
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
                ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs" 
                : "bg-white/90 border-blue-200/75 text-neutral-700 hover:bg-white shadow-2xs"
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
