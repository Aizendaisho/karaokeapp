import { Navbar } from '@/components/layout/Navbar'
import { HeroBanner } from '@/components/landing/HeroBanner'
import { FeatureCards } from '@/components/landing/FeatureCards'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <FeatureCards />
      <TestimonialsSection />
    </div>
  )
}