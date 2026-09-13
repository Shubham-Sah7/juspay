"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronLeft, 
  Calendar, 
  Search,
  ShoppingBag as LucideShoppingBag,
  UtensilsCrossed,
  Film,
  Coffee,
  Car,
  ArrowRight,
  ChevronRight,
  Layers,
  LayoutGrid,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DailySpendingChart } from "@/components/daily-spending-chart"
import { SegmentedRingChart } from "@/components/segmented-ring-chart"

interface SpendingScreenProps {
  onOpenDrilldown: () => void
}

type PeriodTab = "day" | "week" | "month" | "year"
type ViewMode = "cards" | "stack"

interface CategoryItem {
  id: string
  name: string
  amount: string
  percentage: number
  insight: string
  tags: string[]
  colorTheme: "lilac" | "lime" | "blue" | "coral" | "pink"
  icon?: React.ComponentType<{ className?: string }>
}

interface PeriodData {
  subtitle: string
  label: string
  total: string
  trend: string
  trendColor: string
  chartSegments: {
    color: string
    dashArray: string
    dashOffset: number
  }[]
  categories: CategoryItem[]
}

const CARD_THEMES = {
  lilac: {
    bg: "bg-[#DDD6FE] text-neutral-900 border border-purple-300/40 shadow-[0_8px_24px_rgba(221,214,254,0.35)]",
    pill: "border-neutral-900/20 bg-neutral-900/5 text-neutral-900",
    btn: "bg-neutral-900 text-white hover:bg-neutral-800",
  },
  lime: {
    bg: "bg-[#D4F65B] text-neutral-900 border border-lime-400/40 shadow-[0_8px_24px_rgba(212,246,91,0.35)]",
    pill: "border-neutral-900/20 bg-neutral-900/5 text-neutral-900",
    btn: "bg-neutral-900 text-white hover:bg-neutral-800",
  },
  blue: {
    bg: "bg-[#2563EB] text-white border border-blue-400/30 shadow-[0_8px_24px_rgba(37,99,235,0.35)]",
    pill: "border-white/35 bg-white/10 text-white",
    btn: "bg-neutral-950/80 text-white border border-white/20 hover:bg-neutral-950",
  },
  coral: {
    bg: "bg-[#F95738] text-white border border-rose-400/30 shadow-[0_8px_24px_rgba(249,87,56,0.35)]",
    pill: "border-white/35 bg-white/10 text-white",
    btn: "bg-neutral-950/80 text-white border border-white/20 hover:bg-neutral-950",
  },
  pink: {
    bg: "bg-[#FBCFE8] text-neutral-900 border border-pink-300/40 shadow-[0_8px_24px_rgba(251,207,232,0.35)]",
    pill: "border-neutral-900/20 bg-neutral-900/5 text-neutral-900",
    btn: "bg-neutral-900 text-white hover:bg-neutral-800",
  }
}

const PERIOD_CONFIG: Record<PeriodTab, PeriodData> = {
  day: {
    subtitle: "Today, 14 Sep",
    label: "Spent today",
    total: "₹2,450",
    trend: "↓ 18% vs yesterday",
    trendColor: "text-emerald-600",
    chartSegments: [
      { color: "#F95738", dashArray: "51 49", dashOffset: 0 },
      { color: "#D4F65B", dashArray: "27 73", dashOffset: -51 },
      { color: "#2563EB", dashArray: "12 88", dashOffset: -78 },
      { color: "#DDD6FE", dashArray: "10 90", dashOffset: -90 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        amount: "₹1,250",
        percentage: 51,
        insight: "Lunch & cafes",
        tags: ["3 orders", "₹1,250 spent", "Cafe & Lunch"],
        colorTheme: "coral",
      },
      {
        id: "shopping",
        name: "Shopping & Tech",
        amount: "₹650",
        percentage: 27,
        insight: "Book purchase",
        tags: ["1 order", "₹650 spent", "Bookstore"],
        colorTheme: "lime",
      },
      {
        id: "rent",
        name: "Rent & Housing",
        amount: "₹300",
        percentage: 12,
        insight: "Water utility",
        tags: ["Utilities", "₹300 spent", "Paid on UPI"],
        colorTheme: "blue",
      },
      {
        id: "subscriptions",
        name: "Subscriptions",
        amount: "₹250",
        percentage: 10,
        insight: "Daily cloud",
        tags: ["1 active", "₹250", "Auto-debit"],
        colorTheme: "lilac",
      },
    ],
  },
  week: {
    subtitle: "8 – 14 Sep 2025",
    label: "Spent this week",
    total: "₹12,850",
    trend: "↑ 4% vs previous week",
    trendColor: "text-rose-500",
    chartSegments: [
      { color: "#F95738", dashArray: "42 58", dashOffset: 0 },
      { color: "#D4F65B", dashArray: "21 79", dashOffset: -42 },
      { color: "#2563EB", dashArray: "19 81", dashOffset: -63 },
      { color: "#DDD6FE", dashArray: "11 89", dashOffset: -82 },
      { color: "#FBCFE8", dashArray: "7 93", dashOffset: -93 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        amount: "₹5,400",
        percentage: 42,
        insight: "↑ 8%",
        tags: ["12 orders", "₹5,400 spent", "Swiggy & Zomato"],
        colorTheme: "coral",
      },
      {
        id: "shopping",
        name: "Shopping & Tech",
        amount: "₹2,700",
        percentage: 21,
        insight: "Saved ₹450",
        tags: ["4 items", "₹2,700 spent", "Saved ₹450"],
        colorTheme: "lime",
      },
      {
        id: "rent",
        name: "Rent & Housing",
        amount: "₹2,500",
        percentage: 19,
        insight: "Utilities",
        tags: ["Fixed utility", "₹2,500 spent", "Paid on 10th"],
        colorTheme: "blue",
      },
      {
        id: "subscriptions",
        name: "Subscriptions",
        amount: "₹1,450",
        percentage: 11,
        insight: "4 active",
        tags: ["4 services", "₹1,450 spent", "Annual plans"],
        colorTheme: "lilac",
      },
      {
        id: "travel",
        name: "Travel & Commute",
        amount: "₹800",
        percentage: 7,
        insight: "Uber & Metro",
        tags: ["6 rides", "₹800 spent", "Commute"],
        colorTheme: "pink",
      },
    ],
  },
  month: {
    subtitle: "August 2025",
    label: "Spent this August",
    total: "₹52,400",
    trend: "↑ 12% vs previous month",
    trendColor: "text-rose-500",
    chartSegments: [
      { color: "#F95738", dashArray: "35 65", dashOffset: 0 },
      { color: "#2563EB", dashArray: "29 71", dashOffset: -35 },
      { color: "#D4F65B", dashArray: "16 84", dashOffset: -64 },
      { color: "#FBCFE8", dashArray: "12 88", dashOffset: -80 },
      { color: "#DDD6FE", dashArray: "8 92", dashOffset: -92 },
    ],
    categories: [
      {
        id: "food",
        name: "Food & Dining",
        amount: "₹18,400",
        percentage: 35,
        insight: "↑ 24%",
        tags: ["24 orders", "₹18,400 spent", "Delivery is driving it"],
        colorTheme: "coral",
      },
      {
        id: "rent",
        name: "Rent & Housing",
        amount: "₹15,000",
        percentage: 29,
        insight: "Fixed",
        tags: ["Fixed expense", "₹15,000 spent", "Paid on 1st"],
        colorTheme: "blue",
      },
      {
        id: "shopping",
        name: "Shopping & Tech",
        amount: "₹8,200",
        percentage: 16,
        insight: "Saved ₹1.2K",
        tags: ["8 items", "₹8,200 spent", "Saved ₹1.2K"],
        colorTheme: "lime",
      },
      {
        id: "travel",
        name: "Travel & Commute",
        amount: "₹6,450",
        percentage: 12,
        insight: "Uber & Metro",
        tags: ["14 rides", "₹6,450 spent", "Uber & Metro"],
        colorTheme: "pink",
      },
      {
        id: "subscriptions",
        name: "Subscriptions",
        amount: "₹4,350",
        percentage: 8,
        insight: "5 active",
        tags: ["5 active", "₹4,350 spent", "Auto-debit"],
        colorTheme: "lilac",
      },
    ],
  },
  year: {
    subtitle: "Year 2025",
    label: "Spent in 2025",
    total: "₹5,84,000",
    trend: "↑ 8% vs previous year",
    trendColor: "text-rose-500",
    chartSegments: [
      { color: "#2563EB", dashArray: "31 69", dashOffset: 0 },
      { color: "#F95738", dashArray: "28 72", dashOffset: -31 },
      { color: "#D4F65B", dashArray: "20 80", dashOffset: -59 },
      { color: "#FBCFE8", dashArray: "12 88", dashOffset: -79 },
      { color: "#DDD6FE", dashArray: "9 91", dashOffset: -91 },
    ],
    categories: [
      {
        id: "rent",
        name: "Rent & Housing",
        amount: "₹1,80,000",
        percentage: 31,
        insight: "Fixed",
        tags: ["12 months", "₹1,80,000 spent", "Zero penalties"],
        colorTheme: "blue",
      },
      {
        id: "food",
        name: "Food & Dining",
        amount: "₹1,62,400",
        percentage: 28,
        insight: "↑ 16%",
        tags: ["186 orders", "₹1,62,400 spent", "Top expense"],
        colorTheme: "coral",
      },
      {
        id: "shopping",
        name: "Shopping & Tech",
        amount: "₹1,16,800",
        percentage: 20,
        insight: "Saved ₹18K",
        tags: ["Gadgets & gear", "₹1,16,800", "Saved ₹18K"],
        colorTheme: "lime",
      },
      {
        id: "travel",
        name: "Travel & Commute",
        amount: "₹72,600",
        percentage: 12,
        insight: "Trips & Flights",
        tags: ["3 flights", "₹72,600 spent", "Tokyo prep"],
        colorTheme: "pink",
      },
      {
        id: "subscriptions",
        name: "Subscriptions",
        amount: "₹52,200",
        percentage: 9,
        insight: "Annual",
        tags: ["Annualized", "₹52,200 spent", "5 services"],
        colorTheme: "lilac",
      },
    ],
  },
}

export function SpendingScreen({ onOpenDrilldown }: SpendingScreenProps) {
  const [activeTab, setActiveTab] = useState<PeriodTab>("month")
  const [viewMode, setViewMode] = useState<ViewMode>("cards")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const currentPeriod = PERIOD_CONFIG[activeTab]

  const categoryFilters = [
    { id: "all", label: "All" },
    { id: "groceries", label: "🛒 Groceries" },
    { id: "dining", label: "🥐 Dining" },
    { id: "transport", label: "⛽ Fuel" },
    { id: "entertainment", label: "🍿 Subs" },
    { id: "cafe", label: "☕ Cafe" },
  ]

  const transactions = [
    {
      id: "1",
      title: "Supermart Groceries",
      subtitle: "Swiggy Instamart • 12 items",
      date: "Sep 14, 2025",
      time: "6:45 PM",
      amount: "- ₹3,420",
      payment: "Card •••• 1234",
      category: "Groceries",
      categoryKey: "groceries",
      theme: "lime",
      bgBadge: "bg-[#D4F65B] text-neutral-950 border border-[#D4F65B]",
      icon: LucideShoppingBag,
      tags: ["🥦 Fresh Veggies", "+₹420 vs avg"]
    },
    {
      id: "2",
      title: "Fresh Bakery",
      subtitle: "Artisan Bakes & Cafe",
      date: "Sep 13, 2025",
      time: "11:20 AM",
      amount: "- ₹650",
      payment: "Paid with Visa",
      category: "Dining",
      categoryKey: "dining",
      theme: "coral",
      bgBadge: "bg-rose-100 text-rose-600 border border-rose-200",
      icon: UtensilsCrossed,
      tags: ["🥐 Sourdough", "☕ Espresso"]
    },
    {
      id: "3",
      title: "Gas Station",
      subtitle: "Shell Petrol • Full tank",
      date: "Sep 11, 2025",
      time: "8:15 AM",
      amount: "- ₹1,850",
      payment: "Card •••• 1234",
      category: "Transport",
      categoryKey: "transport",
      theme: "blue",
      bgBadge: "bg-blue-100 text-[#0055FF] border border-blue-200",
      icon: Car,
      tags: ["🚗 Highway commute", "⚡ Auto-points"]
    },
    {
      id: "4",
      title: "Netflix Premium",
      subtitle: "Monthly 4K Family Subscription",
      date: "Sep 08, 2025",
      time: "12:01 AM",
      amount: "- ₹649",
      payment: "Auto-debit Visa",
      category: "Entertainment",
      categoryKey: "entertainment",
      theme: "lilac",
      bgBadge: "bg-purple-100 text-purple-700 border border-purple-200",
      icon: Film,
      tags: ["📺 4K UHD Plan", "⚡ Recurring"]
    },
    {
      id: "5",
      title: "Blue Tokai Coffee",
      subtitle: "Cold Brew + Cinnamon Roll",
      date: "Sep 05, 2025",
      time: "4:30 PM",
      amount: "- ₹340",
      payment: "Juspay Pay",
      category: "Cafe",
      categoryKey: "cafe",
      theme: "pink",
      bgBadge: "bg-pink-100 text-pink-700 border border-pink-200",
      icon: Coffee,
      tags: ["Daily brew", "₹18 round-up"]
    }
  ]

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.payment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || t.categoryKey === selectedCategory
    return matchesSearch && matchesCategory
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 space-y-4 pb-28"
    >
      {/* 1. REFINED HEADER */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <button 
          aria-label="Go back"
          className="p-2 -ml-2 text-neutral-700 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-semibold tracking-tight text-neutral-900 leading-none">Spending</h1>
          <AnimatePresence mode="wait">
            <motion.span 
              key={currentPeriod.subtitle}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-normal text-neutral-400 mt-0.5 block"
            >
              {currentPeriod.subtitle}
            </motion.span>
          </AnimatePresence>
        </div>

        <button 
          aria-label="Select month"
          className="p-2 -mr-2 text-neutral-700 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <Calendar className="w-4.5 h-4.5 stroke-[1.75]" />
        </button>
      </motion.div>

      {/* 2. TIME FILTER */}
      <motion.div variants={itemVariants} className="flex items-center justify-center gap-1.5 py-1">
        {(["day", "week", "month", "year"] as const).map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs transition-all duration-200 capitalize cursor-pointer",
                isActive 
                  ? "font-semibold text-neutral-900 border-[1.5px] border-neutral-900 bg-white shadow-2xs" 
                  : "font-normal text-neutral-500 hover:text-neutral-800 border-[1.5px] border-transparent"
              )}
            >
              {tab}
            </button>
          )
        })}
      </motion.div>

      {/* 3. VIEW SWITCHER TOGGLE (Cards vs Buckets Stack) & ASK NUDGE ACTION */}
      <motion.div variants={itemVariants} className="flex items-center justify-between gap-3 px-1">
        <div className="flex items-center bg-neutral-100/90 p-1 rounded-2xl border border-neutral-200/50 shadow-2xs">
          <button
            onClick={() => setViewMode("cards")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
              viewMode === "cards" 
                ? "bg-neutral-900 text-white shadow-xs" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Categories</span>
          </button>
          <button
            onClick={() => setViewMode("stack")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
              viewMode === "stack" 
                ? "bg-neutral-900 text-white shadow-xs" 
                : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Stack</span>
          </button>
        </div>

        <button 
          onClick={onOpenDrilldown}
          className="text-xs font-semibold text-[#0055FF] hover:underline transition flex items-center gap-1.5 shrink-0 whitespace-nowrap group cursor-pointer py-1"
        >
          <span>Ask Nudge why</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </button>
      </motion.div>

      {/* 4. CONTENT BASED ON VIEW MODE */}
      <AnimatePresence mode="wait">
        {viewMode === "cards" ? (
          <motion.div 
            key="cards-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* SPENDING & SAVINGS SUMMARY RING (MATCHING USER REFERENCE IMAGE 1:1) */}
            <div className="pt-1 pb-1">
              <SegmentedRingChart 
                title={activeTab === "month" ? "Total Savings" : currentPeriod.label}
                amount={activeTab === "month" ? "₹48,250" : currentPeriod.total}
                cents=".00"
                trend={activeTab === "month" ? "+2.5% ↑" : currentPeriod.trend}
                isPositive={true}
                segments={
                  activeTab === "month" ? [
                    { id: "savings", label: "Investments & Liquid", percentage: 38, color: "#A3E635", amount: "₹18,335" },
                    { id: "fixed", label: "Fixed & Housing", percentage: 25, color: "#A5B4FC", amount: "₹12,062" },
                    { id: "recurring", label: "Subscriptions", percentage: 15, color: "#FDE047", amount: "₹7,238" },
                    { id: "expenses", label: "Discretionary & Food", percentage: 22, color: "#FB7185", amount: "₹10,615" }
                  ] : currentPeriod.categories.slice(0, 4).map((cat, idx) => ({
                    id: cat.id,
                    label: cat.name,
                    percentage: cat.percentage || 25,
                    color: idx === 0 ? "#A3E635" : idx === 1 ? "#A5B4FC" : idx === 2 ? "#FDE047" : "#FB7185",
                    amount: cat.amount
                  }))
                }
                onSegmentClick={() => onOpenDrilldown()}
              />
            </div>

            {/* CATEGORIES CARDS (IMAGE 1 REFERENCE STYLE) */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Spending Breakdown
                </h2>
                <span className="text-xs text-neutral-400 font-medium">
                  {currentPeriod.categories.length} categories
                </span>
              </div>

              <div className="space-y-3">
                {currentPeriod.categories.map((cat) => {
                  const theme = CARD_THEMES[cat.colorTheme]
                  return (
                    <motion.div 
                      key={cat.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onOpenDrilldown}
                      className={cn(
                        "p-5 rounded-[24px] cursor-pointer transition-all duration-200 select-none group flex flex-col justify-between min-h-[112px]",
                        theme.bg
                      )}
                    >
                      {/* Top Row: Category Title + Percentage */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight leading-snug">
                            {cat.name}
                          </h3>
                        </div>
                        <span className="text-sm font-semibold opacity-85 pt-0.5 font-sans">
                          {cat.percentage}%
                        </span>
                      </div>

                      {/* Bottom Row: Pill Badges + Circular Arrow Button */}
                      <div className="flex items-center justify-between gap-2 mt-4">
                        <div className="flex items-center flex-wrap gap-2">
                          {cat.tags.map((tag, idx) => (
                            <span 
                              key={idx}
                              className={cn(
                                "text-xs font-medium px-3.5 py-1 rounded-full border backdrop-blur-xs transition",
                                theme.pill
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:translate-x-0.5 transition-all duration-200",
                          theme.btn
                        )}>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* BUCKETS STACK VIEW (IMAGE 2 REFERENCE STYLE) */
          <motion.div 
            key="stack-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 pt-1"
          >
            {/* Top Photo Card with Sticky Note Memo */}
            <div className="relative rounded-[26px] overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-950 text-white p-5 shadow-lg border border-neutral-700/40">
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Monthly Snapshot</span>
                  <h3 className="text-2xl font-bold tracking-tight text-white mt-1">Cash Flow & Buckets</h3>
                </div>

                {/* Playful Yellow Memo Sticky Note from reference */}
                <div className="bg-[#FEF08A] -rotate-2 rounded-lg px-3 py-1.5 shadow-md border border-amber-300 text-neutral-950 text-[11px] font-bold">
                  &ldquo;August 2025&rdquo;
                </div>
              </div>

              <p className="relative z-10 text-xs text-neutral-300 mt-2 max-w-[260px]">
                Net income is +₹95,850 after all bills and discretionary spendings.
              </p>
            </div>

            {/* Overlapping Folder Stack */}
            <div className="relative pt-1 space-y-[-14px]">
              {/* Card 1: Spendings (Pink from Image 2) */}
              <motion.div 
                whileHover={{ y: -6, zIndex: 30 }}
                whileTap={{ scale: 0.99 }}
                onClick={onOpenDrilldown}
                className="relative z-10 p-4.5 rounded-[24px] bg-[#FFAAE7] text-neutral-950 shadow-[0_8px_24px_rgba(255,170,231,0.4)] border border-white/50 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight">Spendings</span>
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                      2
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight font-sans">₹52,400</span>
                    <ChevronRight className="w-4 h-4 text-neutral-900" />
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Income (Mint Green from Image 2) */}
              <motion.div 
                whileHover={{ y: -6, zIndex: 30 }}
                whileTap={{ scale: 0.99 }}
                className="relative z-20 p-4.5 rounded-[24px] bg-[#6EE7B7] text-neutral-950 shadow-[0_8px_24px_rgba(110,231,183,0.4)] border border-white/50 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold tracking-tight">Income</span>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight font-sans">₹1,48,250</span>
                    <ChevronRight className="w-4 h-4 text-neutral-900" />
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Recurring (Warm Yellow from Image 2) */}
              <motion.div 
                whileHover={{ y: -6, zIndex: 30 }}
                whileTap={{ scale: 0.99 }}
                className="relative z-30 p-4.5 rounded-[24px] bg-[#FDE047] text-neutral-950 shadow-[0_8px_24px_rgba(253,224,71,0.4)] border border-white/50 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold tracking-tight">Recurring Subscriptions</span>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight font-sans">₹4,350</span>
                    <ChevronRight className="w-4 h-4 text-neutral-900" />
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Savings (Sky Blue from Image 2 with Barcode Equalizer) */}
              <motion.div 
                whileHover={{ y: -6, zIndex: 30 }}
                whileTap={{ scale: 0.99 }}
                className="relative z-40 p-5 rounded-[24px] bg-[#38BDF8] text-neutral-950 shadow-[0_12px_32px_rgba(56,189,248,0.45)] border border-white/50 cursor-pointer transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold tracking-tight">Savings Target</span>
                    <span className="text-xs text-neutral-800 block mt-0.5">₹1,08,000 in liquid wealth</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight font-sans">73%</span>
                    <ChevronRight className="w-4 h-4 text-neutral-900" />
                  </div>
                </div>

                {/* Vertical Barcode Equalizer Progress Bar from reference image */}
                <div className="pt-1">
                  <div className="flex items-center gap-[2.5px] h-4">
                    {Array.from({ length: 36 }).map((_, i) => {
                      const filled = i < 26 // 73%
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "flex-1 h-full rounded-full transition-all duration-300",
                            filled ? "bg-neutral-950" : "bg-neutral-950/20"
                          )}
                        />
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SPENDING TREND DAILY CHART */}
      <motion.div variants={itemVariants} className="pt-2">
        <DailySpendingChart period={activeTab} />
      </motion.div>

      {/* 6. LATEST TRANSACTIONS SECTION: HOMEPAGE STYLE CARDS */}
      <motion.div variants={itemVariants} className="space-y-3 pt-1">
        {/* Search Bar & Filter Chips */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/85 backdrop-blur-xl border border-white shadow-[0_4px_16px_rgba(0,0,0,0.03)] text-xs text-neutral-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0055FF]/20 focus-within:border-[#0055FF]/40 transition">
            <Search className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2]" />
            <input 
              type="text"
              placeholder="Search merchant, tag, or card..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-xs font-medium text-neutral-900 placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center hover:bg-neutral-300 transition cursor-pointer"
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Quick Filter Pill Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categoryFilters.map((tab) => {
              const isActive = selectedCategory === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-2xs",
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "bg-white/80 text-neutral-600 border border-neutral-200/70 hover:bg-neutral-100"
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Latest Transactions
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0055FF] border border-blue-100">
              ⚡️ {filteredTransactions.length} Items
            </span>
          </div>
          <button 
            onClick={onOpenDrilldown}
            className="text-xs font-semibold text-[#0055FF] hover:underline transition flex items-center gap-1 group cursor-pointer"
          >
            <span>See all</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Transaction Cards matching Homepage aesthetics */}
        <div className="space-y-3">
          {filteredTransactions.map((tx) => {
            const Icon = tx.icon
            return (
              <motion.div 
                key={tx.id}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onOpenDrilldown}
                className="p-4 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-neutral-300/80 transition-all duration-200 cursor-pointer space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Category Icon Square with Homepage palette */}
                    <div className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs font-bold transition-transform group-hover:scale-105",
                      tx.bgBadge
                    )}>
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-neutral-900 tracking-tight block group-hover:text-[#0055FF] transition-colors leading-tight">
                        {tx.title}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-400 block mt-0.5">
                        {tx.date} • {tx.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-base font-black text-neutral-950 block font-sans tracking-tight">
                        {tx.amount}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-400 block mt-0.5">
                        {tx.payment}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:translate-x-0.5 transition-all ml-1">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                {/* Pill Chips row matching Homepage */}
                <div className="flex items-center flex-wrap gap-2 pt-1 border-t border-neutral-100/80">
                  {tx.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-neutral-900/15 bg-neutral-900/5 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0055FF] border border-blue-100/80 ml-auto">
                    {tx.category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
