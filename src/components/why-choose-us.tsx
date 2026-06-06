'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Globe,
  Smartphone,
  Zap,
  Search,
  MessageCircle,
  BadgeIndianRupee,
  Palette,
  Headphones,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    icon: Globe,
    title: '50+ Websites Delivered',
    description: 'Building digital presence for businesses across India',
    number: 50,
    suffix: '+',
  },
  {
    icon: Smartphone,
    title: '100% Mobile Responsive',
    description: 'Every website works perfectly on all devices',
    number: 100,
    suffix: '%',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Get your website live within 7-14 business days',
    number: 7,
    suffix: '-14 Days',
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Built-in search engine optimization for better visibility',
    number: 100,
    suffix: '% SEO',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description: 'Direct communication via WhatsApp for quick updates',
    number: 24,
    suffix: '/7',
  },
  {
    icon: BadgeIndianRupee,
    title: 'Affordable Pricing',
    description: 'Premium quality websites at competitive prices',
    number: 4999,
    suffix: '+',
  },
  {
    icon: Palette,
    title: 'Premium UI Design',
    description: 'Modern, professional designs that impress visitors',
    number: 100,
    suffix: '% Custom',
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Post-launch support and maintenance available',
    number: 100,
    suffix: '% Support',
  },
]

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number
  suffix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.round(eased * target)
      setCount(start)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <span>
      {target >= 1000
        ? `₹${count.toLocaleString('en-IN')}`
        : count}
      {suffix}
    </span>
  )
}

export function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Why Choose{' '}
            <span className="gradient-text">Parth Web Studio?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver excellence with every project
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-primary mb-1">
                    <AnimatedCounter
                      target={stat.number}
                      suffix={stat.suffix}
                      isInView={isInView}
                    />
                  </h3>
                  <p className="font-medium text-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
