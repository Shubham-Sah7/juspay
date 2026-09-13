"use client"

import React from "react"

interface JuspayLogoProps {
  className?: string
  size?: number
  showText?: boolean
  textColor?: string
}

export function JuspayLogoMark({ 
  className = "", 
  size = 32,
  variant = "default"
}: { 
  className?: string; 
  size?: number;
  variant?: "default" | "white";
}) {
  const leftFill = variant === "white" ? "#FFFFFF" : "#0099FF"
  const rightFill = variant === "white" ? "rgba(255, 255, 255, 0.75)" : "#0055FF"

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Crescent */}
      <path 
        d="M 50 2 C 23.49 2 2 23.49 2 50 C 2 76.51 23.49 98 50 98 C 50 98 50 82 50 72 C 37.85 72 28 62.15 28 50 C 28 37.85 37.85 28 50 28 Z" 
        fill={leftFill} 
      />
      {/* Right Crescent */}
      <path 
        d="M 50 2 C 50 2 50 18 50 28 C 62.15 28 72 37.85 72 50 C 72 62.15 62.15 72 50 72 C 50 82 50 98 50 98 C 76.51 98 98 76.51 98 50 C 98 23.49 76.51 2 50 2 Z" 
        fill={rightFill} 
      />
    </svg>
  )
}

export function JuspayLogo({ className = "", size = 28, showText = true, textColor = "#1E1E1E" }: JuspayLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Logo Icon Mark */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path 
          d="M 50 0 C 22.386 0 0 22.386 0 50 C 0 77.614 22.386 100 50 100 C 50 100 50 74 50 64 C 42.268 64 36 57.732 36 50 C 36 42.268 42.268 36 50 36 L 50 0 Z" 
          fill="#0099FF" 
        />
        <path 
          d="M 50 0 L 50 36 C 57.732 36 64 42.268 64 50 C 64 57.732 57.732 64 50 64 L 50 100 C 77.614 100 100 77.614 100 50 C 100 22.386 77.614 0 50 0 Z" 
          fill="#0055FF" 
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span 
          className="font-medium tracking-[0.18em] uppercase text-sm leading-none"
          style={{ color: textColor }}
        >
          JUSPAY
        </span>
      )}
    </div>
  )
}
