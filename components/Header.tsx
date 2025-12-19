/**
 * Header component for the iTÜDers tutoring website.
 * Displays the logo on the left and two action buttons on the right.
 * Implements flexbox layout with space-between alignment for corner-to-corner spacing.
 */

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-color)] pt-2.5 pb-1">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-[95%] max-w-[1400px] mx-auto">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/ALogo.png"
            alt="iTÜDers Logo"
            height={100}
            width={400}
            priority
            className="h-[100px] w-auto"
          />
        </Link>

        {/* Navigation Links - Center */}
        <nav className="hidden md:flex gap-6 items-center justify-center">
          <a href="#paketler" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
            Paketler
          </a>
          <a href="#neden-biz" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
            Neden Biz
          </a>
          <a href="#sss" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
            SSS
          </a>
          <a href="#iletisim" className="text-gray-600 font-medium hover:text-gray-900 transition-colors">
            İletişim
          </a>
        </nav>

        {/* Button Container */}
        <nav className="flex gap-5 justify-end">
          {/* Button: Ücretsiz Deneme Dersi */}
          <Link
            href="/deneme-dersi"
            className="px-3 py-1.5 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-semibold text-white transition-all duration-200 hover:brightness-90 shadow-lg hover:shadow-xl relative overflow-hidden inline-block"
            style={{ 
              backgroundColor: 'var(--primary-btn)',
              boxShadow: '0 10px 25px -5px rgba(90, 109, 164, 0.4), 0 0 0 1px rgba(90, 109, 164, 0.1)'
            }}
          >
            <span className="relative z-10">Ücretsiz Deneme Dersi</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
        </nav>
      </div>
    </header>
  )
}

