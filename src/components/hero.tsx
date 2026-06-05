'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 bg-primary/30 blur-3xl"
          style={{
            top: '10%',
            left: '10%',
            animation: 'float-slow 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-15 bg-primary/20 blur-3xl"
          style={{
            top: '50%',
            right: '5%',
            animation: 'float-medium 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 bg-emerald-400/20 blur-3xl"
          style={{
            bottom: '10%',
            left: '30%',
            animation: 'float-slow 18s ease-in-out infinite reverse',
          }}
        />
        {/* Decorative dots */}
        <div
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{ top: '20%', right: '20%', animation: 'float 6s ease-in-out infinite' }}
        />
        <div
          className="absolute w-3 h-3 rounded-full bg-primary/30"
          style={{ top: '60%', left: '15%', animation: 'float 8s ease-in-out infinite 1s' }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-primary/25"
          style={{ bottom: '30%', right: '25%', animation: 'float 7s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-primary/15"
          style={{ top: '35%', right: '40%', animation: 'float 9s ease-in-out infinite 0.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Briefcase className="h-4 w-4" />
              Professional Web Development Agency
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight"
          >
            Professional Websites
            <br />
            <span className="gradient-text">That Grow Your Business</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            We design websites for Restaurants, Cafes, Hotels, Hospitals, Shops,
            Gyms, Schools, Startups, and Businesses. Get your professional website
            live within 7-14 days!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleScrollTo('pricing')}
            >
              Get Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 rounded-xl border-2 hover:bg-primary/5"
              onClick={() => handleScrollTo('portfolio')}
            >
              View Portfolio
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>50+ Websites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>7-14 Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>100% Responsive</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
