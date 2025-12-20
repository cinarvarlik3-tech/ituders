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
  '/images/Alperen.jpeg',
  '/images/Berkay.jpeg',
  '/images/Fatih.jpeg',
  '/images/Mete.jpeg',
  '/images/Vedat.jpeg',
  '/images/Yunus.jpeg',
]

// Left side images: Berkay, Alperen, Vedat
const leftImages = [
  '/images/Berkay.jpeg',
  '/images/Alperen.jpeg',
  '/images/Vedat.jpeg',
]

// Right side images: Mete, Yunus, Fatih
const rightImages = [
  '/images/Mete.jpeg',
  '/images/Yunus.jpeg',
  '/images/Fatih.jpeg',
]

// Text content for each image
const imageTexts: Record<string, string> = {
  '/images/Vedat.jpeg': 'Vedat Yıldız\nİstanbul Teknik Üniversitesi\nSAY 4151',
  '/images/Alperen.jpeg': 'Alperen Ağaç\nİstanbul Teknik Üniversitesi\nSAY 1253 / TYT 2153',
  '/images/Berkay.jpeg': 'Berkay Öztürk\nBoğaziçi Üniversitesi\nSÖZ 62',
  '/images/Mete.jpeg': 'Mete Işık\nÖzyeğin Üniversitesi\nSÖZ 227',
  '/images/Yunus.jpeg': 'Yunus Akdoğan\nÖzyeğin Üniversitesi\nEA 545',
  '/images/Fatih.jpeg': 'Fatih Kara\nÖzyeğin Üniversitesi\nEA 1447',
}

export default function Carousel({ 
  images = defaultImages, 
  duration = 15,
  pauseOnHover = false 
}: CarouselProps) {
  // Clone the images arrays to create seamless loop
  const leftColumnImages = [...leftImages, ...leftImages]
  const rightColumnImages = [...rightImages, ...rightImages]

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
          {leftColumnImages.map((image, index) => (
            <div key={`left-${index}`} className={styles.carouselCard}>
              <img 
                src={image} 
                alt={`Carousel image ${(index % leftImages.length) + 1}`}
                className={styles.carouselImage}
                loading="lazy"
              />
              <div className={styles.cardText}>
                {imageTexts[image]?.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Row - Scrolls Downward */}
      <div className={styles.carouselRow}>
        <div className={`${styles.carouselTrack} ${styles.rightTrack}`}>
          {rightColumnImages.map((image, index) => (
            <div key={`right-${index}`} className={styles.carouselCard}>
              <img 
                src={image} 
                alt={`Carousel image ${(index % rightImages.length) + 1}`}
                className={styles.carouselImage}
                loading="lazy"
              />
              <div className={styles.cardText}>
                {imageTexts[image]?.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

