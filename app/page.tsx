import { HeroSection } from "@/components/home/hero-section"
import { FeatureCards } from "@/components/home/feature-cards"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <FeatureCards />
    </div>
  )
}

