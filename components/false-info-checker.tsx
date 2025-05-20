"use client"

import { useState } from "react"
import { AlertTriangle, ExternalLink, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface FalseInfoSource {
  platform: string
  url: string
  engagement: number
  date: string
}

interface FalseInfoCheckerProps {
  title: string
  content: string
  sources: FalseInfoSource[]
  indicators: string[]
}

export default function FalseInfoChecker({ title, content, sources, indicators }: FalseInfoCheckerProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-inflow-purple-900/10 to-inflow-purple-800/10 dark:from-inflow-purple-900/20 dark:to-inflow-purple-800/20">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle size={18} className="text-inflow-purple-600 dark:text-inflow-purple-400" />
          False Information Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 border-b">
          <h3 className="font-medium text-card-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{content}</p>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-2">Misinformation Indicators:</h4>
              <ul className="space-y-2">
                {indicators.map((indicator, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm flex items-start gap-2"
                  >
                    <X size={14} className="text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{indicator}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)} className="w-full mt-2">
              {expanded ? "Hide Sources" : "View Original Sources"}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-muted/30">
                <h4 className="text-sm font-medium text-card-foreground mb-3">Original Misinformation Sources:</h4>
                <div className="space-y-3">
                  {sources.map((source, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-3 bg-card rounded-lg border"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                            {source.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{source.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Engagement: {source.engagement.toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={source.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  <AlertTriangle size={12} className="inline mr-1 text-amber-500" />
                  Warning: These links lead to false information. They are provided for verification purposes only.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
