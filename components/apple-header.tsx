"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, useScroll, useTransform } from "framer-motion"
import InflowLogo from "@/components/inflow-logo"

interface AppleHeaderProps {
  title?: string
  subtitle?: string
  showBackButton?: boolean
  backUrl?: string
  showReportButton?: boolean
  showLogo?: boolean
}

export default function AppleHeader({
  title,
  subtitle,
  showBackButton = false,
  backUrl = "/",
  showReportButton = false,
  showLogo = false,
}: AppleHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  const headerBgOpacity = useTransform(scrollY, [0, 50], [0.5, 0.9])
  const titleScale = useTransform(scrollY, [0, 50], [1, 0.95])
  const titleY = useTransform(scrollY, [0, 50], [0, -3])
  const subtitleOpacity = useTransform(scrollY, [0, 30], [1, 0.7])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-10 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-b" : "border-b-transparent"
      }`}
      style={{
        backgroundColor: `hsla(var(--card) / ${headerBgOpacity})`,
      }}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center p-6">
        <div>
          {showBackButton && (
            <Link href={backUrl} className="text-muted-foreground hover:text-card-foreground text-sm mb-1 inline-block">
              <span className="flex items-center">
                <ArrowLeft size={14} className="mr-1" />
                Back
              </span>
            </Link>
          )}
          {showLogo ? (
            <InflowLogo size="md" />
          ) : (
            <>
              <motion.h1
                className="text-xl sm:text-2xl font-medium text-card-foreground"
                style={{
                  scale: titleScale,
                  y: titleY,
                }}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p className="text-sm text-muted-foreground mt-1" style={{ opacity: subtitleOpacity }}>
                  {subtitle}
                </motion.p>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {showReportButton && (
            <Link href="/submit">
              <Button className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <FileText size={16} className="mr-2" />
                Report Content
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}
