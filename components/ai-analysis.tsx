"use client"

import { useState } from "react"
import { Brain, Check, X, AlertTriangle, Info, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Mock AI analysis results
const MOCK_ANALYSIS = {
  content:
    "BREAKING: Department of Agriculture cancels all rice subsidy programs in Mindanao regions effective immediately.",
  truthScore: 0.15,
  sourceRegion: "NCR",
  confidence: 0.87,
  officialSources: [
    {
      agency: "Department of Agriculture",
      title: "Rice Farmers Financial Assistance Program Updates",
      date: "2023-05-10",
      url: "https://da.gov.ph/programs/rffa-updates",
      contradiction: "Program is continuing with expanded coverage in Mindanao regions",
    },
    {
      agency: "Philippine Information Agency",
      title: "DA Secretary's Statement on Agricultural Programs",
      date: "2023-05-05",
      url: "https://pia.gov.ph/news/da-secretary-statement",
      contradiction: "Secretary confirmed continued support for Mindanao farmers",
    },
  ],
  patterns: [
    "Contradicts official DA statements and program documentation",
    "Uses alarmist language ('BREAKING', 'cancels all', 'effective immediately')",
    "Lacks specific details on reasons or alternatives",
    "Similar to previous false claims about agricultural programs",
  ],
  spread: {
    velocity: "High",
    regions: [
      { name: "SOCCSKSARGEN", level: "High" },
      { name: "Northern Mindanao", level: "High" },
      { name: "Davao Region", level: "Medium" },
      { name: "CARAGA", level: "Medium" },
    ],
    platforms: ["Facebook", "Messenger", "TikTok"],
    officialInfoReach: {
      SOCCSKSARGEN: "Very Low",
      "Northern Mindanao": "Low",
      "Davao Region": "Medium",
      CARAGA: "Low",
    },
  },
}

export default function AiAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("analysis")
  const [aiProgress, setAiProgress] = useState(0)

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setProgress(0)
    setAiProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setShowResults(true)
          return 100
        }
        setAiProgress(prev + 10)
        return prev + 10
      })
    }, 300)
  }

  const resetAnalysis = () => {
    setShowResults(false)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Brain size={20} className="text-purple-500" />
          <h2 className="text-lg font-medium text-gray-900">AI Analysis</h2>
        </div>

        <AnimatePresence mode="wait">
          {!isAnalyzing && !showResults ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <textarea
                className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                placeholder="Paste content to analyze for misinformation..."
                defaultValue={MOCK_ANALYSIS.content}
              />
              <Button
                onClick={startAnalysis}
                className="w-full rounded-xl h-11 bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Brain size={16} className="mr-2" />
                Compare with Official Sources
              </Button>
            </motion.div>
          ) : isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-3">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900">Analyzing Content</h3>
                <p className="text-sm text-gray-500 mt-1">Comparing with official government sources...</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>

              <div className="space-y-3 text-sm">
                {aiProgress >= 20 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Check size={16} className="text-green-500" />
                    Extracting claims from content
                  </motion.div>
                )}
                {aiProgress >= 40 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Check size={16} className="text-green-500" />
                    Comparing with official government data
                  </motion.div>
                )}
                {aiProgress >= 60 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Check size={16} className="text-green-500" />
                    Analyzing social network spread
                  </motion.div>
                )}
                {aiProgress >= 80 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <Check size={16} className="text-green-500" />
                    Mapping information gap impact
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="p-4 rounded-xl bg-red-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={24} className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-800">Confirmed Misinformation</h3>
                  <p className="text-sm text-red-600">
                    Truth Score: {(MOCK_ANALYSIS.truthScore * 100).toFixed(0)}% (Very Low)
                  </p>
                </div>
              </div>

              <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex justify-between p-1 bg-gray-100 rounded-xl h-auto">
                  <TabsTrigger
                    value="analysis"
                    className="rounded-lg flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="sources"
                    className="rounded-lg flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    Official Sources
                  </TabsTrigger>
                  <TabsTrigger
                    value="spread"
                    className="rounded-lg flex-1 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    Information Gap
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Info size={14} />
                      Source Analysis
                    </h3>
                    <div className="mt-2 p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Likely Origin:</span> {MOCK_ANALYSIS.sourceRegion}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Confidence:</span> {(MOCK_ANALYSIS.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Detected Patterns</h3>
                    <ul className="mt-2 space-y-2">
                      {MOCK_ANALYSIS.patterns.map((pattern, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <X size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <FileText size={14} />
                      Contradicting Official Sources
                    </h3>
                    <div className="mt-2 space-y-3">
                      {MOCK_ANALYSIS.officialSources.map((source, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-xl">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-500" />
                            <p className="text-sm font-medium text-gray-900">{source.agency}</p>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{source.title}</p>
                          <p className="text-xs text-gray-500 mt-1">Date: {source.date}</p>
                          <div className="mt-2 text-sm">
                            <span className="font-medium text-gray-900">Contradiction: </span>
                            <span className="text-green-700">{source.contradiction}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="spread" className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Information Gap Analysis</h3>
                    <div className="mt-2 space-y-3">
                      {MOCK_ANALYSIS.spread.regions.map((region, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-gray-900">{region.name}</p>
                            <Badge
                              variant="outline"
                              className={`${
                                MOCK_ANALYSIS.spread.officialInfoReach[
                                  region.name as keyof typeof MOCK_ANALYSIS.spread.officialInfoReach
                                ] === "Very Low" ||
                                MOCK_ANALYSIS.spread.officialInfoReach[
                                  region.name as keyof typeof MOCK_ANALYSIS.spread.officialInfoReach
                                ] === "Low"
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-yellow-50 text-yellow-600 border-yellow-200"
                              }`}
                            >
                              {
                                MOCK_ANALYSIS.spread.officialInfoReach[
                                  region.name as keyof typeof MOCK_ANALYSIS.spread.officialInfoReach
                                ]
                              }
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">Misinfo Spread:</p>
                            <Badge
                              variant="outline"
                              className={`${
                                region.level === "High"
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-orange-50 text-orange-600 border-orange-200"
                              }`}
                            >
                              {region.level}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium text-gray-900">Status: </span>
                            <span className="text-red-700">
                              {MOCK_ANALYSIS.spread.officialInfoReach[
                                region.name as keyof typeof MOCK_ANALYSIS.spread.officialInfoReach
                              ] === "Very Low" ||
                              MOCK_ANALYSIS.spread.officialInfoReach[
                                region.name as keyof typeof MOCK_ANALYSIS.spread.officialInfoReach
                              ] === "Low"
                                ? "Information Gap"
                                : "Adequate Information"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="w-full rounded-xl h-11 border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Analyze Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
