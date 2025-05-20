"use client"

import { motion } from "framer-motion"

interface InflowLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
}

export default function InflowLogo({ size = "md", animated = false }: InflowLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.2 }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-inflow-purple-600 to-inflow-blue-600 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2v20" />
              <path d="M2 12h20" />
              <path d="m4.93 4.93 14.14 14.14" />
              <path d="m19.07 4.93-14.14 14.14" />
            </svg>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`logo-text ${sizeClasses[size]}`}
          >
            inflow
          </motion.span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-inflow-purple-600 to-inflow-blue-600 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <path d="m4.93 4.93 14.14 14.14" />
          <path d="m19.07 4.93-14.14 14.14" />
        </svg>
      </div>
      <span className={`logo-text ${sizeClasses[size]}`}>inflow</span>
    </div>
  )
}
