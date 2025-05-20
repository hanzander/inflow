"use client"

import { Progress } from "@/components/ui/progress"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, Send, Upload, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import InflowLogo from "@/components/inflow-logo"

// Areas for the Philippines
const AREAS = [
  { id: 1, name: "Metro Manila" },
  { id: 2, name: "Northern Luzon" },
  { id: 3, name: "Central Luzon" },
  { id: 4, name: "Southern Luzon" },
  { id: 5, name: "Bicol" },
  { id: 6, name: "Western Visayas" },
  { id: 7, name: "Central Visayas" },
  { id: 8, name: "Eastern Visayas" },
  { id: 9, name: "Zamboanga Peninsula" },
  { id: 10, name: "Northern Mindanao" },
  { id: 11, name: "Davao Region" },
  { id: 12, name: "SOCCSKSARGEN" },
  { id: 13, name: "CARAGA" },
  { id: 14, name: "BARMM" },
  { id: 15, name: "Nationwide" },
]

interface SubmitInfoProps {
  urlRequired?: boolean
}

export default function SubmitInfo({ urlRequired = false }: SubmitInfoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false)
  const [aiProgress, setAiProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsAiAnalyzing(true)
    setAiProgress(0)

    // Simulate AI analysis progress
    const interval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAiAnalyzing(false)
          setIsSubmitting(false)
          setIsSubmitted(true)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium text-card-foreground flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          Report Misinformation
        </h2>
        <InflowLogo size="sm" />
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-sm bg-green-50 dark:bg-green-900">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="font-medium text-green-800 dark:text-green-200 text-lg">Report Submitted</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2 max-w-xs">
                  Our AI system will analyze this information and update the misinformation tracking map.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : isAiAnalyzing ? (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="font-medium text-card-foreground">AI Analysis in Progress</h3>
                  <p className="text-sm text-muted-foreground mt-1">Comparing with verified sources...</p>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-card-foreground">
                    <span>Analyzing content</span>
                    <span>{aiProgress}%</span>
                  </div>
                  <Progress value={aiProgress} className="h-1.5" />
                </div>

                <div className="space-y-3 text-sm">
                  {aiProgress >= 20 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-card-foreground"
                    >
                      <Check size={16} className="text-green-500" />
                      Extracting claims from content
                    </motion.div>
                  )}
                  {aiProgress >= 40 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-card-foreground"
                    >
                      <Check size={16} className="text-green-500" />
                      Comparing with verified sources
                    </motion.div>
                  )}
                  {aiProgress >= 60 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-card-foreground"
                    >
                      <Check size={16} className="text-green-500" />
                      Analyzing social network spread
                    </motion.div>
                  )}
                  {aiProgress >= 80 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-card-foreground"
                    >
                      <Check size={16} className="text-green-500" />
                      Mapping information spread
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="space-y-3">
              <Label htmlFor="content" className="text-card-foreground">
                Content of Suspected Misinformation
              </Label>
              <Textarea
                id="content"
                placeholder="Paste or type the suspected false information here..."
                required
                className="min-h-[100px] border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="source" className="text-card-foreground">
                  Source Platform
                </Label>
                <Select required>
                  <SelectTrigger
                    id="source"
                    className="border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
                  >
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="messaging">Messaging Apps</SelectItem>
                    <SelectItem value="news">News Website</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="area" className="text-card-foreground">
                  Primary Area
                </Label>
                <Select required>
                  <SelectTrigger
                    id="area"
                    className="border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
                  >
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {AREAS.map((area) => (
                      <SelectItem key={area.id} value={area.id.toString()}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="category" className="text-card-foreground">
                  Topic Category
                </Label>
                <Select required>
                  <SelectTrigger
                    id="category"
                    className="border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="social">Social Welfare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="disaster">Disaster Response</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="url" className="text-card-foreground">
                  URL {urlRequired ? "" : "(Optional)"}
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/post"
                  required={urlRequired}
                  className="border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-card-foreground">Upload Screenshot (Optional)</Label>
              <div className="border border-dashed border-muted rounded-xl p-6 text-center bg-muted/50">
                <Button type="button" variant="outline" size="sm" className="mx-auto">
                  <Upload size={16} className="mr-2" />
                  Select File
                </Button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG or PDF, max 5MB</p>
              </div>
            </div>

            {/* FactsFirstPH Logo */}
            <div className="flex justify-center my-6">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium mb-2">Powered by</p>
                <div className="flex justify-center">
                  <Image
                    src="/images/factsfirstph-logo.png"
                    alt="FactsFirstPH Logo"
                    width={200}
                    height={50}
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl h-11 bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
