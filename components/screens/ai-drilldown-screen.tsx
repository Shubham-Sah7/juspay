"use client"

import React, { useState } from "react"
import { 
  Utensils, 
  ShoppingBag, 
  Bike, 
  Store, 
  ArrowRight,
  Zap,
  Calendar
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AIDrilldownScreenProps {
  onProceedToAction: () => void
}

export function AIDrilldownScreen({ onProceedToAction }: AIDrilldownScreenProps) {
  const [activeTab, setActiveTab] = useState<"delivery" | "dining" | "groceries">("delivery")

  const monthlyComparison = [
    { month: "Jun", amount: 12500, orders: 10, label: "₹12.5k" },
    { month: "Jul", amount: 14800, orders: 10, label: "₹14.8k" },
    { month: "Aug", amount: 18400, orders: 18, label: "₹18.4k", isCurrent: true, increase: "+24%" },
  ]

  const foodSubcategories = [
    {
      id: "delivery",
      name: "Delivery Apps",
      vendor: "Swiggy & Zomato",
      orders: "14 orders",
      amount: "₹7,850",
      share: "42.7%",
      icon: Bike,
      badge: "+5 extra orders 🛵",
      badgeColor: "bg-neutral-100 text-neutral-700 border-neutral-200/60",
      merchants: [
        { name: "Swiggy Delivery", count: "8 orders", total: "₹4,620" },
        { name: "Zomato Orders", count: "6 orders", total: "₹3,230" }
      ]
    },
    {
      id: "dining",
      name: "Dining Out & Cafes",
      vendor: "Restaurants & Coffee",
      orders: "6 visits",
      amount: "₹6,800",
      share: "37.0%",
      icon: Store,
      badge: "Normal",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/60",
      merchants: [
        { name: "Blue Tokai Coffee", count: "4 visits", total: "₹1,800" },
        { name: "Social Bistro", count: "2 visits", total: "₹5,000" }
      ]
    },
    {
      id: "groceries",
      name: "Groceries & Kitchen",
      vendor: "Blinkit & Zepto",
      orders: "6 quick orders",
      amount: "₹3,750",
      share: "20.3%",
      icon: ShoppingBag,
      badge: "Saved ₹600",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
      merchants: [
        { name: "Zepto 10m Delivery", count: "4 orders", total: "₹2,450" },
        { name: "Blinkit Quick", count: "2 orders", total: "₹1,300" }
      ]
    }
  ]

  return (
    <div className="p-5 space-y-4 pb-6 select-none">
      {/* Category Banner Header */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/60 text-neutral-800 flex items-center justify-center shrink-0">
            <Utensils className="w-4.5 h-4.5 stroke-[1.75]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-medium">
              INSIGHT DRILL DOWN
            </span>
            <h2 className="text-sm font-semibold text-neutral-900 leading-tight">Food & Dining Analysis</h2>
          </div>
        </div>
        <Badge className="bg-neutral-900 text-white text-xs px-2.5 py-1 font-mono font-medium rounded-md shadow-2xs">
          ₹18,400
        </Badge>
      </div>

      {/* AI Explanation Box */}
      <div className="p-3.5 rounded-xl bg-white border border-neutral-200/80 space-y-1 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
          <span>AI Insight Breakdown</span>
        </div>
        <p className="text-xs font-normal text-neutral-600 leading-relaxed">
          Food is your <span className="text-rose-600 font-medium">biggest increase this month — up 24%</span> from last month (₹14,800 → ₹18,400).
        </p>
      </div>

      {/* 3-Month Trend Comparison */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200/80 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-500 stroke-[1.75]" /> 3-Month Trend
          </span>
          <span className="text-xs font-mono font-medium text-rose-600">
            +₹3,600 vs July
          </span>
        </div>

        {/* Custom Bar Comparison */}
        <div className="pt-3 pb-1 px-2 flex items-end justify-between gap-4 h-32 border-b border-neutral-100">
          {monthlyComparison.map((item) => {
            const heightPercent = (item.amount / 20000) * 100

            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono font-medium text-neutral-600">
                  {item.label}
                </span>

                <div className="w-full max-w-[36px] bg-neutral-100 rounded-t-sm relative overflow-hidden flex flex-col justify-end" style={{ height: `${heightPercent}%` }}>
                  <div 
                    className={cn(
                      "w-full rounded-t-sm transition-all duration-300",
                      item.isCurrent 
                        ? "h-full bg-rose-500" 
                        : "h-full bg-neutral-300"
                    )}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className={cn("text-xs font-mono font-medium", item.isCurrent ? "text-rose-600" : "text-neutral-400")}>
                    {item.month}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Deep Cause Box */}
      <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-2 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono font-medium tracking-widest text-rose-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-rose-400 stroke-none" /> ROOT CAUSE
          </span>
          <span className="bg-rose-500/20 text-rose-300 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border border-rose-500/30">
            80% Late Night
          </span>
        </div>

        <div className="flex items-start gap-3 pt-0.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 shrink-0 text-sm">
            🛵
          </div>
          <div>
            <p className="text-xs font-medium text-white leading-normal">
              You made <span className="text-rose-400 font-semibold">5 more delivery orders</span> this month (14 vs 9).
            </p>
            <p className="text-[11px] text-neutral-400 font-normal mt-0.5">
              Total delivery spend: <span className="font-mono font-medium text-white">₹7,850</span> (43% of food budget).
            </p>
          </div>
        </div>
      </div>

      {/* Subcategory Outflows */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Food Outflow Split
          </span>
          <span className="text-[10px] font-medium text-neutral-400">3 Channels</span>
        </div>

        {foodSubcategories.map((sub) => {
          const Icon = sub.icon
          return (
            <div 
              key={sub.id}
              onClick={() => setActiveTab(sub.id as "delivery" | "dining" | "groceries")}
              className={cn(
                "p-3.5 rounded-xl border transition cursor-pointer space-y-2 bg-white shadow-2xs",
                activeTab === sub.id ? "border-rose-400" : "border-neutral-200/80 hover:border-neutral-300"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200/60 text-neutral-800 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 stroke-[1.75]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                      {sub.name}
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md font-mono font-medium border", sub.badgeColor)}>
                        {sub.badge}
                      </span>
                    </div>
                    <div className="text-[10px] font-normal text-neutral-400">{sub.orders} • {sub.vendor}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold font-mono text-neutral-900">{sub.amount}</div>
                  <div className="text-[10px] font-medium text-rose-500 font-mono">{sub.share}</div>
                </div>
              </div>

              {activeTab === sub.id && (
                <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px]">
                  {sub.merchants.map((m, idx) => (
                    <div key={idx} className="bg-neutral-50 p-2 rounded-lg border border-neutral-200/60 flex items-center justify-between">
                      <span className="text-neutral-600 font-normal text-[10px]">{m.name}</span>
                      <span className="font-mono font-medium text-neutral-900 text-[10px]">{m.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Button to proceed to Actionable Insight */}
      <div className="pt-2">
        <Button 
          onClick={onProceedToAction}
          className="w-full h-11 rounded-xl bg-[#0F172A] hover:bg-neutral-800 text-white font-medium text-xs tracking-wide shadow-2xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>See How AI Can Fix This</span>
          <ArrowRight className="w-4 h-4 stroke-[1.75]" />
        </Button>
      </div>
    </div>
  )
}
