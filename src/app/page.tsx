import Navigation from '@/components/navigation'
import ScrollProgressIndicator from '@/components/scroll-progress-indicator'
import HeroSection from '@/components/hero-section'
import DemoVideoSection from '@/components/demo-video-section'
import FeaturesSection from '@/components/features-section'
import PricingSection from '@/components/pricing-section'
import TestimonialsSection from '@/components/testimonials-section'
import BlogResourcesSection from '@/components/blog-resources-section'
import FAQSection from '@/components/faq-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgressIndicator />
      <Navigation />
      <HeroSection />
      <DemoVideoSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogResourcesSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
