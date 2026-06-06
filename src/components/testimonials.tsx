'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Owner - Spice Garden Restaurant',
    text: 'Parth Web Studio created an amazing website for our restaurant. Online orders increased by 40% within the first month. The digital menu and WhatsApp ordering feature is a game changer!',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Manager - Mountain View Resort',
    text: 'Our hotel bookings doubled after launching the new website. The room listing and inquiry system works flawlessly. Highly recommended for any hotel business!',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Owner - Kumar Electronics',
    text: "As a local shop owner, I never thought I needed a website. Parth Web Studio changed my mind. My local visibility improved dramatically with Google Business integration.",
    rating: 5,
  },
  {
    name: 'Dr. Sneha Verma',
    role: 'Director - CityCare Hospital',
    text: 'The appointment booking system and doctor profiles have made patient management so much easier. Professional design and excellent support throughout the project.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Owner - FitZone Gym',
    text: 'Our membership signups tripled! The website showcases our trainers, plans, and facilities perfectly. The admin dashboard makes managing everything a breeze.',
    rating: 5,
  },
  {
    name: 'Meera Joshi',
    role: 'Principal - Sunrise Academy',
    text: 'The school website has transformed how we communicate with parents. Admissions, announcements, and staff information all in one beautiful platform.',
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying, nextSlide])

  const handleManualNav = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false)
    if (direction === 'next') nextSlide()
    else prevSlide()
    // Resume auto-play after 10s
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Show 1 on mobile, 2 on tablet, 3 on desktop
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 768) return 2
    }
    return 1
  }

  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const updateCount = () => setVisibleCount(getVisibleCount())
    updateCount()
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - visibleCount)

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses we&apos;ve helped grow online
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (100 / visibleCount + 2)}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visibleCount - 2}%` }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/20 mb-3" />
                      <p className="text-foreground/90 leading-relaxed mb-4 text-sm">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleManualNav('prev')}
              disabled={currentIndex === 0}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i
                      ? 'bg-primary w-6'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleManualNav('next')}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
