'use client'

import { Code2, Phone, Mail, MessageCircle, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  'Local Business',
  'Restaurant',
  'Hotel',
  'Hospital',
  'E-Commerce',
  'Custom',
]

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-lg text-foreground">
                Parth Web Studio
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Professional web development agency creating beautiful,
              responsive websites for businesses across India. Your digital
              presence, our priority.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-primary/10 hover:text-primary h-9 w-9"
                asChild
              >
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-primary/10 hover:text-primary h-9 w-9"
                asChild
              >
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-primary/10 hover:text-primary h-9 w-9"
                asChild
              >
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg hover:bg-primary/10 hover:text-primary h-9 w-9"
                asChild
              >
                <a href="#" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleNavClick('#services')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-foreground mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  +91 99999 99999
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@parthwebstudio.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  hello@parthwebstudio.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
            <p>&copy; 2025 Parth Web Studio. All Rights Reserved.</p>
            <p>
              Designed with &hearts; by Parth Web Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
