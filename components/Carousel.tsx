/**
 * Dual-Column Synchronized Vertical Infinite Carousel Component
 * 
 * Features:
 * - Two synchronized vertical columns (left scrolls up, right scrolls down)
 * - Infinite loop using DOM doubling technique
 * - CSS-driven animations for high performance
 * - Pause on hover for better UX
 * - Responsive card sizing (50% width, 50% height per card)
 */

'use client'

import React from 'react'
import styles from './Carousel.module.css'

interface CarouselProps {
  images?: string[]
  duration?: number // Animation duration in seconds
  pauseOnHover?: boolean
}

const defaultImages = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop',
]

export default function Carousel({ 
  images = defaultImages, 
  duration = 10,
  pauseOnHover = true 
}: CarouselProps) {
  // Clone the images array to create seamless loop (1-2-3-1-2-3)
  const clonedImages = [...images, ...images]

  return (
    <div 
      className={`${styles.carouselContainer} ${pauseOnHover ? styles.pauseOnHover : ''}`}
      style={{
        '--animation-duration': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Left Row - Scrolls Upward */}
      <div className={styles.carouselRow}>
        <div className={`${styles.carouselTrack} ${styles.leftTrack}`}>
          {clonedImages.map((image, index) => (
            <div key={`left-${index}`} className={styles.carouselCard}>
              <img 
                src={image} 
                alt={`Carousel image ${(index % images.length) + 1}`}
                className={styles.carouselImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Row - Scrolls Downward */}
      <div className={styles.carouselRow}>
        <div className={`${styles.carouselTrack} ${styles.rightTrack}`}>
          {clonedImages.map((image, index) => (
            <div key={`right-${index}`} className={styles.carouselCard}>
              <img 
                src={image} 
                alt={`Carousel image ${(index % images.length) + 1}`}
                className={styles.carouselImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

