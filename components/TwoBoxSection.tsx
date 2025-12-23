/**
 * Two Box Section component for the iTÜDers tutoring website.
 * Displays two stacked boxes - top box with purple background and bottom box with CTA blue background.
 * Each box is similar in style to the Hero section boxes.
 * The section is half the length of other pages (37.5vh total).
 */

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'

export default function TwoBoxSection() {
  return (
    <section className="flex justify-center items-center pb-8 pt-0 w-full min-h-[75vh] relative overflow-x-hidden bg-[#fafafa]">
      <div className="w-[95%] max-w-[1400px] mx-auto flex flex-col gap-6 min-h-[75vh]">
        {/* Top Box - Purple */}
        <div className="bg-[#3D3072] rounded-[30px] flex-1 h-[45%] flex items-center justify-center p-8 relative overflow-hidden">
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-[#fafafa]">
            <h2 className="font-bold text-white text-[clamp(1.5rem,4vw,2.5rem)] leading-[1.2] mb-4">
              Başarıya Giden Yolda İlk Adımı Atın
            </h2>
            <p className="font-medium text-[1.1rem] max-w-[600px] mb-6">
              Ücretsiz deneme dersi için bugün kayıt olun
            </p>
            <div className="flex gap-4 items-center justify-center">
              <a 
                href="https://wa.me/905551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-[#3D3072] py-2.5 px-6 text-sm font-bold rounded-[12px] border-none transition-all duration-200 hover:-translate-y-0.5 cursor-pointer inline-block whitespace-nowrap"
              >
                Bize WhatsApp'tan ulaşın
              </a>
              <a 
                href="https://wa.me/905551839644?text=Arama%20bekliyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5A6DA4] text-white py-2.5 px-6 text-sm font-bold rounded-[12px] border-none transition-all duration-200 hover:-translate-y-0.5 cursor-pointer inline-block whitespace-nowrap"
              >
                Sizi Arayalım
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Box - CTA Blue */}
        <div className="bg-[#5A6DA4] rounded-[30px] flex-1 min-h-[55%] flex items-start justify-center p-8 pb-12 relative overflow-hidden">
          <div className="w-full h-full flex flex-col justify-start text-white">
            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
              {/* Company Information */}
              <div className="flex flex-col">
                <div className="flex items-center mb-4 overflow-hidden">
                  <Image
                    src="/ALogo.png"
                    alt="iTÜDers Logo"
                    height={56}
                    width={224}
                    className="h-14 w-auto rounded-lg object-cover"
                  />
                </div>
                <p className="text-white text-base font-medium leading-relaxed mt-2">
                  Başarı yolculuğunuzda en önemli yoldaşınız. Derece öğrencilerinden ev konforunda özel ders.
                </p>
              </div>

              {/* Hızlı Linkler */}
              <div className="flex flex-col">
                <h3 className="font-bold text-white mb-4 text-lg">Hızlı Linkler</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-white text-base font-medium hover:underline">Ana Sayfa</Link>
                  <a href="#paketler" className="text-white text-base font-medium hover:underline">Paketler</a>
                  <a href="#neden-biz" className="text-white text-base font-medium hover:underline">Neden Biz</a>
                  <a href="#sss" className="text-white text-base font-medium hover:underline">SSS</a>
                </div>
              </div>

              {/* İletişim */}
              <div className="flex flex-col">
                <h3 className="font-bold text-white mb-4 text-lg">İletişim</h3>
                <div className="flex flex-col gap-2">
                  <a href="mailto:info@ituders.com" className="text-white text-base font-medium hover:underline">info@ituders.com</a>
                  <a 
                    href="https://wa.me/905551839644?text=İTÜDers%20paketleri%20hakkında%20daha%20fazla%20bilgi%20alabilir%20miyim?" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-base font-medium hover:underline"
                  >
                    0 555 183 96 44
                  </a>
                  <a href="https://wa.me/905551234567" className="text-white text-base font-medium hover:underline">WhatsApp Destek</a>
                  <Link href="/gizlilik-politikasi" className="text-white text-base font-medium hover:underline">Gizlilik Politikası</Link>
                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="flex flex-col">
                <h3 className="font-bold text-white mb-4 text-lg">Sosyal Medya</h3>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/itu.ders/" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-3 w-fit transition-colors border border-white/20">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                  </a>
                  <a href="https://www.facebook.com/people/İTÜDers/61585232378841/" target="_blank" rel="noopener noreferrer" className="inline-block">
                    <div className="bg-white/10 hover:bg-white/20 rounded-lg p-3 w-fit transition-colors border border-white/20">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

