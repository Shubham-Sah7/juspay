"use client"

import React, { useState, useEffect, useRef } from "react"
import { 
  motion, 
  AnimatePresence,
  useReducedMotion, 
  useMotionValue, 
  useTransform, 
  useSpring, 
  useMotionTemplate 
} from "framer-motion"
import gsap from "gsap"
import { 
  Bell, 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  CreditCard
} from "lucide-react"
import { JuspayLogoMark } from "@/components/ui/juspay-logo"
import { cn } from "@/lib/utils"

interface HomeScreenProps {
  onNavigateToInsights: () => void
  onOpenDrilldown: () => void
}

export function HomeScreen({ onNavigateToInsights, onOpenDrilldown }: HomeScreenProps) {
  const [piggyCoinsAdded, setPiggyCoinsAdded] = useState(0)
  const [emergencyCoinsAdded, setEmergencyCoinsAdded] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isPiggyBouncing, setIsPiggyBouncing] = useState(false)

  const handleFeedPiggy = (target: "all" | "tokyo" | "emergency") => {
    if (target === "tokyo" || target === "all") {
      setPiggyCoinsAdded(prev => prev + 500)
    }
    if (target === "emergency") {
      setEmergencyCoinsAdded(prev => prev + 500)
    }
    setIsPiggyBouncing(true)
    setTimeout(() => setIsPiggyBouncing(false), 500)

    const label = target === "tokyo" 
      ? "Tokyo Trip Piggy" 
      : target === "emergency" 
      ? "Rainy Day Piggy" 
      : "Tokyo Trip Piggy"
    setToastMessage(`🪙 Clink! +₹500 dropped into ${label}! ✨`)
    setTimeout(() => {
      setToastMessage(null)
    }, 2200)
  }

  const cardScopeRef = useRef<HTMLDivElement>(null)
  const backCardRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const cardNumberRef = useRef<HTMLDivElement>(null)
  const balanceContainerRef = useRef<HTMLDivElement>(null)
  const balanceRef = useRef<HTMLSpanElement>(null)
  const expiryRef = useRef<HTMLDivElement>(null)
  const cardholderRef = useRef<HTMLDivElement>(null)
  const addBtnRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const shouldReduceMotion = useReducedMotion()

  // GPU-accelerated interactive 3D tilt & holographic glare
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 280, damping: 22 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, 90]), springConfig)
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 90]), springConfig)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 70%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  useEffect(() => {
    if (!cardScopeRef.current) return

    // Gracefully handle prefers-reduced-motion
    if (shouldReduceMotion) {
      if (balanceRef.current) {
        balanceRef.current.innerText = "₹1,48,250"
      }
      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 1, y: 0, scale: 1 })
      }
      if (backCardRef.current) {
        gsap.set(backCardRef.current, { opacity: 1, y: 0 })
      }
      if (logoRef.current) gsap.set(logoRef.current, { opacity: 1, y: 0 })
      if (cardNumberRef.current) gsap.set(cardNumberRef.current, { opacity: 1, y: 0 })
      if (balanceContainerRef.current) gsap.set(balanceContainerRef.current, { opacity: 1, y: 0 })
      if (cardholderRef.current) gsap.set(cardholderRef.current, { opacity: 1, y: 0 })
      if (expiryRef.current) gsap.set(expiryRef.current, { opacity: 1, y: 0 })
      if (addBtnRef.current) gsap.set(addBtnRef.current, { opacity: 1, scale: 1 })
      if (shineRef.current) gsap.set(shineRef.current, { opacity: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      })

      // Back card peeking entrance with subtle depth
      if (backCardRef.current) {
        tl.fromTo(
          backCardRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.65,
            ease: "power3.out",
            onComplete: () => {
              if (backCardRef.current) gsap.set(backCardRef.current, { clearProps: "transform" })
            }
          },
          0.05
        )
      }

      // 1. Card container entrance: 3D perspective lift & settle
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { 
            opacity: 0, 
            y: 35, 
            scale: 0.93,
            rotationX: 18,
            rotationY: -4,
            transformPerspective: 1000
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotationX: 0,
            rotationY: 0,
            duration: 0.8, 
            ease: "power3.out",
            onComplete: () => {
              // Clear inline transform to yield full control to Framer Motion 3D tilt
              if (cardRef.current) gsap.set(cardRef.current, { clearProps: "transform" })
            }
          },
          0
        )
      }

      // 2. Juspay logo + "JUSPAY PAY": fade + slight upward movement
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.15
        )
      }

      // 3. Card number: fade + y movement, scale settle
      if (cardNumberRef.current) {
        tl.fromTo(
          cardNumberRef.current,
          { opacity: 0, y: 10, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
          0.22
        )
      }

      // 4. Balance: fade + y movement
      if (balanceContainerRef.current) {
        tl.fromTo(
          balanceContainerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          0.28
        )
      }

      // Balance number counter: 0 -> 148,250 in ~0.9s formatted as ₹1,48,250
      if (balanceRef.current) {
        balanceRef.current.innerText = "₹0"
        const counterObj = { value: 0 }
        tl.to(
          counterObj,
          {
            value: 148250,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              if (balanceRef.current) {
                balanceRef.current.innerText = `₹${Math.round(counterObj.value).toLocaleString("en-IN")}`
              }
            },
            onComplete: () => {
              if (balanceRef.current) {
                balanceRef.current.innerText = "₹1,48,250"
              }
            }
          },
          0.28
        )
      }

      // Luminous light sweep across card face on entrance
      if (shineRef.current) {
        tl.fromTo(
          shineRef.current,
          { xPercent: -120, opacity: 0 },
          { 
            xPercent: 340, 
            opacity: 1, 
            duration: 0.95, 
            ease: "power2.inOut",
            onComplete: () => {
              if (shineRef.current) {
                gsap.set(shineRef.current, { opacity: 0 })
              }
            }
          },
          0.3
        )
      }

      // 5. Cardholder & expiry: fade + y movement
      const details = [cardholderRef.current, expiryRef.current].filter(Boolean)
      if (details.length > 0) {
        tl.fromTo(
          details,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.38
        )
      }

      // 6. Add Card button: scale pop with lively spring
      if (addBtnRef.current) {
        tl.fromTo(
          addBtnRef.current,
          { opacity: 0, scale: 0.88 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 0.55, 
            ease: "back.out(1.8)",
            onComplete: () => {
              if (addBtnRef.current) gsap.set(addBtnRef.current, { clearProps: "transform" })
            }
          },
          0.42
        )
      }
    }, cardScopeRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.06
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } }
  }



  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 space-y-4 pb-28"
    >
      {/* Header Bar: Editorial Avatar & Brand Mark */}
      <motion.div variants={itemVariants} className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden border-2 border-white shadow-sm shrink-0">
            <img 
              src="/avatars/alex.jpg" 
              alt="Alex Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">Welcome back</span>
            <h1 className="text-sm font-black text-neutral-900 tracking-tight">Alex</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white border border-neutral-200/80 shadow-xs relative text-neutral-800"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Editorial Headline Statement matching reference Finans image */}
      <motion.div variants={itemVariants} className="pt-1">
        <h2 className="text-3xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
          Good finances,<br />better life.
        </h2>
      </motion.div>

      {/* Stacked Overlapping Cards Hero Balance Container */}
      <div ref={cardScopeRef} className="relative pt-6 select-none perspective-[1000px]">
        {/* 1. Back Card (Peeking out behind with premium matte obsidian finish) */}
        <motion.div 
          ref={backCardRef}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          className="absolute top-0 inset-x-2.5 h-22 rounded-[26px] bg-[#111622] text-white px-5 py-3.5 shadow-sm flex items-start justify-between border border-white/[0.09] transition duration-200"
        >
          {/* Mastercard Double Ring Symbol & Sub-label */}
          <div className="flex items-center gap-2">
            <div className="flex items-center -space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-90 shadow-2xs" />
              <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90 shadow-2xs" />
            </div>
            <span className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase">Debit</span>
          </div>
          <span className="font-mono text-[11px] font-medium text-neutral-400/90 tracking-widest">
            •••• 7216
          </span>
        </motion.div>

        {/* 2. Front Active Sapphire Juspay Card (Larger Corner Radius + Interactive 3D Holographic Tilt) */}
        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
          }}
          whileHover={shouldReduceMotion ? undefined : { 
            y: -4, 
            scale: 1.015,
            boxShadow: "0 26px 65px rgba(0,85,255,0.38)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-10 rounded-[28px] bg-gradient-to-br from-[#0B1528] via-[#0D245A] to-[#0055FF] text-white p-5.5 shadow-[0_20px_50px_rgba(0,85,255,0.30),inset_0_1px_1.5px_rgba(255,255,255,0.35)] space-y-4.5 border border-white/20 overflow-hidden group/card cursor-pointer"
        >
          {/* Interactive Dynamic Holographic Glare Sheen following cursor */}
          {!shouldReduceMotion && (
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-[28px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-30"
              style={{ background: glareBackground }}
            />
          )}

          {/* Subtle Ambient Curved Light Accent Overlay */}
          <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-[#0099FF]/20 blur-2xl pointer-events-none group-hover/card:bg-[#0099FF]/35 transition-all duration-500" />
          <div className="absolute -bottom-16 -left-12 w-56 h-56 rounded-full bg-[#0055FF]/25 blur-3xl pointer-events-none" />

          {/* Luminous Light Sweep across card on entrance */}
          <div 
            ref={shineRef}
            className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 select-none z-20 rounded-[28px]"
          >
            <div className="w-32 h-[240%] -top-1/2 -left-20 absolute bg-gradient-to-r from-transparent via-white/[0.14] to-transparent -rotate-25 pointer-events-none" />
          </div>

          {/* Top Row: Juspay Logo, Contactless Waves & Card Number Capsule */}
          <div className="flex items-center justify-between relative z-10">
            <div ref={logoRef} className="flex items-center gap-2 text-white">
              <JuspayLogoMark size={22} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase font-sans text-white">Juspay Pay</span>
              {/* Contactless Radio Wave Mark */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-white/50 -rotate-90 ml-0.5">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              </svg>
            </div>
            <div ref={cardNumberRef} className="flex items-center gap-1.5 font-mono text-xs font-semibold text-white/90 tracking-widest bg-white/[0.12] px-3 py-1 rounded-full border border-white/20 backdrop-blur-md shadow-2xs">
              <span className="text-[9px] opacity-70 tracking-tight">••••</span>
              <span>4364</span>
            </div>
          </div>

          {/* Middle Row: Balance Label & Amount + Exp Date */}
          <div className="flex items-end justify-between pt-1 relative z-10">
            <div ref={balanceContainerRef}>
              <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-white/70 block">
                Total Available Balance
              </span>
              <div className="text-3xl sm:text-[34px] font-bold tracking-tight text-white drop-shadow-sm flex items-baseline mt-1 font-sans">
                <span ref={balanceRef}>₹1,48,250</span>
              </div>
            </div>

            <div ref={expiryRef} className="text-right">
              <span className="text-[9px] font-medium text-white/60 block uppercase tracking-[0.14em]">Valid Thru</span>
              <span className="text-xs font-semibold text-white/95 tracking-wider font-mono mt-0.5 block">08/28</span>
            </div>
          </div>

          {/* Bottom Row: Name & Floating "+ Add Card" Capsule Pill */}
          <div className="flex items-end justify-between pt-1 relative z-10">
            <div ref={cardholderRef}>
              <span className="text-[9px] font-medium text-white/60 block uppercase tracking-[0.14em]">Cardholder</span>
              <span className="text-xs font-semibold text-white tracking-wide block mt-0.5">Alex</span>
            </div>

            {/* Floating "+ Add Card" Dark Frosted Capsule Pill */}
            <div ref={addBtnRef}>
              <motion.button 
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="px-3.5 py-1.5 rounded-full bg-[#0A1124]/90 hover:bg-black text-white text-xs font-medium flex items-center gap-2 shadow-md border border-white/20 cursor-pointer transition backdrop-blur-md"
              >
                <div className="w-4 h-4 rounded-full bg-[#0099FF] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                  <Plus className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="tracking-tight font-medium">Add Card</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Glassmorphism Container with 4 Circular Badge Buttons */}
      <motion.div 
        variants={itemVariants} 
        className="p-3.5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-around text-center"
      >
        {/* 1. Send */}
        <motion.button 
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-xs group-hover:bg-[#0055FF] group-hover:text-white transition duration-200 border border-neutral-200/60">
            <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-neutral-800 tracking-tight">Send</span>
        </motion.button>

        {/* 2. Request */}
        <motion.button 
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenDrilldown}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-xs group-hover:bg-[#0055FF] group-hover:text-white transition duration-200 border border-neutral-200/60">
            <ArrowDownLeft className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-neutral-800 tracking-tight">Request</span>
        </motion.button>

        {/* 3. TopUp */}
        <motion.button 
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-xs group-hover:bg-[#0055FF] group-hover:text-white transition duration-200 border border-neutral-200/60">
            <CreditCard className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-semibold text-neutral-800 tracking-tight">TopUp</span>
        </motion.button>

        {/* 4. More */}
        <motion.button 
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNavigateToInsights}
          className="flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 flex items-center justify-center shadow-xs group-hover:bg-[#0055FF] group-hover:text-white transition duration-200 border border-neutral-200/60">
            <MoreHorizontal className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-semibold text-neutral-800 tracking-tight">More</span>
        </motion.button>
      </motion.div>

      {/* Gen-Z Spendings Card & Sticky Note Memo (from user reference screenshot) */}
      <motion.div variants={itemVariants} className="space-y-3 pt-1">
        {/* Pink Spendings Card */}
        <motion.div
          whileHover={{ y: -3, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNavigateToInsights}
          className="p-5 rounded-[24px] bg-[#FFAAE7] text-neutral-950 shadow-[0_10px_28px_rgba(255,170,231,0.4)] border border-white/50 cursor-pointer select-none transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-bold tracking-tight text-neutral-900">
              Spendings
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight font-sans text-neutral-950">
                ₹2,342<span className="text-xl font-bold opacity-80">.57</span>
              </span>
            </div>
            <span className="text-xs text-neutral-700 font-medium block mt-0.5">
              spent this month
            </span>
          </div>
        </motion.div>

        {/* Yellow Paper Sticky Note Memo with Dog-Eared Fold */}
        <motion.div 
          whileHover={{ scale: 1.01, rotate: 0 }}
          whileTap={{ scale: 0.99 }}
          onClick={onNavigateToInsights}
          className="relative bg-[#FEF08A] rounded-[20px] p-4 shadow-[0_6px_22px_rgba(250,204,21,0.3)] border border-amber-300/70 flex items-center justify-between cursor-pointer group select-none overflow-hidden transition-all duration-200"
        >
          {/* Dog-eared bottom-left fold */}
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-amber-400/90 pointer-events-none rounded-tr-sm shadow-xs" />
          
          <div className="flex-1 pr-3 pl-2">
            <p className="text-xs text-neutral-800 font-medium leading-tight">
              Spendings report for <span className="font-bold italic text-neutral-950 font-serif">March 2024</span> is here.
            </p>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation()
              onNavigateToInsights()
            }}
            className="px-4 py-2 rounded-xl bg-neutral-950 text-white text-xs font-semibold shadow-xs hover:bg-neutral-800 transition active:scale-95 shrink-0 cursor-pointer"
          >
            Check it out
          </button>
        </motion.div>
      </motion.div>

      {/* "Last Transfer" Avatar List */}
      <motion.div variants={itemVariants} className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Last Transfer
          </h3>
          <button className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition cursor-pointer">
            See all ›
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {[
            { name: "Amara", img: "/avatars/amara.jpg" },
            { name: "Ridho", img: "/avatars/ridho.jpg" },
            { name: "Safira", img: "/avatars/safira.jpg" },
            { name: "Inara", img: "/avatars/inara.jpg" },
            { name: "Mega", img: "/avatars/mega.jpg" },
          ].map((user) => (
            <motion.div 
              key={user.name} 
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1 shrink-0 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full border-2 border-white shadow-2xs overflow-hidden bg-neutral-200">
                <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-semibold text-neutral-700">{user.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gen-Z Overlapping Card Stack / Folder Tabs UI */}
      <motion.div variants={itemVariants} className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Spendings & Buckets
            </h3>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] animate-pulse" />
          </div>
          <button onClick={onNavigateToInsights} className="text-xs font-semibold text-[#0055FF] hover:underline cursor-pointer flex items-center gap-0.5">
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stacked Vertical Gen-Z Cards with Folder Tabs & Pill Tags */}
        <div className="relative pt-1 space-y-[-14px]">
          {/* Card 1: Food & Dining (Vibrant Coral from Image 1 & 3) */}
          <motion.div 
            whileHover={{ y: -6, zIndex: 30 }}
            whileTap={{ scale: 0.99 }}
            onClick={onOpenDrilldown}
            className="relative z-10 p-5 rounded-[24px] bg-[#F95738] text-white shadow-[0_10px_28px_rgba(249,87,56,0.38)] border border-white/25 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Food & Dining</h4>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs font-medium bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30">
                    24 orders
                  </span>
                  <span className="text-xs font-medium bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30">
                    Delivery driving it
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2.5">
                <span className="text-sm font-semibold text-white/90">35%</span>
                <span className="text-xl font-black tracking-tight font-sans">₹18,400</span>
                <div className="w-8.5 h-8.5 rounded-full bg-neutral-950/80 text-white flex items-center justify-center border border-white/20 shadow-xs mt-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Shopping & Tech (Chartreuse / Gen-Z Lime from Image 1) */}
          <motion.div 
            whileHover={{ y: -6, zIndex: 30 }}
            whileTap={{ scale: 0.99 }}
            onClick={onNavigateToInsights}
            className="relative z-20 p-5 rounded-[24px] bg-[#D4F65B] text-neutral-950 shadow-[0_10px_28px_rgba(212,246,91,0.35)] border border-white/40 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Shopping & Tech</h4>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs font-medium bg-neutral-950/5 px-3 py-1 rounded-full border border-neutral-950/20">
                    8 items
                  </span>
                  <span className="text-xs font-medium bg-neutral-950/5 px-3 py-1 rounded-full border border-neutral-950/20">
                    Saved ₹1.2K
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2.5">
                <span className="text-sm font-semibold text-neutral-800">16%</span>
                <span className="text-xl font-black tracking-tight font-sans text-neutral-950">₹8,200</span>
                <div className="w-8.5 h-8.5 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-xs mt-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Rent & Housing (Royal Juspay Blue from Image 1) */}
          <motion.div 
            whileHover={{ y: -6, zIndex: 30 }}
            whileTap={{ scale: 0.99 }}
            onClick={onNavigateToInsights}
            className="relative z-30 p-5 rounded-[24px] bg-[#2563EB] text-white shadow-[0_10px_28px_rgba(37,99,235,0.38)] border border-white/25 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Rent & Housing</h4>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs font-medium bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30">
                    Fixed expense
                  </span>
                  <span className="text-xs font-medium bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full border border-white/30">
                    Paid on 1st
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2.5">
                <span className="text-sm font-semibold text-white/90">29%</span>
                <span className="text-xl font-black tracking-tight font-sans">₹15,000</span>
                <div className="w-8.5 h-8.5 rounded-full bg-neutral-950/80 text-white flex items-center justify-center border border-white/20 shadow-xs mt-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Savings & Goals (Sky Blue with Equalizer from Image 2) */}
          <motion.div 
            whileHover={{ y: -6, zIndex: 30 }}
            whileTap={{ scale: 0.99 }}
            onClick={onNavigateToInsights}
            className="relative z-40 p-5 rounded-[24px] bg-[#38BDF8] text-neutral-950 shadow-[0_12px_32px_rgba(56,189,248,0.4)] border border-white/35 cursor-pointer transition-all duration-200 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Savings & Wealth</h4>
                <span className="text-xs text-neutral-800 block mt-1">₹1,08,000 reserve • +₹12,450 this month</span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-neutral-800">73%</span>
                <div className="w-8.5 h-8.5 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-xs mt-1">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Gen-Z Barcode Equalizer Progress Indicator (from reference image) */}
            <div className="pt-1">
              <div className="flex items-center gap-[2.5px] h-3.5">
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

      {/* Editorial Insight Card Styled Exactly Like Image 1 / Image 3 */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenDrilldown}
        className="p-5 rounded-[24px] bg-[#DDD6FE] text-neutral-900 border border-purple-300/50 shadow-[0_8px_24px_rgba(221,214,254,0.4)] cursor-pointer group select-none transition-all"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold tracking-tight">Food</h4>
              <span className="text-xs font-bold text-rose-600 bg-rose-100/80 px-2.5 py-0.5 rounded-full border border-rose-200">
                ↑ 24%
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-medium mt-1">Delivery is driving it.</p>
          </div>

          <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:translate-x-0.5 transition-all">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 mt-3.5">
          <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-900">
            18 delivery orders
          </span>
          <span className="text-xs font-medium px-3.5 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-900">
            +₹3,600 vs July
          </span>
          <button 
            onClick={onOpenDrilldown}
            className="text-xs font-medium px-3.5 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-900 whitespace-nowrap inline-flex items-center gap-1 hover:bg-neutral-900/10 transition cursor-pointer"
          >
            <span>Ask Nudge why</span>
            <span>→</span>
          </button>
        </div>
      </motion.div>

      {/* Goals & Piggy Bank Section: Colorful Gen-Z Piggy Bank Vault */}
      <motion.div variants={itemVariants} className="space-y-3 pt-2 relative">
        {/* Floating Clink Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-neutral-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xl border border-white/20 whitespace-nowrap pointer-events-none"
            >
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Piggy Vault & Goals
            </h3>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-pink-700 border border-pink-200 shadow-2xs whitespace-nowrap">
              2 Jars Active
            </span>
          </div>
          <button className="text-xs font-semibold text-[#0055FF] hover:underline transition flex items-center gap-1 group cursor-pointer">
            <span>Manage</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        {/* Piggy Bank Feature Card with 3D Piggy Mascot */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF2F7] via-[#FFE4EE] to-[#FFD6E7] border border-pink-200/90 shadow-[0_8px_24px_rgba(244,114,182,0.18)] relative overflow-hidden"
        >
          {/* Subtle warm glow background */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3.5 relative z-10">
            {/* 3D Piggy Bank Avatar - small & compact */}
            <motion.div 
              animate={isPiggyBouncing ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -6, 6, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-white/90 shrink-0 bg-pink-100 relative group cursor-pointer"
              onClick={() => handleFeedPiggy("all")}
              title="Tap to feed piggy!"
            >
              <img 
                src="/images/3d-piggy-bank.jpg" 
                alt="3D Piggy Bank" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-pink-700 border border-pink-200 shadow-2xs whitespace-nowrap">
                  Smart Piggy Stash
                </span>
              </div>
              <div className="text-xl font-black text-neutral-900 tracking-tight leading-none">
                ₹{(108000 + piggyCoinsAdded + emergencyCoinsAdded).toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-neutral-600 mt-1 font-medium">
                Auto-saving spare round-ups on UPI spends
              </p>
            </div>

            {/* Quick Feed Piggy button - no coin icon */}
            <button
              onClick={() => handleFeedPiggy("tokyo")}
              className="shrink-0 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <span>+₹500</span>
            </button>
          </div>
        </motion.div>

        {/* Goal Cards List */}
        <div className="space-y-3 pt-1">
          {/* Goal 1: Tokyo Trip (Vibrant Electric Cobalt Blue Card) */}
          {(() => {
            const tokyoAmount = 68000 + piggyCoinsAdded
            const tokyoPct = Math.min(100, Math.round((tokyoAmount / 100000) * 100))
            const tokyoLeft = Math.max(0, 100000 - tokyoAmount)

            return (
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-4.5 rounded-3xl bg-[#2563EB] text-white shadow-[0_10px_28px_rgba(37,99,235,0.25)] space-y-3.5 relative overflow-hidden group"
              >
                {/* Decorative glow */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-white">
                      Tokyo Trip
                    </h4>
                    <span className="text-xs text-blue-100 font-medium block mt-0.5">
                      <strong className="text-white font-bold">₹{tokyoAmount.toLocaleString("en-IN")}</strong> of ₹1,00,000
                    </span>
                  </div>

                  <span className="text-xs font-black px-3 py-1 rounded-full bg-white text-[#2563EB] shadow-xs">
                    {tokyoPct}%
                  </span>
                </div>

                {/* Tactile Progress Track */}
                <div className="w-full h-3 bg-blue-950/40 rounded-full p-0.5 relative border border-white/20 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${tokyoPct}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-sky-300 via-white to-sky-100 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  />
                </div>

                {/* Pill Chips & Quick Add Action */}
                <div className="flex items-center justify-between pt-0.5 relative z-10">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-white/25 bg-white/15 text-white">
                      Nov 2026
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-white/25 bg-white/15 text-white">
                      ₹{tokyoLeft.toLocaleString("en-IN")} left
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-white/25 bg-white/15 text-white">
                      Piggy Target
                    </span>
                  </div>

                  <button 
                    onClick={() => handleFeedPiggy("tokyo")}
                    className="w-8 h-8 rounded-full bg-white text-[#2563EB] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer ml-2"
                    title="Add ₹500 to Tokyo Piggy"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )
          })()}

          {/* Goal 2: Emergency Fund (Vibrant Electric Lime Card) */}
          {(() => {
            const emergencyAmount = 40000 + emergencyCoinsAdded
            const emergencyPct = Math.min(100, Math.round((emergencyAmount / 100000) * 100))
            const emergencyLeft = Math.max(0, 100000 - emergencyAmount)

            return (
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-4.5 rounded-3xl bg-[#D4F65B] text-neutral-950 shadow-[0_10px_28px_rgba(212,246,91,0.25)] space-y-3.5 relative overflow-hidden group"
              >
                {/* Decorative subtle pattern */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-black/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <h4 className="text-xl font-bold tracking-tight text-neutral-950">
                      Rainy Day Piggy
                    </h4>
                    <span className="text-xs text-neutral-800 font-medium block mt-0.5">
                      <strong className="text-neutral-950 font-bold">₹{emergencyAmount.toLocaleString("en-IN")}</strong> of ₹1,00,000
                    </span>
                  </div>

                  <span className="text-xs font-black px-3 py-1 rounded-full bg-neutral-950 text-[#D4F65B] shadow-xs">
                    {emergencyPct}%
                  </span>
                </div>

                {/* Tactile Progress Track */}
                <div className="w-full h-3 bg-neutral-900/15 rounded-full p-0.5 relative border border-neutral-900/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${emergencyPct}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-neutral-950 rounded-full shadow-xs"
                  />
                </div>

                {/* Pill Chips & Quick Add Action */}
                <div className="flex items-center justify-between pt-0.5 relative z-10">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-950">
                      4 Mo. Runway
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-950">
                      ₹{emergencyLeft.toLocaleString("en-IN")} left
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-900/20 bg-neutral-900/5 text-neutral-950">
                      7.4% APY
                    </span>
                  </div>

                  <button 
                    onClick={() => handleFeedPiggy("emergency")}
                    className="w-8 h-8 rounded-full bg-neutral-950 text-[#D4F65B] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer ml-2"
                    title="Add ₹500 to Emergency Piggy"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </motion.div>
            )
          })()}
        </div>
      </motion.div>
    </motion.div>
  )
}
