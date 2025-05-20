"use client"

import { useState } from "react"
import { CheckCircle, Search, ExternalLink, FileText, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

// Mock data for official government sources
const OFFICIAL_SOURCES = [
  {
    id: 1,
    agency: "Department of Health (DOH)",
    title: "COVID-19 Vaccination Program Updates",
    date: "2023-05-15",
    url: "https://doh.gov.ph/vaccines",
    type: "Press Release",
    regions: ["National", "NCR", "CALABARZON"],
    reachScore: 65,
  },
  {
    id: 2,
    agency: "Department of Agriculture (DA)",
    title: "Rice Farmers Financial Assistance Program Guidelines",
    date: "2023-04-22",
    url: "https://da.gov.ph/programs/rffa",
    type: "Guidelines",
    regions: ["National", "Central Luzon", "Western Visayas"],
    reachScore: 45,
  },
  {
    id: 3,
    agency: "Department of Public Works and Highways (DPWH)",
    title: "2023 Infrastructure Projects in BARMM",
    date: "2023-03-10",
    url: "https://dpwh.gov.ph/projects/barmm",
    type: "Project Update",
    regions: ["BARMM"],
    reachScore: 25,
  },
  {
    id: 4,
    agency: "Department of Social Welfare and Development (DSWD)",
    title: "Typhoon Relief Operations in Bicol Region",
    date: "2023-06-05",
    url: "https://dswd.gov.ph/relief/bicol",
    type: "Announcement",
    regions: ["Bicol Region"],
    reachScore: 55,
  },
  {
    id: 5,
    agency: "Department of Education (DepEd)",
    title: "2023-2024 School Year Budget Allocation",
    date: "2023-02-28",
    url: "https://deped.gov.ph/budget/2023",
    type: "Budget Report",
    regions: ["National", "Cagayan Valley"],
    reachScore: 40,
  },
]

export default function OfficialSourcesPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredSources = OFFICIAL_SOURCES.filter((source) => {
    const matchesSearch =
      source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.agency.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "low-reach") return matchesSearch && source.reachScore < 50
    if (activeTab === "high-reach") return matchesSearch && source.reachScore >= 50

    return matchesSearch
  })

  const getReachBadge = (score: number) => {
    if (score >= 70)
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
        >
          High Reach
        </Badge>
      )
    if (score >= 50)
      return (
        <Badge
          variant="outline"
          className="bg-gov-blue-100 text-gov-blue-700 border-gov-blue-200 dark:bg-gov-blue-900 dark:text-gov-blue-300 dark:border-gov-blue-800"
        >
          Medium Reach
        </Badge>
      )
    return (
      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
        Low Reach
      </Badge>
    )
  }

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-medium text-card-foreground flex items-center gap-2">
        <CheckCircle size={18} className="text-gov-blue-500 dark:text-gov-blue-400" />
        Official Sources
      </h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search official sources..."
          className="pl-10 border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex justify-between p-1 bg-muted rounded-xl h-auto">
          <TabsTrigger
            value="all"
            className="rounded-lg flex-1 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
          >
            All Sources
          </TabsTrigger>
          <TabsTrigger
            value="low-reach"
            className="rounded-lg flex-1 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
          >
            Low Reach
          </TabsTrigger>
          <TabsTrigger
            value="high-reach"
            className="rounded-lg flex-1 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
          >
            High Reach
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredSources.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-muted-foreground">No official sources found matching your search.</p>
          </div>
        ) : (
          filteredSources.map((source, index) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-card-foreground">{source.title}</h3>
                      <p className="text-sm text-muted-foreground">{source.agency}</p>
                    </div>
                    {getReachBadge(source.reachScore)}
                  </div>

                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText size={12} />
                        <span>{source.type}</span>
                      </div>
                      <span>{source.date}</span>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Regions: </span>
                      <span>{source.regions.join(", ")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CheckCircle size={12} className="mr-1 text-gov-blue-500 dark:text-gov-blue-400" />
                        <span>Verified Official Source</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                        <ExternalLink size={12} className="mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
