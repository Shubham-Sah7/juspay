"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Bike, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  Award
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AIDrilldownModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIDrilldownModal({ isOpen, onClose }: AIDrilldownModalProps) {
  const [budgetActivated, setBudgetActivated] = useState(false)
  const [ordersToCut, setOrdersToCut] = useState(2)

  const monthlySavings = ordersToCut * 300 * 4

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal Sheet */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 bg-white rounded-t-2xl p-5 space-y-4 max-h-[90%] overflow-y-auto no-scrollbar shadow-xl border-t border-neutral-200"
          >
            {/* Modal Close Button */}
            <div className="flex items-center justify-between pb-1">
              <div className="w-10 h-1 rounded-full bg-neutral-200 mx-auto -mr-5" />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-full bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition"
              >
                <X className="w-4 h-4 stroke-[1.75]" />
              </motion.button>
            </div>

            {/* Gen-Z Card Styled Exactly Like Image 1 / Image 3 */}
            <div className="p-5 rounded-[24px] bg-[#F95738] text-white shadow-[0_10px_28px_rgba(249,87,56,0.35)] border border-white/25">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight">Food & Dining</h2>
                    <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
                      ↑ 24%
                    </span>
                  </div>
                  <p className="text-xs text-white/85 font-normal mt-1">Delivery is driving it (+₹3,600 vs July).</p>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black tracking-tight font-sans">₹18,400</span>
                  <span className="text-[11px] text-white/80 block mt-0.5">35% of spend</span>
                </div>
              </div>

              {/* Sub-pills from Image 1 */}
              <div className="flex items-center flex-wrap gap-2 mt-3.5">
                <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-white/35 bg-white/10 text-white">
                  18 delivery orders
                </span>
                <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-white/35 bg-white/10 text-white">
                  ₹733 avg order
                </span>
                <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-white/35 bg-white/10 text-white">
                  Swiggy & Zomato
                </span>
              </div>
            </div>

            {/* Evidence Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col justify-between">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Delivery Orders</span>
                <div className="my-1">
                  <span className="text-lg font-bold font-sans text-neutral-900">18 orders</span>
                  <span className="text-[10px] font-semibold text-rose-600 block mt-0.5">+8 vs July 🛵</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex flex-col justify-between">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Average Order</span>
                <div className="my-1">
                  <span className="text-lg font-bold font-sans text-neutral-900">₹733</span>
                  <span className="text-[10px] font-normal text-neutral-400 block mt-0.5">per delivery order</span>
                </div>
              </div>
            </div>

            {/* 3-Month Bar Comparison */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-2">
              <span className="text-[10px] font-semibold uppercase text-neutral-400 tracking-wider block">
                3-Month Food Trend
              </span>

              <div className="flex items-end justify-between gap-3 h-20 pt-2">
                <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-sans font-medium text-neutral-500">₹12.5k</span>
                  <div className="w-full bg-neutral-200 rounded-t-md h-[60%]" />
                  <span className="text-[10px] font-sans text-neutral-400">Jun</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-sans font-medium text-neutral-500">₹14.8k</span>
                  <div className="w-full bg-neutral-200 rounded-t-md h-[75%]" />
                  <span className="text-[10px] font-sans text-neutral-400">Jul</span>
                </div>
                <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-sans font-bold text-rose-600">₹18.4k</span>
                  <div className="w-full bg-[#F95738] rounded-t-md h-[100%]" />
                  <span className="text-[10px] font-sans font-semibold text-neutral-900">Aug</span>
                </div>
              </div>
            </div>

            {/* Subcategory Outflows */}
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase text-neutral-400 tracking-wider block">
                Category Split
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-rose-500 stroke-[1.75]" />
                    <span className="font-medium text-neutral-800">Delivery</span>
                  </div>
                  <span className="font-mono font-semibold text-neutral-900">71.7%</span>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-500 stroke-[1.75]" />
                    <span className="font-medium text-neutral-800">Dining</span>
                  </div>
                  <span className="font-mono font-semibold text-neutral-900">20.7%</span>
                </div>

                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-500 stroke-[1.75]" />
                    <span className="font-medium text-neutral-800">Groceries</span>
                  </div>
                  <span className="font-mono font-semibold text-neutral-900">7.6%</span>
                </div>
              </div>
            </div>

            {/* Actionable Savings Box */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-900">Save ₹{monthlySavings.toLocaleString()}/mo</span>
                <span className="text-xs font-medium text-emerald-700">Cut {ordersToCut} delivery orders/wk</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-neutral-500 font-normal">Target cut:</span>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setOrdersToCut(num)}
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium font-mono transition cursor-pointer",
                      ordersToCut === num ? "bg-emerald-600 text-white" : "bg-white text-neutral-700 border border-neutral-200"
                    )}
                  >
                    -{num}/wk
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            {!budgetActivated ? (
              <button
                onClick={() => setBudgetActivated(true)}
                className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-neutral-800 text-white font-medium text-xs tracking-wide shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 stroke-[1.75]" />
                <span>Set Food Budget (₹16,000/mo)</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-600 text-white text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-medium">
                  <Award className="w-4 h-4" />
                  <span>Food Budget Activated!</span>
                </div>
                <p className="text-[11px] opacity-90 font-normal">
                  Set to ₹16,000/mo. Nudge will alert you after 2 deliveries a week.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
