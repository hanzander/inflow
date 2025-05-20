"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PHILIPPINES_REGIONS } from "@/components/philippines-map"

interface ContentMapProps {
  affectedAreas: number[]
}

export default function ContentMap({ affectedAreas }: ContentMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleRegionClick = (id: number, x: number, y: number) => {
    if (id === selectedRegion) {
      setSelectedRegion(null)
      return
    }

    // Calculate popup position
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const svgWidth = svgRect.width
      const svgHeight = svgRect.height

      // Convert SVG coordinates to screen coordinates
      const screenX = (x / 100) * svgWidth
      const screenY = (y / 100) * svgHeight

      setPopupPosition({ x: screenX, y: screenY })
    }

    setSelectedRegion(id)
  }

  const getRegionColor = (regionId: number) => {
    if (affectedAreas.includes(regionId)) {
      return "fill-inflow-purple-500 dark:fill-inflow-purple-400"
    }
    return "fill-inflow-purple-100 dark:fill-inflow-purple-900"
  }

  const getRegionOpacity = (regionId: number) => {
    return affectedAreas.includes(regionId) ? 1 : 0.5
  }

  const getRegionScale = (regionId: number) => {
    return affectedAreas.includes(regionId) ? 1.1 : 1
  }

  const selectedRegionName = selectedRegion ? PHILIPPINES_REGIONS.find((r) => r.id === selectedRegion)?.name : null

  return (
    <div className="relative w-full h-full bg-card">
      {!mapLoaded ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-8 w-8 rounded-full border-2 border-muted-foreground border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Philippines map with more accurate shape */}
          <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full max-w-md">
            {/* Luzon */}
            <motion.path
              d="M45,20 Q50,15 55,20 Q60,25 58,30 Q56,35 58,40 Q60,45 55,50 Q50,55 45,50 Q40,45 42,40 Q44,35 42,30 Q40,25 45,20 Z"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="0.5"
              className="opacity-30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Visayas */}
            <motion.path
              d="M40,55 Q45,53 50,55 Q55,57 60,55 Q65,53 70,55 Q65,60 60,65 Q55,67 50,65 Q45,63 40,65 Q35,67 30,65 Q35,60 40,55 Z"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="0.5"
              className="opacity-30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Mindanao */}
            <motion.path
              d="M30,70 Q40,65 50,70 Q60,75 70,70 Q65,80 60,85 Q50,90 40,85 Q35,80 30,70 Z"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="0.5"
              className="opacity-30"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
            />

            {/* Render regions */}
            {PHILIPPINES_REGIONS.map((region) => (
              <g key={region.id}>
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: getRegionScale(region.id),
                    opacity: getRegionOpacity(region.id),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: region.id * 0.03,
                  }}
                  whileHover={{
                    scale: getRegionScale(region.id) * 1.1,
                    transition: { type: "spring", stiffness: 500, damping: 15 },
                  }}
                  whileTap={{ scale: getRegionScale(region.id) * 0.95 }}
                  cx={region.center.x}
                  cy={region.center.y}
                  r={region.radius}
                  className={`${getRegionColor(region.id)} cursor-pointer transition-colors duration-200 shadow-sm`}
                  onClick={() => handleRegionClick(region.id, region.center.x, region.center.y)}
                />
                <motion.text
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: region.id * 0.03 + 0.3 }}
                  x={region.center.x}
                  y={region.center.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[2px] fill-card-foreground font-medium pointer-events-none"
                >
                  {region.name.substring(0, 3)}
                </motion.text>
              </g>
            ))}

            {/* Draw connections between affected areas */}
            {affectedAreas.length > 1 &&
              affectedAreas.slice(0, -1).map((areaId, index) => {
                const sourceRegion = PHILIPPINES_REGIONS.find((r) => r.id === areaId)
                const targetRegion = PHILIPPINES_REGIONS.find((r) => r.id === affectedAreas[index + 1])

                if (!sourceRegion || !targetRegion) return null

                return (
                  <motion.line
                    key={`connection-${index}`}
                    x1={sourceRegion.center.x}
                    y1={sourceRegion.center.y}
                    x2={targetRegion.center.x}
                    y2={targetRegion.center.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    strokeDasharray="0.5,0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                  />
                )
              })}
          </svg>
        </motion.div>
      )}

      {/* Popup for selected region */}
      <AnimatePresence>
        {selectedRegion && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -20 }}
              exit={{ opacity: 0, scale: 0.8, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="bg-card/95 backdrop-blur-md rounded-2xl shadow-lg border p-4 w-64 transform -translate-x-1/2 pointer-events-auto"
            >
              <h3 className="font-medium text-card-foreground">{selectedRegionName}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {affectedAreas.includes(selectedRegion)
                  ? "This area has been affected by the misinformation content."
                  : "This area has not been significantly affected by this content."}
              </p>

              <div className="absolute w-4 h-4 bg-card border-t border-l transform rotate-45 left-1/2 -ml-2 -bottom-2"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
