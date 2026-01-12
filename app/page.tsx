import { Header } from "@/components/header"
import { SearchSection } from "@/components/search-section"
import { FeaturesSection } from "@/components/features-section"
import { DisclaimerBanner } from "@/components/disclaimer-banner"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <DisclaimerBanner />
        <SearchSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
