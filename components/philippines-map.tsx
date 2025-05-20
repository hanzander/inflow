"use client"

import { useEffect, useState, useRef } from "react"
import { AlertTriangle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// Updated Philippines regions with more accurate coordinates
export const PHILIPPINES_REGIONS = [
  { id: 1, name: "NCR", center: { x: 52, y: 42 }, radius: 3 },
  { id: 2, name: "CAR", center: { x: 48, y: 32 }, radius: 4 },
  { id: 3, name: "Ilocos Region", center: { x: 45, y: 28 }, radius: 5 },
  { id: 4, name: "Cagayan Valley", center: { x: 53, y: 25 }, radius: 5 },
  { id: 5, name: "Central Luzon", center: { x: 50, y: 37 }, radius: 5 },
  { id: 6, name: "CALABARZON", center: { x: 54, y: 47 }, radius: 5 },
  { id: 7, name: "MIMAROPA", center: { x: 45, y: 55 }, radius: 5 },
  { id: 8, name: "Bicol Region", center: { x: 62, y: 52 }, radius: 5 },
  { id: 9, name: "Western Visayas", center: { x: 42, y: 65 }, radius: 5 },
  { id: 10, name: "Central Visayas", center: { x: 52, y: 68 }, radius: 4 },
  { id: 11, name: "Eastern Visayas", center: { x: 60, y: 63 }, radius: 4 },
  { id: 12, name: "Zamboanga Peninsula", center: { x: 30, y: 75 }, radius: 4 },
  { id: 13, name: "Northern Mindanao", center: { x: 42, y: 78 }, radius: 4 },
  { id: 14, name: "Davao Region", center: { x: 52, y: 82 }, radius: 5 },
  { id: 15, name: "SOCCSKSARGEN", center: { x: 45, y: 85 }, radius: 4 },
  { id: 16, name: "CARAGA", center: { x: 58, y: 75 }, radius: 4 },
  { id: 17, name: "BARMM", center: { x: 35, y: 82 }, radius: 5 },
]

// Mock data for information deserts
const INFO_DESERT_DATA = [
  {
    id: 1,
    regionId: 7,
    topic: "COVID-19 Vaccination",
    misinfoLevel: "High",
    officialInfoReach: "Low",
    desertSeverity: "Critical",
  },
  {
    id: 2,
    regionId: 12,
    topic: "Agricultural Subsidies",
    misinfoLevel: "Medium",
    officialInfoReach: "Low",
    desertSeverity: "High",
  },
  {
    id: 3,
    regionId: 17,
    topic: "Infrastructure Projects",
    misinfoLevel: "High",
    officialInfoReach: "Very Low",
    desertSeverity: "Critical",
  },
  {
    id: 4,
    regionId: 8,
    topic: "Disaster Relief",
    misinfoLevel: "Medium",
    officialInfoReach: "Medium",
    desertSeverity: "Moderate",
  },
  {
    id: 5,
    regionId: 4,
    topic: "Education Budget",
    misinfoLevel: "Medium",
    officialInfoReach: "Low",
    desertSeverity: "High",
  },
]

// Mock data for misinformation flow
const MISINFO_FLOW = [
  {
    id: 1,
    source: 5, // Central Luzon
    targets: [1, 2, 6], // NCR, CAR, CALABARZON
    topic: "COVID-19 Vaccine Side Effects",
  },
  {
    id: 2,
    source: 1, // NCR
    targets: [5, 6, 7, 8], // Central Luzon, CALABARZON, MIMAROPA, Bicol
    topic: "Government Budget Allocation",
  },
  {
    id: 3,
    source: 17, // BARMM
    targets: [12, 13, 15], // Zamboanga, Northern Mindanao, SOCCSKSARGEN
    topic: "Peace Process Updates",
  },
]

export default function PhilippinesMap() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [viewMode, setViewMode] = useState<"deserts" | "flow">("deserts")
  const svgRef = useRef<SVGSVGElement>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

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
    if (viewMode === "deserts") {
      const desert = INFO_DESERT_DATA.find((d) => d.regionId === regionId)
      if (!desert) return "fill-inflow-purple-100 dark:fill-inflow-purple-900"

      switch (desert.desertSeverity) {
        case "Critical":
          return "fill-inflow-purple-500 dark:fill-inflow-purple-400"
        case "High":
          return "fill-inflow-purple-400 dark:fill-inflow-purple-500"
        case "Moderate":
          return "fill-inflow-purple-300 dark:fill-inflow-purple-600"
        default:
          return "fill-inflow-purple-100 dark:fill-inflow-purple-900"
      }
    } else {
      // Flow view mode
      const isSource = MISINFO_FLOW.some((flow) => flow.source === regionId)
      const isTarget = MISINFO_FLOW.some((flow) => flow.targets.includes(regionId))

      if (isSource) return "fill-inflow-blue-500 dark:fill-inflow-blue-400"
      if (isTarget) return "fill-inflow-blue-400 dark:fill-inflow-blue-500"
      return "fill-inflow-purple-100 dark:fill-inflow-purple-900"
    }
  }

  const getSelectedDesertInfo = () => {
    if (!selectedRegion) return null
    return INFO_DESERT_DATA.find((d) => d.regionId === selectedRegion)
  }

  const getSelectedFlowInfo = () => {
    if (!selectedRegion) return null

    const asSource = MISINFO_FLOW.find((flow) => flow.source === selectedRegion)
    const asTarget = MISINFO_FLOW.filter((flow) => flow.targets.includes(selectedRegion))

    return { asSource, asTarget }
  }

  const selectedRegionName = selectedRegion ? PHILIPPINES_REGIONS.find((r) => r.id === selectedRegion)?.name : null

  return (
    <div className="relative w-full h-full bg-card">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-muted-foreground border-t-primary animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="bg-card/90 backdrop-blur-sm rounded-full p-1 shadow-sm border">
              <Button
                size="sm"
                variant={viewMode === "deserts" ? "default" : "ghost"}
                onClick={() => setViewMode("deserts")}
                className="rounded-full h-8 px-3 text-xs"
              >
                <AlertTriangle size={12} className="mr-1" />
                Info Gaps
              </Button>
              <Button
                size="sm"
                variant={viewMode === "flow" ? "default" : "ghost"}
                onClick={() => setViewMode("flow")}
                className="rounded-full h-8 px-3 text-xs"
              >
                <Info size={12} className="mr-1" />
                Info Flow
              </Button>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* Philippines map with more accurate shape */}
            <svg ref={svgRef} viewBox="0 0 100 100" className="w-full h-full max-w-md">
              {/* Luzon */}
              <path
                d="M45,20 Q50,15 55,20 Q60,25 58,30 Q56,35 58,40 Q60,45 55,50 Q50,55 45,50 Q40,45 42,40 Q44,35 42,30 Q40,25 45,20 Z"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="0.5"
                className="opacity-30"
              />

              {/* Visayas */}
              <path
                d="M40,55 Q45,53 50,55 Q55,57 60,55 Q65,53 70,55 Q65,60 60,65 Q55,67 50,65 Q45,63 40,65 Q35,67 30,65 Q35,60 40,55 Z"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="0.5"
                className="opacity-30"
              />

              {/* Mindanao */}
              <path
                d="M30,70 Q40,65 50,70 Q60,75 70,70 Q65,80 60,85 Q50,90 40,85 Q35,80 30,70 Z"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="0.5"
                className="opacity-30"
              />

              {/* Render flow lines in flow mode */}
              {viewMode === "flow" &&
                MISINFO_FLOW.map((flow) => {
                  const sourceRegion = PHILIPPINES_REGIONS.find((r) => r.id === flow.source)
                  if (!sourceRegion) return null

                  return flow.targets.map((targetId) => {
                    const targetRegion = PHILIPPINES_REGIONS.find((r) => r.id === targetId)
                    if (!targetRegion) return null

                    return (
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        key={`${flow.id}-${targetId}`}
                        x1={sourceRegion.center.x}
                        y1={sourceRegion.center.y}
                        x2={targetRegion.center.x}
                        y2={targetRegion.center.y}
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                        strokeDasharray="0.5,0.5"
                        markerEnd="url(#arrow)"
                      />
                    )
                  })
                })}

              {/* Render regions */}
              {PHILIPPINES_REGIONS.map((region) => (
                <g key={region.id}>
                  <motion.circle
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: region.id * 0.03 }}
                    cx={region.center.x}
                    cy={region.center.y}
                    r={region.radius}
                    className={`${getRegionColor(region.id)} ${
                      selectedRegion === region.id ? "stroke-2 stroke-primary" : ""
                    } cursor-pointer transition-colors duration-200 shadow-sm`}
                    onClick={() => handleRegionClick(region.id, region.center.x, region.center.y)}
                  />
                  <text
                    x={region.center.x}
                    y={region.center.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[2px] fill-card-foreground font-medium pointer-events-none"
                  >
                    {region.name.substring(0, 3)}
                  </text>
                </g>
              ))}

              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-xl shadow-sm text-xs border">
            <h4 className="font-medium mb-2 text-card-foreground">Legend</h4>
            {viewMode === "deserts" ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-purple-500 dark:bg-inflow-purple-400"></div>
                  <span className="text-card-foreground">Critical Info Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-purple-400 dark:bg-inflow-purple-500"></div>
                  <span className="text-card-foreground">High Info Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-purple-300 dark:bg-inflow-purple-600"></div>
                  <span className="text-card-foreground">Moderate Info Gap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-purple-100 dark:bg-inflow-purple-900"></div>
                  <span className="text-card-foreground">No Data</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-blue-500 dark:bg-inflow-blue-400"></div>
                  <span className="text-card-foreground">Misinfo Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-blue-400 dark:bg-inflow-blue-500"></div>
                  <span className="text-card-foreground">Affected Region</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-inflow-purple-100 dark:bg-inflow-purple-900"></div>
                  <span className="text-card-foreground">Unaffected</span>
                </div>
              </div>
            )}
          </div>

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

                  {viewMode === "deserts" && getSelectedDesertInfo() ? (
                    <div className="mt-3 space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Topic:</span>
                        <span className="font-medium text-card-foreground">{getSelectedDesertInfo()?.topic}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Misinfo Level:</span>
                        <Badge
                          variant="outline"
                          className={`${
                            getSelectedDesertInfo()?.misinfoLevel === "High"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : getSelectedDesertInfo()?.misinfoLevel === "Medium"
                                ? "bg-inflow-blue-100 text-inflow-blue-700 border-inflow-blue-200 dark:bg-inflow-blue-900 dark:text-inflow-blue-300 dark:border-inflow-blue-800"
                                : "bg-inflow-purple-100 text-inflow-purple-700 border-inflow-purple-200 dark:bg-inflow-purple-900 dark:text-inflow-purple-300 dark:border-inflow-purple-800"
                          }`}
                        >
                          {getSelectedDesertInfo()?.misinfoLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Official Info Reach:</span>
                        <Badge
                          variant="outline"
                          className={`${
                            getSelectedDesertInfo()?.officialInfoReach === "Low" ||
                            getSelectedDesertInfo()?.officialInfoReach === "Very Low"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : getSelectedDesertInfo()?.officialInfoReach === "Medium"
                                ? "bg-inflow-blue-100 text-inflow-blue-700 border-inflow-blue-200 dark:bg-inflow-blue-900 dark:text-inflow-blue-300 dark:border-inflow-blue-800"
                                : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                          }`}
                        >
                          {getSelectedDesertInfo()?.officialInfoReach}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Gap Severity:</span>
                        <Badge
                          variant="outline"
                          className={`${
                            getSelectedDesertInfo()?.desertSeverity === "Critical"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : getSelectedDesertInfo()?.desertSeverity === "High"
                                ? "bg-inflow-blue-100 text-inflow-blue-700 border-inflow-blue-200 dark:bg-inflow-blue-900 dark:text-inflow-blue-300 dark:border-inflow-blue-800"
                                : "bg-inflow-purple-100 text-inflow-purple-700 border-inflow-purple-200 dark:bg-inflow-purple-900 dark:text-inflow-purple-300 dark:border-inflow-purple-800"
                          }`}
                        >
                          {getSelectedDesertInfo()?.desertSeverity}
                        </Badge>
                      </div>
                    </div>
                  ) : viewMode === "flow" ? (
                    <div className="mt-3 space-y-3 text-sm">
                      {getSelectedFlowInfo()?.asSource ? (
                        <div>
                          <div className="flex items-center gap-1 text-inflow-blue-600 dark:text-inflow-blue-400">
                            <AlertTriangle size={14} />
                            <span className="font-medium">Misinformation Source</span>
                          </div>
                          <p className="mt-2 text-card-foreground">Topic: {getSelectedFlowInfo()?.asSource.topic}</p>
                          <p className="mt-2 text-card-foreground">Spreading to:</p>
                          <ul className="list-disc pl-5 mt-1 text-muted-foreground space-y-1">
                            {getSelectedFlowInfo()?.asSource.targets.map((targetId) => (
                              <li key={targetId}>{PHILIPPINES_REGIONS.find((r) => r.id === targetId)?.name}</li>
                            ))}
                          </ul>
                        </div>
                      ) : getSelectedFlowInfo()?.asTarget && getSelectedFlowInfo()?.asTarget.length > 0 ? (
                        <div>
                          <div className="flex items-center gap-1 text-inflow-blue-600 dark:text-inflow-blue-400">
                            <Info size={14} />
                            <span className="font-medium">Receiving Misinformation</span>
                          </div>
                          <p className="mt-2 text-card-foreground">From sources:</p>
                          <ul className="list-disc pl-5 mt-1 text-muted-foreground space-y-1">
                            {getSelectedFlowInfo()?.asTarget.map((flow) => (
                              <li key={flow.id}>
                                {PHILIPPINES_REGIONS.find((r) => r.id === flow.source)?.name}: {flow.topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground mt-2">
                          No misinformation flow data for this region.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No data available for this region.</p>
                  )}

                  <div className="absolute w-4 h-4 bg-card border-t border-l transform rotate-45 left-1/2 -ml-2 -bottom-2"></div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
