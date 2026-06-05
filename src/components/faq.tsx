'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer:
      'Typically, we deliver complete websites within 7-14 business days, depending on the complexity and features required. Simple business websites can be ready in as little as 5-7 days, while e-commerce or feature-rich websites may take 2-3 weeks. We keep you updated throughout the process.',
  },
  {
    question: 'Do you provide hosting services?',
    answer:
      'Yes! We offer reliable hosting setup and management. Our hosting packages include SSL certificates, regular backups, and 99.9% uptime. We handle all the technical details so you can focus on your business.',
  },
  {
    question: 'Do you provide domain registration?',
    answer:
      "Absolutely! We can register your preferred domain name as part of our service. We'll help you choose the best domain for your business and handle all the setup and configuration.",
  },
  {
    question: 'Can I update the website content myself?',
    answer:
      'Yes, we build websites with user-friendly admin panels that allow you to update text, images, and content without any coding knowledge. We also provide training sessions to help you get comfortable with the system.',
  },
  {
    question: 'Do you provide support after the website launch?',
    answer:
      "Yes, we offer post-launch support and maintenance packages. This includes bug fixes, security updates, content updates, and technical support. We're always just a WhatsApp message away!",
  },
  {
    question: 'Can you integrate payment gateways?',
    answer:
      'Absolutely! We integrate popular payment gateways including Razorpay, PayU, Stripe, and more. Whether you need UPI payments, credit card processing, or international payments, we\'ve got you covered.',
  },
  {
    question: 'Can you build custom features not listed on your website?',
    answer:
      "Of course! We specialize in custom development. Whether you need a unique booking system, custom CRM integration, or any other feature, our team can build it. Contact us with your requirements and we'll provide a custom quote.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services
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
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-base hover:no-underline hover:text-primary transition-colors">
                      <span className="flex items-center gap-3">
                        <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
