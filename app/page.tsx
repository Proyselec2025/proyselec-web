import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ValueProposition } from "@/components/value-proposition"
import { LubricantCalculator } from "@/components/lubricant-calculator"
import { ProductCatalog } from "@/components/product-catalog"
import { SuccessCases } from "@/components/success-cases"
import { Certifications } from "@/components/certifications"
import { Testimonials } from "@/components/testimonials"
import { TechnicalBlog } from "@/components/technical-blog"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ScrollProgress } from "@/components/scroll-progress"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <SmoothScroll />
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <LubricantCalculator />
        <ProductCatalog />
        <SuccessCases />
        <Certifications />
        <Testimonials />
        <TechnicalBlog />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
