'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 99999 99999',
    href: 'https://wa.me/919999999999',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@parthwebstudio.com',
    href: 'mailto:hello@parthwebstudio.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Mumbai, Maharashtra, India',
    href: null,
  },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Reach out to us!
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left - Contact Information */}
          <div className="space-y-4">
            {contactInfo.map((info) => (
              <Card
                key={info.label}
                className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Links */}
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground mb-3">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      className="rounded-xl hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                      asChild
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Google Maps */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm overflow-hidden">
            <div className="h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1653658492446!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Parth Web Studio Location - Mumbai, India"
                className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
