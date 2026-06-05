'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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
  ChevronRight,
  ChevronLeft,
  Check,
  MessageCircle,
  FileText,
  User,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

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

// Types from API
interface CategoryData {
  id: string
  name: string
  slug: string
  icon: string
  basePrice: number
  features: string
  order: number
}

interface AddOnData {
  id: string
  name: string
  slug: string
  price: number
  order: number
}

interface PageOptionData {
  id: string
  label: string
  slug: string
  description: string
  extraPrice: number
  order: number
}

// Mapped display types
interface WebsiteType {
  id: string
  name: string
  icon: LucideIcon
  basePrice: number
}

interface PageOptionDisplay {
  id: string
  label: string
  description: string
  extra: number
}

interface AddOnDisplay {
  id: string
  name: string
  price: number
}

const steps = [
  { id: 1, title: 'Website Type', icon: Layers },
  { id: 2, title: 'Pages', icon: FileText },
  { id: 3, title: 'Add-ons', icon: Sparkles },
  { id: 4, title: 'Details', icon: User },
]

export function Configurator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedPages, setSelectedPages] = useState<string | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: '',
    businessCategory: '',
    estimatedBudget: '',
    projectDescription: '',
  })

  // API data state
  const [websiteTypes, setWebsiteTypes] = useState<WebsiteType[]>([])
  const [pageOptions, setPageOptions] = useState<PageOptionDisplay[]>([])
  const [addOns, setAddOns] = useState<AddOnDisplay[]>([])
  const [loading, setLoading] = useState(true)

  // Build categoryMap from fetched data
  const categoryMap = useCallback((): Record<string, string> => {
    const map: Record<string, string> = {}
    for (const type of websiteTypes) {
      map[type.name] = type.id
    }
    return map
  }, [websiteTypes])

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, addonRes, pageRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/addons'),
          fetch('/api/pages'),
        ])

        if (catRes.ok) {
          const catData: CategoryData[] = await catRes.json()
          setWebsiteTypes(
            catData.map((cat) => ({
              id: cat.slug,
              name: cat.name,
              icon: iconMap[cat.icon] ?? Store,
              basePrice: cat.basePrice,
            }))
          )
        }

        if (addonRes.ok) {
          const addonData: AddOnData[] = await addonRes.json()
          setAddOns(
            addonData.map((a) => ({
              id: a.slug,
              name: a.name,
              price: a.price,
            }))
          )
        }

        if (pageRes.ok) {
          const pageData: PageOptionData[] = await pageRes.json()
          setPageOptions(
            pageData.map((p) => ({
              id: p.slug,
              label: p.label,
              description: p.description,
              extra: p.extraPrice,
            }))
          )
        }
      } catch (e) {
        console.error('Failed to fetch configurator data:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Listen for preselect-category event
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const map = categoryMap()
      const categoryId = map[e.detail]
      if (categoryId) {
        setSelectedType(categoryId)
        setCurrentStep(1)
      }
    }
    window.addEventListener('preselect-category', handler as EventListener)
    return () =>
      window.removeEventListener('preselect-category', handler as EventListener)
  }, [categoryMap])

  const selectedTypeData = websiteTypes.find((t) => t.id === selectedType)
  const selectedPagesData = pageOptions.find((p) => p.id === selectedPages)
  const selectedAddOnsData = addOns.filter((a) =>
    selectedAddOns.includes(a.id)
  )

  const basePrice = selectedTypeData?.basePrice ?? 0
  const pagesCost = selectedPagesData?.extra ?? 0
  const addOnsCost = selectedAddOnsData.reduce((sum, a) => sum + a.price, 0)
  const totalPrice = basePrice + pagesCost + addOnsCost

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const canGoNext = useCallback(() => {
    if (currentStep === 1) return selectedType !== null
    if (currentStep === 2) return selectedPages !== null
    if (currentStep === 3) return true
    if (currentStep === 4)
      return (
        formData.fullName.trim() !== '' &&
        formData.businessName.trim() !== '' &&
        formData.mobileNumber.trim() !== '' &&
        formData.email.trim() !== ''
      )
    return false
  }, [currentStep, selectedType, selectedPages, formData])

  const handleWhatsApp = () => {
    const type = selectedTypeData?.name ?? 'Not selected'
    const pages = selectedPagesData?.label ?? 'Not selected'
    const addOnsList =
      selectedAddOnsData.map((a) => a.name).join(', ') || 'None'

    const message = `Hello Parth Web Studio! I'd like to get a website quote.

*Client Details:*
- Name: ${formData.fullName}
- Business: ${formData.businessName}
- Mobile: ${formData.mobileNumber}
- WhatsApp: ${formData.whatsappNumber || 'N/A'}
- Email: ${formData.email}
- City: ${formData.city || 'N/A'}
- Category: ${formData.businessCategory || 'N/A'}
- Budget: ${formData.estimatedBudget || 'N/A'}

*Website Configuration:*
- Type: ${type}
- Pages: ${pages}
- Add-ons: ${addOnsList}

*Estimated Cost: ₹${totalPrice.toLocaleString('en-IN')}*

Project Description: ${formData.projectDescription || 'N/A'}`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919999999999?text=${encoded}`, '_blank')
  }

  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Build Your{' '}
            <span className="gradient-text">Perfect Website</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your website with our step-by-step configurator
          </p>
          <div className="mt-6 w-24 h-1 bg-primary/30 rounded-full mx-auto">
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
        </div>

        <div ref={ref} className="flex flex-col lg:flex-row gap-8">
          {/* Left - Steps */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8 px-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep > step.id
                            ? 'bg-primary text-primary-foreground'
                            : currentStep === step.id
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-xs mt-1.5 text-muted-foreground hidden sm:block">
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-8 sm:w-16 mx-2 transition-colors duration-300 ${
                          currentStep > step.id
                            ? 'bg-primary'
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      <span className="ml-3 text-muted-foreground">Loading options...</span>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {/* Step 1: Select Website Type */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-serif font-semibold mb-6">
                            Select Your Website Type
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {websiteTypes.map((type) => (
                              <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                                  selectedType === type.id
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border hover:border-primary/30'
                                }`}
                              >
                                <type.icon
                                  className={`h-8 w-8 mb-2 ${
                                    selectedType === type.id
                                      ? 'text-primary'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                                <div className="font-medium text-sm">
                                  {type.name}
                                </div>
                                <div className="text-primary font-bold text-lg mt-1">
                                  ₹{type.basePrice.toLocaleString('en-IN')}
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Select Pages */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-serif font-semibold mb-6">
                            Select Number of Pages
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {pageOptions.map((option) => (
                              <button
                                key={option.id}
                                onClick={() => setSelectedPages(option.id)}
                                className={`p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                                  selectedPages === option.id
                                    ? 'border-primary bg-primary/5 shadow-md'
                                    : 'border-border hover:border-primary/30'
                                }`}
                              >
                                <div className="font-semibold text-lg">
                                  {option.label}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {option.description}
                                </div>
                                <div className="mt-2 text-primary font-bold">
                                  {option.extra === 0
                                    ? 'Included'
                                    : `+₹${option.extra.toLocaleString('en-IN')}`}
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Select Add-ons */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-serif font-semibold mb-6">
                            Select Add-ons
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Enhance your website with powerful features
                          </p>
                          <div className="space-y-2 max-h-[450px] overflow-y-auto custom-scrollbar pr-2">
                            {addOns.map((addon) => (
                              <div
                                key={addon.id}
                                onClick={() => toggleAddOn(addon.id)}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                                  selectedAddOns.includes(addon.id)
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/30'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    checked={selectedAddOns.includes(addon.id)}
                                    onCheckedChange={() => toggleAddOn(addon.id)}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <span className="text-sm font-medium">
                                    {addon.name}
                                  </span>
                                </div>
                                <span className="text-sm font-semibold text-primary">
                                  +₹{addon.price.toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Client Information */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-serif font-semibold mb-6">
                            Your Information
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">
                                Full Name <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    fullName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="businessName">
                                Business Name{' '}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="businessName"
                                placeholder="Your Business Name"
                                value={formData.businessName}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    businessName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="mobileNumber">
                                Mobile Number{' '}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="mobileNumber"
                                placeholder="+91 99999 99999"
                                value={formData.mobileNumber}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    mobileNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="whatsappNumber">
                                WhatsApp Number
                              </Label>
                              <Input
                                id="whatsappNumber"
                                placeholder="+91 99999 99999"
                                value={formData.whatsappNumber}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    whatsappNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">
                                Email Address{' '}
                                <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="hello@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    email: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="Mumbai"
                                value={formData.city}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    city: e.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="businessCategory">
                                Business Category
                              </Label>
                              <Select
                                value={formData.businessCategory}
                                onValueChange={(val) =>
                                  setFormData((p) => ({
                                    ...p,
                                    businessCategory: val,
                                  }))
                                }
                              >
                                <SelectTrigger id="businessCategory">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="restaurant">
                                    Restaurant
                                  </SelectItem>
                                  <SelectItem value="cafe">Cafe</SelectItem>
                                  <SelectItem value="hotel">Hotel</SelectItem>
                                  <SelectItem value="hospital">
                                    Hospital
                                  </SelectItem>
                                  <SelectItem value="gym">Gym</SelectItem>
                                  <SelectItem value="school">School</SelectItem>
                                  <SelectItem value="local-business">
                                    Local Business
                                  </SelectItem>
                                  <SelectItem value="corporate">
                                    Corporate
                                  </SelectItem>
                                  <SelectItem value="ecommerce">
                                    E-Commerce
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="estimatedBudget">
                                Estimated Budget
                              </Label>
                              <Select
                                value={formData.estimatedBudget}
                                onValueChange={(val) =>
                                  setFormData((p) => ({
                                    ...p,
                                    estimatedBudget: val,
                                  }))
                                }
                              >
                                <SelectTrigger id="estimatedBudget">
                                  <SelectValue placeholder="Select budget range" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="under-10k">
                                    Under ₹10,000
                                  </SelectItem>
                                  <SelectItem value="10k-25k">
                                    ₹10,000 - ₹25,000
                                  </SelectItem>
                                  <SelectItem value="25k-50k">
                                    ₹25,000 - ₹50,000
                                  </SelectItem>
                                  <SelectItem value="50k-1l">
                                    ₹50,000 - ₹1,00,000
                                  </SelectItem>
                                  <SelectItem value="above-1l">
                                    Above ₹1,00,000
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <Label htmlFor="projectDescription">
                              Project Description
                            </Label>
                            <Textarea
                              id="projectDescription"
                              placeholder="Tell us about your project requirements..."
                              rows={4}
                              value={formData.projectDescription}
                              onChange={(e) =>
                                setFormData((p) => ({
                                  ...p,
                                  projectDescription: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentStep((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentStep === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        onClick={() =>
                          setCurrentStep((prev) => Math.min(4, prev + 1))
                        }
                        disabled={!canGoNext()}
                        className="gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleWhatsApp}
                        disabled={!canGoNext()}
                        className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Get My Quote
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right - Live Pricing Panel */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="font-serif text-lg">
                    Price Estimate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Base Price */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span className="font-medium">
                      {selectedTypeData
                        ? `₹${selectedTypeData.basePrice.toLocaleString('en-IN')}`
                        : '—'}
                    </span>
                  </div>

                  {/* Pages Cost */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Pages ({selectedPagesData?.label ?? '—'})
                    </span>
                    <span className="font-medium">
                      {selectedPagesData
                        ? selectedPagesData.extra === 0
                          ? 'Included'
                          : `+₹${selectedPagesData.extra.toLocaleString('en-IN')}`
                        : '—'}
                    </span>
                  </div>

                  {/* Add-ons */}
                  {selectedAddOnsData.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Add-ons
                      </span>
                      {selectedAddOnsData.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground truncate pr-2">
                            {addon.name}
                          </span>
                          <span className="font-medium whitespace-nowrap">
                            +₹{addon.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-semibold text-base">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground pt-1">
                    * Final price may vary based on custom requirements
                  </p>
                </CardContent>
              </Card>

              {/* Quick Summary Card */}
              <Card className="mt-4 bg-card/80 backdrop-blur-sm border border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-3">
                    Your Selection Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedType ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                      />
                      <span className="text-muted-foreground">
                        Type:{' '}
                        {selectedTypeData?.name ?? 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedPages ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                      />
                      <span className="text-muted-foreground">
                        Pages: {selectedPagesData?.label ?? 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          selectedAddOns.length > 0
                            ? 'bg-primary'
                            : 'bg-muted-foreground/30'
                        }`}
                      />
                      <span className="text-muted-foreground">
                        Add-ons: {selectedAddOns.length} selected
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
