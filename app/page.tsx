/**
 * Home page component for the iTÜDers tutoring website.
 * Displays the hero section as the main content area.
 */

import Hero from '@/components/Hero'
import { Pricing } from '@/components/ui/pricing'
import { Testimonials } from '@/components/Testimonials'
import { FAQ } from '@/components/FAQ'
import TwoBoxSection from '@/components/TwoBoxSection'

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <div id="paketler">
        <Pricing 
          title="Hemen Başlayın"
          description="Sizin için en iyi planı seçin, emin değilseniz ücretsiz eğitim danışmanlığı için bize WhatsApp'tan ulaşabilirsiniz."
        />
      </div>
      <div id="neden-biz">
        <Testimonials />
      </div>
      <div id="sss">
        <FAQ />
      </div>
      <div id="iletisim">
        <TwoBoxSection />
      </div>
    </main>
  )
}

