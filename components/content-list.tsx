"use client"

import { useState, useRef } from "react"
import { Search, AlertTriangle, TrendingUp, Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// Category color mapping
const CATEGORY_COLORS = {
  health: {
    bg: "bg-red-100 dark:bg-red-900",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-800",
  },
  education: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  agriculture: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-200 dark:border-green-800",
  },
  infrastructure: {
    bg: "bg-amber-100 dark:bg-amber-900",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  "disaster response": {
    bg: "bg-orange-100 dark:bg-orange-900",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
  social: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  finance: {
    bg: "bg-emerald-100 dark:bg-emerald-900",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  default: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-700 dark:text-gray-300",
    border: "border-gray-200 dark:border-gray-700",
  },
}

// Helper function to get category colors
const getCategoryColors = (category: string) => {
  const lowerCategory = category.toLowerCase()
  return CATEGORY_COLORS[lowerCategory as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default
}

// Mock data for misinformation content
export const MISINFORMATION_CONTENT = [
  {
    id: 1,
    title: "COVID-19 Vaccine Side Effects Claim",
    content:
      "BREAKING: Health authorities admit COVID-19 vaccines cause severe neurological side effects in 30% of recipients.",
    source: "Facebook",
    date: "2023-05-15",
    veracity: "False",
    reach: 45000,
    engagement: "High",
    affectedAreas: [1, 5, 6], // NCR, Central Luzon, CALABARZON
    category: "Health",
    factChecks: [
      {
        source: "Department of Health",
        title: "Official Statement on Vaccine Safety",
        summary:
          "Actual side effect rates are below 0.05% for severe reactions according to clinical trials and monitoring data.",
        url: "https://doh.gov.ph/vaccines/safety",
      },
      {
        source: "World Health Organization",
        title: "COVID-19 Vaccine Safety Report",
        summary: "No evidence of widespread neurological effects; vaccines continue to show strong safety profile.",
        url: "https://who.int/vaccine-safety",
      },
    ],
  },
  {
    id: 2,
    title: "Agricultural Subsidy Cancellation",
    content:
      "BREAKING: Department of Agriculture cancels all rice subsidy programs in Mindanao regions effective immediately.",
    source: "TikTok",
    date: "2023-04-22",
    veracity: "False",
    reach: 28000,
    engagement: "Medium",
    affectedAreas: [12, 13, 15, 17], // Zamboanga, Northern Mindanao, SOCCSKSARGEN, BARMM
    category: "Agriculture",
    factChecks: [
      {
        source: "Department of Agriculture",
        title: "Rice Farmers Financial Assistance Program Updates",
        summary: "Program is continuing with expanded coverage in Mindanao regions.",
        url: "https://da.gov.ph/programs/rffa-updates",
      },
      {
        source: "Philippine Information Agency",
        title: "DA Secretary's Statement on Agricultural Programs",
        summary: "Secretary confirmed continued support for Mindanao farmers.",
        url: "https://pia.gov.ph/news/da-secretary-statement",
      },
    ],
  },
  {
    id: 3,
    title: "Education Budget Cuts",
    content:
      "Department of Education to cut school budgets by 40% nationwide starting next month. Teachers will face salary reductions.",
    source: "Twitter",
    date: "2023-06-10",
    veracity: "False",
    reach: 32000,
    engagement: "High",
    affectedAreas: [1, 2, 3, 4, 5], // NCR, CAR, Ilocos, Cagayan Valley, Central Luzon
    category: "Education",
    factChecks: [
      {
        source: "Department of Education",
        title: "2023-2024 Budget Clarification",
        summary: "No budget cuts planned; education budget increased by 5% compared to previous year.",
        url: "https://deped.gov.ph/budget/clarification",
      },
      {
        source: "Department of Budget and Management",
        title: "National Budget Allocation for Education",
        summary: "Education remains a top priority with increased funding for teacher salaries and facilities.",
        url: "https://dbm.gov.ph/education-budget",
      },
    ],
  },
  {
    id: 4,
    title: "Typhoon Relief Fund Misuse",
    content:
      "Leaked documents show 70% of typhoon relief funds for Bicol Region were diverted to private accounts of officials.",
    source: "Messaging Apps",
    date: "2023-07-05",
    veracity: "False",
    reach: 18000,
    engagement: "Medium",
    affectedAreas: [8], // Bicol Region
    category: "Disaster Response",
    factChecks: [
      {
        source: "Department of Social Welfare and Development",
        title: "Typhoon Relief Operations in Bicol Region",
        summary: "All funds properly accounted for with public audit reports available; no evidence of diversion.",
        url: "https://dswd.gov.ph/relief/bicol/audit",
      },
      {
        source: "Commission on Audit",
        title: "Disaster Fund Audit Report",
        summary: "Relief fund distribution followed proper protocols with complete documentation.",
        url: "https://coa.gov.ph/disaster-fund-audit",
      },
    ],
  },
  {
    id: 5,
    title: "Infrastructure Project Cancellations",
    content:
      "All major infrastructure projects in BARMM have been cancelled due to security concerns. No new projects until 2025.",
    source: "YouTube",
    date: "2023-03-18",
    veracity: "False",
    reach: 22000,
    engagement: "Medium",
    affectedAreas: [17], // BARMM
    category: "Infrastructure",
    factChecks: [
      {
        source: "Department of Public Works and Highways",
        title: "2023 Infrastructure Projects in BARMM",
        summary: "Projects continuing as scheduled with additional security measures in place.",
        url: "https://dpwh.gov.ph/projects/barmm",
      },
      {
        source: "Bangsamoro Government",
        title: "Infrastructure Development Update",
        summary: "17 major projects currently underway with 5 new projects launching next quarter.",
        url: "https://bangsamoro.gov.ph/infrastructure",
      },
    ],
  },
]

export default function ContentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredContent = MISINFORMATION_CONTENT.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())

    if (categoryFilter === "all") return matchesSearch
    return matchesSearch && item.category.toLowerCase() === categoryFilter.toLowerCase()
  })

  const handleCardClick = (id: number) => {
    setSelectedId(id)

    // Add a small delay for the animation to play before navigation
    setTimeout(() => {
      router.push(`/content/${id}`)
    }, 300)
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reported content..."
            className="pl-10 border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px] border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="agriculture">Agriculture</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="disaster response">Disaster Response</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="social">Social Welfare</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-10 w-10 text-muted" />
            <p className="mt-3 text-muted-foreground">No content found matching your search.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredContent.map((item, index) => {
              const categoryColors = getCategoryColors(item.category)

              return (
                <motion.div
                  key={item.id}
                  layoutId={`card-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      delay: index * 0.05,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCardClick(item.id)}
                >
                  <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <motion.div className="flex items-center gap-2 mb-2" layoutId={`badges-${item.id}`}>
                            <Badge
                              variant="outline"
                              className="bg-destructive/10 text-destructive border-destructive/20"
                            >
                              False Information
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}
                            >
                              {item.category}
                            </Badge>
                          </motion.div>
                          <motion.h3
                            className="font-medium text-lg text-card-foreground mb-2"
                            layoutId={`title-${item.id}`}
                          >
                            {item.title}
                          </motion.h3>
                          <motion.p
                            className="text-sm text-muted-foreground line-clamp-2 mb-3"
                            layoutId={`content-${item.id}`}
                          >
                            {item.content}
                          </motion.p>

                          <motion.div
                            className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground"
                            layoutId={`meta-${item.id}`}
                          >
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp size={12} className="mr-1" />
                              <span>Reach: {item.reach.toLocaleString()}</span>
                            </div>
                            <div>
                              <span>Source: {item.source}</span>
                            </div>
                          </motion.div>
                        </div>

                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" className="rounded-full self-end">
                            <ArrowRight size={18} />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
