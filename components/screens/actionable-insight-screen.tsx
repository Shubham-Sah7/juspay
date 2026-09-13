"use client"

import React, { useState } from "react"
import { 
  Target, 
  Check, 
  PiggyBank, 
  Coins,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Award,
  BellRing
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionableInsightScreenProps {
  onResetFlow: () => void
}

export function ActionableInsightScreen({ onResetFlow }: ActionableInsightScreenProps) {
  const [ordersToCut, setOrdersToCut] = useState<number>(2)
  const [budgetActivated, setBudgetActivated] = useState<boolean>(false)
  const [selectedAction, setSelectedAction] = useState<string>("auto-save")

  const monthlySavings = ordersToCut * 300 * 4
  const yearlySavings = monthlySavings * 12

  const handleActivateBudget = () => {
    setBudgetActivated(true)
  }

  return (
    <div className="p-5 space-y-4 pb-6 select-none">
      {/* Header Banner */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
            <Target className="w-4.5 h-4.5 stroke-[1.75]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-wider block font-medium">
              ACTIONABLE RECOMMENDATION
            </span>
            <h2 className="text-sm font-semibold text-neutral-900 leading-tight">Turn Insight Into Cash</h2>
          </div>
        </div>
        <Badge className="bg-emerald-600 text-white text-xs px-2.5 py-1 font-mono font-medium rounded-md shadow-2xs">
          Step 4 of 4
        </Badge>
      </div>

      {/* Primary AI Recommendation Box */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span>AI Action Plan</span>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full font-mono border border-emerald-200/60">
            High Impact 🎯
          </span>
        </div>

        <p className="text-xs font-normal text-neutral-700 leading-relaxed">
          Cutting <span className="text-emerald-700 font-semibold">{ordersToCut} delivery orders</span> per week saves you <span className="text-emerald-700 font-semibold text-sm font-mono">₹{monthlySavings.toLocaleString()}/mo</span>.
        </p>

        {/* Order Cut Slider */}
        <div className="pt-2 pb-1 space-y-2 bg-neutral-50 p-3 rounded-lg border border-neutral-200/60">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-neutral-600 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 stroke-[1.75]" /> Adjust Target Cut:
            </span>
            <span className="font-mono font-semibold text-emerald-700 text-xs">
              -{ordersToCut} orders/wk
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-neutral-400 font-mono">1/wk</span>
            <input 
              type="range" 
              min="1" 
              max="4" 
              value={ordersToCut}
              onChange={(e) => setOrdersToCut(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400 font-mono">4/wk</span>
          </div>
        </div>
      </div>

      {/* Visual Savings Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Monthly Savings Card */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-500">Monthly Savings</span>
            <Coins className="w-4 h-4 text-emerald-600 stroke-[1.75]" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-semibold font-mono text-emerald-800">
              ₹{monthlySavings.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-800 font-medium mt-0.5">
              +{(monthlySavings / 18400 * 100).toFixed(0)}% back in wallet
            </div>
          </div>
          <div className="text-[10px] text-neutral-500 font-normal">
            ≈ 8 fewer Swiggy runs
          </div>
        </div>

        {/* Annual Projection Card */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-500">Annual Impact</span>
            <PiggyBank className="w-4 h-4 text-blue-600 stroke-[1.75]" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-semibold font-mono text-blue-800">
              ₹{yearlySavings.toLocaleString()}
            </div>
            <div className="text-[10px] text-blue-800 font-medium mt-0.5">
              12-Month Projection
            </div>
          </div>
          <div className="text-[10px] text-blue-700 font-medium flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500 stroke-[1.75]" /> Tokyo Trip Fund!
          </div>
        </div>
      </div>

      {/* Action Options */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-400 block">
          Choose How to Lock It In:
        </span>

        {/* Option 1: Auto-Save Rule */}
        <div 
          onClick={() => setSelectedAction("auto-save")}
          className={cn(
            "p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between bg-white shadow-2xs",
            selectedAction === "auto-save" ? "border-emerald-500" : "border-neutral-200/80 hover:border-neutral-300"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <PiggyBank className="w-4 h-4 stroke-[1.75]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900">Auto-Sweep Saved ₹{monthlySavings.toLocaleString()}</div>
              <div className="text-[10px] font-normal text-neutral-500">Transfer to Tokyo Trip Fund</div>
            </div>
          </div>
          <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedAction === "auto-save" ? "bg-emerald-600 border-emerald-600 text-white" : "border-neutral-300")}>
            {selectedAction === "auto-save" && <Check className="w-3 h-3 stroke-[2.5]" />}
          </div>
        </div>

        {/* Option 2: Nudge Delivery Cap Alert */}
        <div 
          onClick={() => setSelectedAction("cap-alert")}
          className={cn(
            "p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between bg-white shadow-2xs",
            selectedAction === "cap-alert" ? "border-emerald-500" : "border-neutral-200/80 hover:border-neutral-300"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
              <BellRing className="w-4 h-4 stroke-[1.75]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-neutral-900">Activate Smart Delivery Nudge</div>
              <div className="text-[10px] font-normal text-neutral-500">Alert me after 2 deliveries in a week</div>
            </div>
          </div>
          <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", selectedAction === "cap-alert" ? "bg-emerald-600 border-emerald-600 text-white" : "border-neutral-300")}>
            {selectedAction === "cap-alert" && <Check className="w-3 h-3 stroke-[2.5]" />}
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="pt-2">
        {!budgetActivated ? (
          <Button 
            onClick={handleActivateBudget}
            className="w-full h-11 rounded-xl bg-[#0F172A] hover:bg-neutral-800 text-white font-medium text-xs tracking-wide shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[1.75]" />
            <span>Set a Food Budget (₹16,000/mo)</span>
          </Button>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-600 text-white text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-xs">
              <Award className="w-4 h-4" />
              <span>Food Budget Activated! 🚀</span>
            </div>
            <p className="text-xs font-normal opacity-90">
              Your cap is set to <span className="font-mono font-medium">₹16,000/mo</span>. Nudge AI will alert you if you exceed 2 deliveries/week.
            </p>
            <Button 
              variant="outline"
              size="sm"
              onClick={onResetFlow}
              className="mt-1 text-xs rounded-lg border-white/40 text-white hover:bg-white/10 cursor-pointer"
            >
              Back to Overview
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
