'use client'

import { useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Categories } from '@/components/categories'
import { Configurator } from '@/components/configurator'
import { Portfolio } from '@/components/portfolio'
import { WhyChooseUs } from '@/components/why-choose-us'
import { FAQ } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function Home() {
  // Warm up the Neon database connection on page load
  useEffect(() => {
    fetch('/api/warmup').catch(() => {
      // Silent fail - components have their own retry logic
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <Configurator />
        <Portfolio />
        <WhyChooseUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
