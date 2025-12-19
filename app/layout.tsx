/**
 * Root layout component for the iTÜDers tutoring website.
 * Handles global font integration (Montserrat) and provides the base structure
 * for all pages including the header component.
 */

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'iTÜDers - YKS Özel Ders',
  description: 'YKS özel ders hizmeti',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={montserrat.variable}>
        <Header />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

