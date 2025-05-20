"use client"

import { useState } from "react"
import { AlertTriangle, Filter, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

// Mock data for information deserts
const INFO_DESERT_DATA = [
  {
    id: 1,
    region: "MIMAROPA",
    topic: "COVID-19 Vaccination",
    misinfoLevel: 85,
    officialInfoReach: 25,
    desertSeverity: "Critical",
    description:
      "False claims about vaccine side effects spreading rapidly while official DOH information has limited reach.",
  },
  {
    id: 2,
    region: "Zamboanga Peninsula",
    topic: "Agricultural Subsidies",
    misinfoLevel: 65,
    officialInfoReach: 30,
    desertSeverity: "High",
    description: "Misinformation about DA subsidy eligibility requirements spreading faster than official guidelines.",
  },
  {
    id: 3,
    region: "BARMM",
    topic: "Infrastructure Projects",
    misinfoLevel: 90,
    officialInfoReach: 15,
    desertSeverity: "Critical",
    description: "False claims about project cancellations spreading while DPWH official updates have minimal reach.",
  },
  {
    id: 4,
    region: "Bicol Region",
    topic: "Disaster Relief",
    misinfoLevel: 60,
    officialInfoReach: 45,
    desertSeverity: "Moderate",
    description: "Misinformation about relief fund allocation spreading while DSWD announcements have moderate reach.",
  },
  {
    id: 5,
    region: "Cagayan Valley",
    topic: "Education Budget",
    misinfoLevel: 70,
    officialInfoReach: 35,
    desertSeverity: "High",
    description:
      "False claims about DepEd budget cuts spreading while official budget explanations have limited reach.",
  },
]

export default function InfoPanel() {
  const [filter, setFilter] = useState("all")

  const filteredItems =
    filter === "all"
      ? INFO_DESERT_DATA
      : INFO_DESERT_DATA.filter((item) => {
          if (filter === "critical") return item.desertSeverity === "Critical"
          if (filter === "high") return item.desertSeverity === "High"
          if (filter === "moderate") return item.desertSeverity === "Moderate"
          return true
        })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-card-foreground flex items-center gap-2">
          <AlertTriangle size={18} className="text-gov-purple-500 dark:text-gov-purple-400" />
          Information Gaps
        </h2>

        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] h-9 text-sm border-0 bg-muted focus:ring-0">
              <Filter size={14} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden border shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-card-foreground">{item.region}</h3>
                    <p className="text-sm text-muted-foreground">{item.topic}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      item.desertSeverity === "Critical"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : item.desertSeverity === "High"
                          ? "bg-gov-blue-100 text-gov-blue-700 border-gov-blue-200 dark:bg-gov-blue-900 dark:text-gov-blue-300 dark:border-gov-blue-800"
                          : "bg-gov-purple-100 text-gov-purple-700 border-gov-purple-200 dark:bg-gov-purple-900 dark:text-gov-purple-300 dark:border-gov-purple-800"
                    }`}
                  >
                    {item.desertSeverity}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Misinformation Level</span>
                      <span className="font-medium text-card-foreground">{item.misinfoLevel}%</span>
                    </div>
                    <Progress
                      value={item.misinfoLevel}
                      className="h-1.5 bg-muted"
                      indicatorClassName="bg-gov-purple-500 dark:bg-gov-purple-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Official Info Reach</span>
                      <span className="font-medium text-card-foreground">{item.officialInfoReach}%</span>
                    </div>
                    <Progress
                      value={item.officialInfoReach}
                      className="h-1.5 bg-muted"
                      indicatorClassName="bg-gov-blue-500 dark:bg-gov-blue-400"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">{item.description}</p>

                  <Button variant="ghost" size="sm" className="w-full h-8 text-xs mt-1 text-muted-foreground">
                    View Details
                    <ArrowRight size={12} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
