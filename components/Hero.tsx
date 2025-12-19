/**
 * Hero section component for the iTÜDers tutoring website.
 * Provides the main visual container for hero content with a centered,
 * responsive box that takes up 75% of the viewport height.
 * Contains text content (heading and subtext) positioned on the left side,
 * slightly above center, with premium typography styling.
 * Includes a white rectangular box on the right side with equal spacing
 * from all borders of the purple hero container.
 * Uses viewport height units for responsive sizing across all devices.
 */

import Carousel from './Carousel'

/**
 * Renders the hero section with a centered container box containing text content
 * on the left and a white rectangular box on the right.
 * The container is styled with a purple background (#3D3072) and rounded edges,
 * positioned in the center of the hero area using flexbox.
 * Text content is positioned on the left side (55% width) with equal padding
 * on all sides, vertically centered with a slight upward offset for visual balance.
 * White box is positioned on the right side with equal spacing (20px) from all
 * container borders, maintaining consistent visual spacing.
 * Typography uses Montserrat font with specific weights, sizes, and spacing
 * to create a premium brand feel with high contrast (#fafafa on #3D3072).
 * 
 * @returns {JSX.Element} Semantic section element containing the hero container with text content and white box
 */
export default function Hero() {
  return (
    <section className="hero-section flex justify-center items-center pt-4 -mt-[15px] w-full min-h-[75vh] relative overflow-x-hidden">
      <div className="hero-container bg-[#3D3072] h-[75vh] w-[95%] max-w-[1400px] rounded-[30px] relative mx-auto flex flex-col md:flex-row justify-start md:justify-between items-center p-5">
        <div className="hero-content-wrapper w-full md:w-[55%] text-[#fafafa] text-center md:text-left md:ml-8 md:-mt-10">
          <p className="text-white mb-2 text-[clamp(0.875rem,2vw,1.125rem)] font-medium">
            Sınırlı süre için LGS kamplarında %50 indirim!
          </p>
          <h1 className="font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.2]">
            Uzmanlardan Ev Konforunda Özel Ders
          </h1>
          <p className="hidden md:block font-medium text-[1.2rem] max-w-[500px] mt-6">
            Derece öğrencileri ve uzman öğretmenlerden özel ders, YKS koçluğu ve LGS kampı alın. İlk ders ücretsiz.
          </p>
          <a
            href="https://wa.me/905551839644?text=Ücretsiz%20deneme%20dersi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block no-underline mt-10 py-[18px] px-[40px] text-[18px] font-bold bg-[#fafafa] text-[#3D3072] rounded-[12px] border-none transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Ücretsiz Deneme Dersi Al
          </a>
        </div>
        <div className="bg-[#3D3072] rounded-[12px] w-full md:w-[40%] md:max-w-[36%] h-[55%] md:h-[90%] mt-6 md:mt-0 relative overflow-hidden">
          <Carousel duration={12} pauseOnHover={true} />
        </div>
        {/* Downward pointing arrow */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M6 9L12 15L18 9" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

