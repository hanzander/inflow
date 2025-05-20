import { MISINFORMATION_CONTENT } from "@/components/content-list"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContentMap from "@/components/content-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PHILIPPINES_REGIONS } from "@/components/philippines-map"
import AppleHeader from "@/components/apple-header"
import FalseInfoChecker from "@/components/false-info-checker"

// Mock data for false info sources
const FALSE_INFO_SOURCES = [
  {
    id: 1,
    sources: [
      {
        platform: "Facebook",
        url: "https://example.com/facebook-post",
        engagement: 12500,
        date: "2023-05-14",
      },
      {
        platform: "Twitter",
        url: "https://example.com/twitter-post",
        engagement: 8700,
        date: "2023-05-15",
      },
    ],
    indicators: [
      "Uses alarmist language ('BREAKING', 'admit')",
      "Cites unnamed 'health authorities' without specific references",
      "Claims an implausibly high side effect rate (30%)",
      "Contradicts all official health data and clinical trials",
    ],
  },
  {
    id: 2,
    sources: [
      {
        platform: "TikTok",
        url: "https://example.com/tiktok-video",
        engagement: 22300,
        date: "2023-04-21",
      },
      {
        platform: "Facebook",
        url: "https://example.com/facebook-share",
        engagement: 5700,
        date: "2023-04-22",
      },
    ],
    indicators: [
      "Uses urgent language ('BREAKING', 'effective immediately')",
      "Makes absolute claims ('all rice subsidy programs')",
      "Lacks any official sources or documentation",
      "Contradicts ongoing government programs",
    ],
  },
  {
    id: 3,
    sources: [
      {
        platform: "Twitter",
        url: "https://example.com/twitter-thread",
        engagement: 18900,
        date: "2023-06-09",
      },
      {
        platform: "Messaging Apps",
        url: "https://example.com/message-screenshot",
        engagement: 13100,
        date: "2023-06-10",
      },
    ],
    indicators: [
      "Makes specific numerical claims without sources ('40%')",
      "Presents future events as certain ('will face')",
      "Lacks any official documentation or statements",
      "Contradicts published budget information",
    ],
  },
  {
    id: 4,
    sources: [
      {
        platform: "Messaging Apps",
        url: "https://example.com/message-chain",
        engagement: 9800,
        date: "2023-07-04",
      },
      {
        platform: "Facebook",
        url: "https://example.com/facebook-group",
        engagement: 8200,
        date: "2023-07-05",
      },
    ],
    indicators: [
      "References 'leaked documents' without providing them",
      "Makes precise percentage claims ('70%')",
      "Uses emotionally charged language ('diverted', 'private accounts')",
      "Contradicts public audit records",
    ],
  },
  {
    id: 5,
    sources: [
      {
        platform: "YouTube",
        url: "https://example.com/youtube-video",
        engagement: 15600,
        date: "2023-03-17",
      },
      {
        platform: "Twitter",
        url: "https://example.com/twitter-space",
        engagement: 6400,
        date: "2023-03-18",
      },
    ],
    indicators: [
      "Makes absolute claims ('All major infrastructure projects')",
      "Provides specific future date without evidence ('until 2025')",
      "Cites 'security concerns' without specifics",
      "Contradicts ongoing project documentation",
    ],
  },
]

export default function ContentPage({ params }: { params: { id: string } }) {
  const contentId = Number.parseInt(params.id)
  const content = MISINFORMATION_CONTENT.find((item) => item.id === contentId)
  const falseInfoData = FALSE_INFO_SOURCES.find((item) => item.id === contentId)

  if (!content || !falseInfoData) {
    notFound()
  }

  // Get affected area names
  const affectedAreas = content.affectedAreas.map((areaId) => {
    const region = PHILIPPINES_REGIONS.find((r) => r.id === areaId)
    return region?.name || "Unknown"
  })

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AppleHeader title={content.title} subtitle="False Information Report" showBackButton={true} backUrl="/" />

      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-6 space-y-8">
        {/* Content details */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden border p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{content.date}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>Reach: {content.reach.toLocaleString()}</span>
              </div>
              <div>
                <span>Source: {content.source}</span>
              </div>
              <div>
                <span>Category: {content.category}</span>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <p className="text-card-foreground">{content.content}</p>
            </div>
          </div>
        </div>

        {/* False Info Checker */}
        <FalseInfoChecker
          title="Misinformation Analysis"
          content="Our AI system has analyzed this content and identified it as false information based on the following indicators:"
          sources={falseInfoData.sources}
          indicators={falseInfoData.indicators}
        />

        {/* Map visualization */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-card-foreground">Spread Analysis</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Areas where this content has been shared and engaged with
            </p>
          </div>
          <div className="h-[400px]">
            <ContentMap affectedAreas={content.affectedAreas} />
          </div>
          <div className="p-4 border-t bg-muted/50">
            <h3 className="text-sm font-medium text-card-foreground mb-2">Affected Areas:</h3>
            <div className="flex flex-wrap gap-2">
              {affectedAreas.map((area, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-inflow-purple-100 text-inflow-purple-700 border-inflow-purple-200 dark:bg-inflow-purple-900 dark:text-inflow-purple-300 dark:border-inflow-purple-800"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Fact checks */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-card-foreground flex items-center gap-2">
              <CheckCircle size={18} className="text-inflow-blue-500 dark:text-inflow-blue-400" />
              Fact Checks
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Official sources that contradict this information</p>
          </div>
          <div className="divide-y">
            {content.factChecks.map((factCheck, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-card-foreground">{factCheck.title}</h3>
                    <p className="text-sm text-muted-foreground">{factCheck.source}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                  >
                    Verified Source
                  </Badge>
                </div>
                <p className="text-sm text-card-foreground mb-4">{factCheck.summary}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={factCheck.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="mr-2" />
                    View Source
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Reach data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp size={18} className="text-inflow-purple-500 dark:text-inflow-purple-400" />
              Spread Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Total Reach</p>
                  <p className="text-2xl font-medium text-card-foreground">{content.reach.toLocaleString()}</p>
                </div>
                <div className="bg-muted p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Engagement</p>
                  <p className="text-2xl font-medium text-card-foreground">{content.engagement}</p>
                </div>
                <div className="bg-muted p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Affected Areas</p>
                  <p className="text-2xl font-medium text-card-foreground">{content.affectedAreas.length}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-card-foreground mb-3">Spread Pattern</h3>
                <p className="text-sm text-muted-foreground">
                  This content originated on {content.source} and spread primarily through shares and reposts. The
                  highest engagement was observed in {affectedAreas[0]}, with significant spread to
                  {affectedAreas.length > 1 ? ` ${affectedAreas.slice(1).join(", ")}` : ""}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
