'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categories = [
  'All',
  'Restaurant',
  'Hotel',
  'Cafe',
  'Hospital',
  'Gym',
  'School',
  'Business',
  'E-Commerce',
]

const projects = [
  {
    id: 1,
    name: 'Spice Garden Restaurant',
    category: 'Restaurant',
    description: 'Full-featured restaurant website with digital menu and online ordering',
    gradient: 'from-orange-400 via-red-400 to-rose-500',
  },
  {
    id: 2,
    name: 'The Royal Feast',
    category: 'Restaurant',
    description: 'Premium dining website with reservation system and food gallery',
    gradient: 'from-amber-400 via-orange-500 to-red-600',
  },
  {
    id: 3,
    name: 'Mountain View Resort',
    category: 'Hotel',
    description: 'Luxury resort website with room listings and booking system',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
  },
  {
    id: 4,
    name: 'Heritage Grand Hotel',
    category: 'Hotel',
    description: 'Heritage hotel website with amenities showcase and inquiry forms',
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
  },
  {
    id: 5,
    name: 'Brew & Bean Café',
    category: 'Cafe',
    description: 'Cozy café website with menu showcase and Google Maps integration',
    gradient: 'from-yellow-600 via-amber-500 to-orange-500',
  },
  {
    id: 6,
    name: 'The Coffee House',
    category: 'Cafe',
    description: 'Modern café website with gallery and online inquiry system',
    gradient: 'from-amber-700 via-yellow-800 to-orange-700',
  },
  {
    id: 7,
    name: 'CityCare Hospital',
    category: 'Hospital',
    description: 'Hospital website with doctor profiles and appointment booking',
    gradient: 'from-sky-400 via-blue-400 to-indigo-400',
  },
  {
    id: 8,
    name: 'Wellness Plus Clinic',
    category: 'Hospital',
    description: 'Medical clinic website with services and emergency contacts',
    gradient: 'from-cyan-400 via-teal-400 to-emerald-400',
  },
  {
    id: 9,
    name: 'FitZone Gym',
    category: 'Gym',
    description: 'Gym website with membership plans and trainer profiles',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
  },
  {
    id: 10,
    name: 'Sunrise Academy',
    category: 'School',
    description: 'School website with admissions portal and staff information',
    gradient: 'from-violet-400 via-purple-400 to-fuchsia-400',
  },
  {
    id: 11,
    name: 'TechVista Solutions',
    category: 'Business',
    description: 'Corporate website with services and lead generation forms',
    gradient: 'from-slate-500 via-gray-500 to-zinc-600',
  },
  {
    id: 12,
    name: 'ShopEasy Store',
    category: 'E-Commerce',
    description: 'E-commerce platform with product catalog and checkout system',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
  },
]

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
                      <span className="text-white font-medium text-sm px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm">
                        View Project
                      </span>
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
      </div>
    </section>
  )
}
