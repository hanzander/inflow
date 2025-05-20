"use client"

import { useState } from "react"
import { Trophy, ArrowUp, ArrowDown, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Mock data for leaderboard
const LEADERBOARD_DATA = [
  {
    id: 1,
    username: "Zandermacher",
    reports: 47,
    successRate: 92,
    rank: 1,
    badges: ["Top Reporter", "Health Expert"],
    change: "up",
  },
  {
    id: 2,
    username: "Renztappen",
    reports: 38,
    successRate: 89,
    rank: 2,
    badges: ["Veteran", "Politics Expert"],
    change: "same",
  },
  {
    id: 3,
    username: "Kayemilton",
    reports: 35,
    successRate: 86,
    rank: 3,
    badges: ["Rising Star"],
    change: "up",
  },
  {
    id: 4,
    username: "Yengstroll",
    reports: 31,
    successRate: 84,
    rank: 4,
    badges: ["Education Expert"],
    change: "down",
  },
  {
    id: 5,
    username: "Karlosainz",
    reports: 29,
    successRate: 83,
    rank: 5,
    badges: ["Infrastructure Expert"],
    change: "up",
  },
  {
    id: 6,
    username: "Backstabber",
    reports: 26,
    successRate: 81,
    rank: 6,
    badges: ["Newcomer"],
    change: "up",
  },
  {
    id: 7,
    username: "TruthTracker",
    reports: 24,
    successRate: 79,
    rank: 7,
    badges: [],
    change: "down",
  },
  {
    id: 8,
    username: "RealityCheck",
    reports: 21,
    successRate: 76,
    rank: 8,
    badges: ["Agriculture Expert"],
    change: "same",
  },
  {
    id: 9,
    username: "SourceSleuth",
    reports: 19,
    successRate: 74,
    rank: 9,
    badges: [],
    change: "down",
  },
  {
    id: 10,
    username: "FactualPhil",
    reports: 17,
    successRate: 71,
    rank: 10,
    badges: ["Disaster Response Expert"],
    change: "up",
  },
]

export default function LeaderboardPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredData = LEADERBOARD_DATA.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase())
    if (filter === "all") return matchesSearch
    if (filter === "experts") return matchesSearch && user.badges.some((badge) => badge.includes("Expert"))
    if (filter === "top") return matchesSearch && user.rank <= 5
    return matchesSearch
  })

  const getRankChangeIcon = (change: string) => {
    if (change === "up") return <ArrowUp size={14} className="text-green-500" />
    if (change === "down") return <ArrowDown size={14} className="text-destructive" />
    return null
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-card-foreground flex items-center gap-2">
          <Trophy size={18} className="text-gov-blue-500 dark:text-gov-blue-400" />
          Top Reporters
        </h2>

        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] h-9 text-sm border-0 bg-muted focus:ring-0">
              <Filter size={14} className="mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reporters</SelectItem>
              <SelectItem value="experts">Experts Only</SelectItem>
              <SelectItem value="top">Top 5</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reporters..."
          className="pl-10 border focus:border-input focus:ring focus:ring-ring focus:ring-opacity-50 rounded-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted rounded-lg">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Reporter</div>
          <div className="col-span-2 text-center">Reports</div>
          <div className="col-span-3 text-center">Success Rate</div>
          <div className="col-span-2 text-right">Badges</div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reporters found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="grid grid-cols-12 gap-2 px-4 py-3 bg-card rounded-xl shadow-sm items-center border"
              >
                <div className="col-span-1 font-medium text-card-foreground flex items-center gap-1">
                  {user.rank}
                  {getRankChangeIcon(user.change)}
                </div>
                <div className="col-span-4 font-medium text-card-foreground">{user.username}</div>
                <div className="col-span-2 text-center text-muted-foreground">{user.reports}</div>
                <div className="col-span-3 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.successRate >= 85
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : user.successRate >= 75
                          ? "bg-gov-blue-100 text-gov-blue-700 dark:bg-gov-blue-900 dark:text-gov-blue-300"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.successRate}%
                  </span>
                </div>
                <div className="col-span-2 flex flex-wrap justify-end gap-1">
                  {user.badges.length > 0 ? (
                    user.badges.length === 1 ? (
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          user.badges[0].includes("Expert")
                            ? "bg-gov-purple-100 text-gov-purple-700 border-gov-purple-200 dark:bg-gov-purple-900 dark:text-gov-purple-300 dark:border-gov-purple-800"
                            : "bg-gov-blue-100 text-gov-blue-700 border-gov-blue-200 dark:bg-gov-blue-900 dark:text-gov-blue-300 dark:border-gov-blue-800"
                        }`}
                      >
                        {user.badges[0]}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted text-muted-foreground border text-xs">
                        {user.badges.length} badges
                      </Badge>
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground">-</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
