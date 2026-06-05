'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PortfolioProjectData {
  id: string
  name: string
  category: string
  description: string
  gradient: string
  websiteUrl: string | null
  order: number
}

// Fallback data used when API fails
const fallbackProjects: PortfolioProjectData[] = [
  { id: '1', name: 'Spice Garden Restaurant', category: 'Restaurant', description: 'Full-featured restaurant website with digital menu and online ordering', gradient: 'from-orange-400 via-red-400 to-rose-500', websiteUrl: null, order: 1 },
  { id: '2', name: 'The Royal Feast', category: 'Restaurant', description: 'Premium dining website with reservation system and food gallery', gradient: 'from-amber-400 via-orange-500 to-red-600', websiteUrl: null, order: 2 },
  { id: '3', name: 'Mountain View Resort', category: 'Hotel', description: 'Luxury resort website with room listings and booking system', gradient: 'from-emerald-400 via-teal-500 to-cyan-600', websiteUrl: null, order: 3 },
  { id: '4', name: 'Heritage Grand Hotel', category: 'Hotel', description: 'Heritage hotel website with amenities showcase and inquiry forms', gradient: 'from-teal-400 via-emerald-500 to-green-600', websiteUrl: null, order: 4 },
  { id: '5', name: 'Brew & Bean Café', category: 'Cafe', description: 'Cozy café website with menu showcase and Google Maps integration', gradient: 'from-yellow-600 via-amber-500 to-orange-500', websiteUrl: null, order: 5 },
  { id: '6', name: 'The Coffee House', category: 'Cafe', description: 'Modern café website with gallery and online inquiry system', gradient: 'from-amber-700 via-yellow-800 to-orange-700', websiteUrl: null, order: 6 },
  { id: '7', name: 'CityCare Hospital', category: 'Hospital', description: 'Hospital website with doctor profiles and appointment booking', gradient: 'from-sky-400 via-blue-400 to-indigo-400', websiteUrl: null, order: 7 },
  { id: '8', name: 'Wellness Plus Clinic', category: 'Hospital', description: 'Medical clinic website with services and emergency contacts', gradient: 'from-cyan-400 via-teal-400 to-emerald-400', websiteUrl: null, order: 8 },
  { id: '9', name: 'FitZone Gym', category: 'Gym', description: 'Gym website with membership plans and trainer profiles', gradient: 'from-red-500 via-rose-500 to-pink-500', websiteUrl: null, order: 9 },
  { id: '10', name: 'Sunrise Academy', category: 'School', description: 'School website with admissions portal and staff information', gradient: 'from-violet-400 via-purple-400 to-fuchsia-400', websiteUrl: null, order: 10 },
  { id: '11', name: 'TechVista Solutions', category: 'Business', description: 'Corporate website with services and lead generation forms', gradient: 'from-slate-500 via-gray-500 to-zinc-600', websiteUrl: null, order: 11 },
  { id: '12', name: 'ShopEasy Store', category: 'E-Commerce', description: 'E-commerce platform with product catalog and checkout system', gradient: 'from-emerald-500 via-teal-500 to-cyan-500', websiteUrl: null, order: 12 },
]

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState<PortfolioProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Derive categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const fetchPortfolio = useCallback(async (retryCount = 3) => {
    setLoading(true)
    setError(false)

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 15000)

        const res = await fetch('/api/portfolio', { signal: controller.signal })
        clearTimeout(timeout)

        if (res.ok) {
          const data: PortfolioProjectData[] = await res.json()
          if (data && data.length > 0) {
            setProjects(data)
            setLoading(false)
            return
          }
        }
      } catch (e) {
        console.warn(`Portfolio fetch attempt ${attempt + 1} failed:`, e)
        if (attempt < retryCount - 1) {
          await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)))
        }
      }
    }

    // All retries failed - use fallback data
    console.warn('Using fallback portfolio data')
    setProjects(fallbackProjects)
    setError(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPortfolio()
  }, [fetchPortfolio])

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our recent projects across different industries
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        {/* Error banner with retry */}
        {error && (
          <div className="mb-6 flex items-center justify-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>Using cached data. Live projects may differ.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchPortfolio()}
              className="ml-auto gap-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </Button>
          </div>
        )}

        {/* Filter Buttons */}
        {projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeFilter === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse overflow-hidden">
                <div className="h-48 bg-muted" />
                <CardContent className="p-4">
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                  }
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Gradient Placeholder Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
                      />
                      {/* Decorative overlay elements to mimic website mockup */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                        <div className="w-16 h-2 rounded-full bg-white/40" />
                        <div className="w-24 h-3 rounded-full bg-white/50" />
                        <div className="flex gap-2 mt-2">
                          <div className="w-8 h-8 rounded-md bg-white/20" />
                          <div className="w-8 h-8 rounded-md bg-white/20" />
                          <div className="w-8 h-8 rounded-md bg-white/20" />
                        </div>
                        <div className="w-32 h-2 rounded-full bg-white/30 mt-2" />
                        <div className="w-24 h-2 rounded-full bg-white/20" />
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {project.websiteUrl ? (
                          <a
                            href={project.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium text-sm px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-colors"
                          >
                            View Project
                          </a>
                        ) : (
                          <span className="text-white font-medium text-sm px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm">
                            View Project
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="text-xs whitespace-nowrap flex-shrink-0"
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
