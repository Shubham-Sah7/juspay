import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: "Nudge | Gen Z AI Personal Finance",
  description: "Smart, visual, playful financial assistant designed for Gen Z.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, jakarta.variable, "font-sans")}
    >
      <body className="bg-[#0A0E17] text-neutral-900 min-h-screen selection:bg-neutral-900 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

