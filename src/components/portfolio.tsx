'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [projects, setProjects] = useState<PortfolioProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Derive categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio')
        if (res.ok) {
          const data: PortfolioProjectData[] = await res.json()
          setProjects(data)
        }
      } catch (e) {
        console.error('Failed to fetch portfolio:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

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

        {/* Filter Buttons */}
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
