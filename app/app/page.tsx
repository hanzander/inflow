import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentList from "@/components/content-list"
import LeaderboardPanel from "@/components/leaderboard-panel"
import AppleHeader from "@/components/apple-header"

export default function AppPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AppleHeader showLogo={true} showReportButton={true} />

      <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="w-full flex justify-between p-1 bg-muted mb-6 rounded-xl h-auto max-w-md mx-auto">
            <TabsTrigger
              value="content"
              className="rounded-lg flex-1 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Reported Content
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="rounded-lg flex-1 py-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-0">
            <ContentList />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden border p-6">
              <LeaderboardPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
