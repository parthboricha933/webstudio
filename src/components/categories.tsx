'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  Store,
  UtensilsCrossed,
  Coffee,
  Hotel,
  Stethoscope,
  Dumbbell,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  AlertCircle,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, LucideIcon> = {
  Store,
  UtensilsCrossed,
  Coffee,
  Hotel,
  Stethoscope,
  Dumbbell,
  GraduationCap,
  Briefcase,
  ShoppingCart,
}

// Fallback data used when API fails (Neon cold start, network issues, etc.)
const fallbackCategories: CategoryDisplay[] = [
  { icon: Store, name: 'Local Business', price: 4999, features: ['Shops', 'Salons', 'Clinics', 'Local Services'] },
  { icon: UtensilsCrossed, name: 'Restaurant', price: 7999, features: ['Digital Menu', 'WhatsApp Orders', 'Food Gallery', 'Contact'] },
  { icon: Coffee, name: 'Cafe', price: 7999, features: ['Menu Showcase', 'Online Inquiry', 'Gallery', 'Google Maps'] },
  { icon: Hotel, name: 'Hotel', price: 12999, features: ['Room Listings', 'Inquiry System', 'Amenities', 'Gallery'] },
  { icon: Stethoscope, name: 'Hospital', price: 9999, features: ['Doctor Profiles', 'Appointment Booking', 'Services', 'Emergency Contact'] },
  { icon: Dumbbell, name: 'Gym', price: 8999, features: ['Membership Plans', 'Trainer Profiles', 'Gallery', 'Contact Forms'] },
  { icon: GraduationCap, name: 'School', price: 14999, features: ['Admissions', 'Staff Information', 'Announcements', 'Gallery'] },
  { icon: Briefcase, name: 'Business', price: 14999, features: ['Services', 'Lead Generation', 'Contact Forms', 'SEO Setup'] },
  { icon: ShoppingCart, name: 'E-Commerce', price: 24999, features: ['Products', 'Cart', 'Checkout', 'Customer Accounts'] },
]

interface CategoryData {
  id: string
  name: string
  slug: string
  icon: string
  basePrice: number
  features: string
  order: number
}

interface CategoryDisplay {
  icon: LucideIcon
  name: string
  price: number
  features: string[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Categories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [categories, setCategories] = useState<CategoryDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchCategories = useCallback(async (retryCount = 3) => {
    setLoading(true)
    setError(false)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

        const res = await fetch('/api/categories', { signal: controller.signal })
        clearTimeout(timeout)

        if (res.ok) {
          const data: CategoryData[] = await res.json()
          if (data && data.length > 0) {
            const mapped: CategoryDisplay[] = data.map((cat) => ({
              icon: iconMap[cat.icon] ?? Store,
              name: cat.name,
              price: cat.basePrice,
              features: cat.features.split(',').map((f) => f.trim()),
            }))
            setCategories(mapped)
            setLoading(false)
            return
          }
        }
      } catch (e) {
        console.warn(`Categories fetch attempt ${attempt + 1} failed:`, e)
        if (attempt < retryCount - 1) {
          // Wait before retrying (exponential backoff)
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)))
        }
      }
    }

    // All retries failed - use fallback data
    console.warn('Using fallback categories data')
    setCategories(fallbackCategories)
    setError(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleGetStarted = (categoryName: string) => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('preselect-category', { detail: categoryName })
        )
      }, 600)
    }
  }

  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Website Solutions for{' '}
            <span className="gradient-text">Every Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect website package tailored to your industry
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        {/* Error banner with retry */}
        {error && (
          <div className="mb-6 flex items-center justify-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>Using cached data. Live prices may differ.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchCategories()}
              className="ml-auto gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </Button>
          </div>
        )}

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-muted rounded w-24" />
                      <div className="h-7 bg-muted rounded w-20" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="h-3 bg-muted rounded w-32" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.name} variants={cardVariants}>
                <Card className="group relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-lg text-foreground">
                          {category.name}
                        </h3>
                        <div className="mt-1">
                          <span className="text-sm text-muted-foreground">Starting at</span>
                          <span className="ml-1 text-2xl font-bold text-primary">
                            ₹{category.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {category.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full mt-6 rounded-xl"
                      variant="outline"
                      onClick={() => handleGetStarted(category.name)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
