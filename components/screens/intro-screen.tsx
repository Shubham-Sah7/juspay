"use client"

import React, { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Apple, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface IntroScreenProps {
  onContinue: () => void
}

export function IntroScreen({ onContinue }: IntroScreenProps) {
  const [renderMode, setRenderMode] = useState<"interactive" | "photo">("interactive")

  // Interactive 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-white to-[#E0F2FE] select-none overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Toggle Switch (Interactive 3D Cards vs Photorealistic Render) */}
      <div className="relative z-30 flex items-center justify-between pt-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">Onboarding Preview</span>
        <div className="flex items-center bg-neutral-200/70 p-0.5 rounded-full text-[10px] font-medium">
          <button
            onClick={() => setRenderMode("interactive")}
            className={cn(
              "px-2.5 py-0.5 rounded-full transition cursor-pointer",
              renderMode === "interactive" ? "bg-white text-neutral-900 shadow-2xs font-semibold" : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            3D Vector
          </button>
          <button
            onClick={() => setRenderMode("photo")}
            className={cn(
              "px-2.5 py-0.5 rounded-full transition cursor-pointer",
              renderMode === "photo" ? "bg-white text-neutral-900 shadow-2xs font-semibold" : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            3D Render
          </button>
        </div>
      </div>

      {/* Center 3D Folders Visual */}
      <div className="flex-1 flex items-center justify-center relative my-auto py-4">
        {renderMode === "photo" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[280px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,100,255,0.18)] border border-white/60 bg-white"
          >
            <img 
              src="/images/intro-screen.jpg" 
              alt="All your finances managed in one app"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        ) : (
          <motion.div 
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative w-full max-w-[290px] h-[260px] flex items-center justify-center"
          >
            {/* Card 1: Back (Health - Green) */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="absolute top-2 right-3 w-[230px] h-[155px] bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white rounded-[22px] p-4 shadow-[0_12px_28px_rgba(34,197,94,0.32)] border border-white/30 cursor-pointer"
            >
              {/* Folder Tab Shape */}
              <div className="absolute -top-3.5 left-4 px-4 py-1 bg-[#22C55E] text-white text-[11px] font-bold rounded-t-xl border-t border-x border-white/30">
                Health
              </div>
              <div className="pt-2">
                <span className="text-xs font-semibold text-white/90 block">Health & Wellness</span>
                <span className="text-xl font-bold font-sans mt-1 block">₹420.00</span>
                <span className="text-[10px] text-white/75 mt-0.5 block">spent this month</span>
              </div>
            </motion.div>

            {/* Card 2: Middle (Shopping - Yellow/Amber) */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="absolute top-10 left-5 w-[240px] h-[165px] bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-white rounded-[24px] p-4.5 shadow-[0_16px_36px_rgba(245,158,11,0.35)] border border-white/35 cursor-pointer z-10"
            >
              {/* Folder Tab Shape */}
              <div className="absolute -top-3.5 left-4 px-4 py-1 bg-[#FBBF24] text-white text-[11px] font-bold rounded-t-xl border-t border-x border-white/35">
                Shopping
              </div>
              <div className="pt-2">
                <span className="text-xs font-semibold text-white/95 block">Shopping</span>
                <span className="text-2xl font-black font-sans mt-1 block">₹850.20</span>
                <span className="text-[10px] text-white/80 mt-0.5 block">spent this month</span>
              </div>
            </motion.div>

            {/* Card 3: Front (Groceries - Electric Blue) */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="absolute top-20 right-2 w-[255px] h-[175px] bg-gradient-to-br from-[#0084FF] to-[#0055FF] text-white rounded-[26px] p-5 shadow-[0_20px_45px_rgba(0,85,255,0.42)] border border-white/40 cursor-pointer z-20 flex flex-col justify-between"
            >
              {/* Folder Tab Shape */}
              <div className="absolute -top-4 left-5 px-4.5 py-1 bg-[#0084FF] text-white text-xs font-bold rounded-t-xl border-t border-x border-white/40">
                Groceries
              </div>
              <div>
                <span className="text-sm font-bold text-white/95 block leading-tight">Groceries</span>
                <span className="text-3xl font-black font-sans tracking-tight mt-1.5 block">₹1,489.57</span>
                <span className="text-xs text-white/85 mt-0.5 block">spent this month</span>
              </div>

              {/* Bottom Tag */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-medium bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/30">
                  24 orders
                </span>
                <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Bottom Typography & Apple Button */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="space-y-6 pt-2 pb-2 relative z-30 text-center"
      >
        <div>
          <h2 className="text-2xl font-normal text-neutral-800 tracking-tight leading-tight">
            All your finances, managed
          </h2>
          <h1 className="text-4xl font-black text-neutral-950 tracking-tight mt-0.5">
            in one app.
          </h1>
        </div>

        {/* Action Button: Apple Pill Button */}
        <div className="space-y-2.5 max-w-[320px] mx-auto">
          <motion.button 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full py-4 px-6 rounded-full bg-neutral-950 hover:bg-neutral-900 text-white flex items-center justify-center gap-2.5 text-sm font-semibold shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
          >
            <Apple className="w-4.5 h-4.5 fill-current" />
            <span>Continue with Apple</span>
          </motion.button>

          <button 
            onClick={onContinue}
            className="text-xs text-neutral-500 hover:text-neutral-900 font-medium transition cursor-pointer"
          >
            or Continue with Juspay Pay →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
