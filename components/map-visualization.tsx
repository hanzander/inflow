"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Mock data for visualization
const MOCK_MISINFORMATION_FLOWS = [
  {
    id: 1,
    source: { lat: 40.7128, lng: -74.006, region: "Northeast US" },
    spread: [
      { lat: 34.0522, lng: -118.2437, region: "West Coast US" },
      { lat: 41.8781, lng: -87.6298, region: "Midwest US" },
    ],
    topic: "Health",
    severity: "High",
  },
  {
    id: 2,
    source: { lat: 51.5074, lng: -0.1278, region: "UK" },
    spread: [
      { lat: 48.8566, lng: 2.3522, region: "France" },
      { lat: 52.52, lng: 13.405, region: "Germany" },
    ],
    topic: "Politics",
    severity: "Medium",
  },
  {
    id: 3,
    source: { lat: 35.6762, lng: 139.6503, region: "Japan" },
    spread: [
      { lat: 37.5665, lng: 126.978, region: "South Korea" },
      { lat: 39.9042, lng: 116.4074, region: "China" },
    ],
    topic: "Technology",
    severity: "Low",
  },
]

export default function MapVisualization() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedFlow, setSelectedFlow] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRegionClick = (id: number) => {
    setSelectedFlow(id === selectedFlow ? null : id)
  }

  return (
    <div className="relative flex-1 min-h-[300px] bg-slate-100">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
        </div>
      ) : (
        <div ref={mapRef} className="absolute inset-0">
          {/* This would be replaced with an actual map library in a real implementation */}
          <div className="absolute inset-0 bg-slate-200 opacity-50 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center"></div>

          {/* Render misinformation sources */}
          {MOCK_MISINFORMATION_FLOWS.map((flow) => (
            <div key={flow.id}>
              {/* Source marker */}
              <button
                className={`absolute p-1 rounded-full ${selectedFlow === flow.id ? "bg-red-500" : "bg-red-400"} text-white transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: `${((flow.source.lng + 180) / 360) * 100}%`,
                  top: `${((90 - flow.source.lat) / 180) * 100}%`,
                }}
                onClick={() => handleRegionClick(flow.id)}
                aria-label={`Misinformation source in ${flow.source.region}`}
              >
                <AlertTriangle size={16} />
              </button>

              {/* Spread markers and flow lines (only shown when selected) */}
              {selectedFlow === flow.id &&
                flow.spread.map((location, idx) => (
                  <div key={idx}>
                    {/* Flow line */}
                    <div
                      className="absolute h-px bg-red-300 origin-left"
                      style={{
                        left: `${((flow.source.lng + 180) / 360) * 100}%`,
                        top: `${((90 - flow.source.lat) / 180) * 100}%`,
                        width: `${
                          Math.sqrt(
                            Math.pow(((location.lng + 180) / 360) * 100 - ((flow.source.lng + 180) / 360) * 100, 2) +
                              Math.pow(((90 - location.lat) / 180) * 100 - ((90 - flow.source.lat) / 180) * 100, 2),
                          ) * 100
                        }%`,
                        transform: `rotate(${
                          Math.atan2(
                            ((90 - location.lat) / 180) * 100 - ((90 - flow.source.lat) / 180) * 100,
                            ((location.lng + 180) / 360) * 100 - ((flow.source.lng + 180) / 360) * 100,
                          ) *
                          (180 / Math.PI)
                        }deg)`,
                      }}
                    />

                    {/* Spread marker */}
                    <div
                      className="absolute p-1 rounded-full bg-orange-400 text-white transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${((location.lng + 180) / 360) * 100}%`,
                        top: `${((90 - location.lat) / 180) * 100}%`,
                      }}
                    >
                      <MapPin size={14} />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Information card for selected flow */}
      {selectedFlow !== null && (
        <Card className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm max-w-md mx-auto">
          <CardContent className="p-4">
            <h3 className="font-medium">Misinformation Flow #{selectedFlow}</h3>
            <p className="text-sm text-slate-600">
              Source Region: {MOCK_MISINFORMATION_FLOWS.find((f) => f.id === selectedFlow)?.source.region}
            </p>
            <p className="text-sm text-slate-600">
              Topic: {MOCK_MISINFORMATION_FLOWS.find((f) => f.id === selectedFlow)?.topic}
            </p>
            <p className="text-sm text-slate-600">
              Severity: {MOCK_MISINFORMATION_FLOWS.find((f) => f.id === selectedFlow)?.severity}
            </p>
            <div className="mt-2 text-xs text-slate-500">
              <p>Spread to regions:</p>
              <ul className="list-disc pl-5">
                {MOCK_MISINFORMATION_FLOWS.find((f) => f.id === selectedFlow)?.spread.map((location, idx) => (
                  <li key={idx}>{location.region}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
