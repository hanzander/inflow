import SubmitInfo from "@/components/submit-info"
import AppleHeader from "@/components/apple-header"

export default function SubmitPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <AppleHeader title="INFLOW" subtitle="Citizen Reporting Panel powered by #FactsFirstPH" showBackButton={true} />

      <div className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-6">
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden p-6 border">
          <SubmitInfo urlRequired={true} />
        </div>
      </div>
    </main>
  )
}
