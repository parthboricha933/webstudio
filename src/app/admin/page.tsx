'use client'

import { useState, useEffect } from 'react'
import {
  LayoutDashboard,
  Globe,
  Puzzle,
  FileText,
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

// Types
interface WebsiteCategory {
  id: string
  name: string
  slug: string
  icon: string
  basePrice: number
  features: string
  order: number
  createdAt: string
  updatedAt: string
}

interface AddOnItem {
  id: string
  name: string
  slug: string
  price: number
  order: number
  createdAt: string
  updatedAt: string
}

interface PageOptionItem {
  id: string
  label: string
  slug: string
  description: string
  extraPrice: number
  order: number
  createdAt: string
  updatedAt: string
}

interface PortfolioProjectItem {
  id: string
  name: string
  category: string
  description: string
  gradient: string
  websiteUrl: string | null
  order: number
  createdAt: string
  updatedAt: string
}

type TabType = 'dashboard' | 'categories' | 'addons' | 'pages' | 'portfolio'

const ICON_OPTIONS = [
  'Store',
  'UtensilsCrossed',
  'Coffee',
  'Hotel',
  'Stethoscope',
  'Dumbbell',
  'GraduationCap',
  'Briefcase',
  'ShoppingCart',
]

const PORTFOLIO_CATEGORIES = [
  'Local Business',
  'Restaurant',
  'Hotel',
  'Cafe',
  'Hospital',
  'Gym',
  'School',
  'Business',
  'E-Commerce',
]

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ─── Category Form ───────────────────────────────────────────────────
function CategoryForm({
  data,
  onChange,
}: {
  data: Partial<WebsiteCategory>
  onChange: (data: Partial<WebsiteCategory>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cat-name">Name</Label>
          <Input
            id="cat-name"
            value={data.name ?? ''}
            onChange={(e) => {
              const name = e.target.value
              onChange({ ...data, name, slug: generateSlug(name) })
            }}
            placeholder="e.g. Restaurant"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cat-slug">Slug</Label>
          <Input
            id="cat-slug"
            value={data.slug ?? ''}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            placeholder="e.g. restaurant"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cat-icon">Icon</Label>
          <Select
            value={data.icon ?? ''}
            onValueChange={(val) => onChange({ ...data, icon: val })}
          >
            <SelectTrigger id="cat-icon">
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              {ICON_OPTIONS.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cat-price">Base Price (₹)</Label>
          <Input
            id="cat-price"
            type="number"
            value={data.basePrice ?? ''}
            onChange={(e) =>
              onChange({ ...data, basePrice: parseInt(e.target.value) || 0 })
            }
            placeholder="7999"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cat-order">Order</Label>
          <Input
            id="cat-order"
            type="number"
            value={data.order ?? 0}
            onChange={(e) =>
              onChange({ ...data, order: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cat-features">Features (comma-separated)</Label>
        <Input
          id="cat-features"
          value={data.features ?? ''}
          onChange={(e) => onChange({ ...data, features: e.target.value })}
          placeholder="Digital Menu,WhatsApp Orders,Food Gallery,Contact"
        />
      </div>
    </div>
  )
}

// ─── AddOn Form ──────────────────────────────────────────────────────
function AddOnForm({
  data,
  onChange,
}: {
  data: Partial<AddOnItem>
  onChange: (data: Partial<AddOnItem>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addon-name">Name</Label>
          <Input
            id="addon-name"
            value={data.name ?? ''}
            onChange={(e) => {
              const name = e.target.value
              onChange({ ...data, name, slug: generateSlug(name) })
            }}
            placeholder="e.g. Payment Gateway"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addon-slug">Slug</Label>
          <Input
            id="addon-slug"
            value={data.slug ?? ''}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            placeholder="e.g. payment-gateway"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addon-price">Price (₹)</Label>
          <Input
            id="addon-price"
            type="number"
            value={data.price ?? ''}
            onChange={(e) =>
              onChange({ ...data, price: parseInt(e.target.value) || 0 })
            }
            placeholder="3000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addon-order">Order</Label>
          <Input
            id="addon-order"
            type="number"
            value={data.order ?? 0}
            onChange={(e) =>
              onChange({ ...data, order: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </div>
  )
}

// ─── Page Option Form ────────────────────────────────────────────────
function PageOptionForm({
  data,
  onChange,
}: {
  data: Partial<PageOptionItem>
  onChange: (data: Partial<PageOptionItem>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="page-label">Label</Label>
          <Input
            id="page-label"
            value={data.label ?? ''}
            onChange={(e) => {
              const label = e.target.value
              onChange({ ...data, label, slug: generateSlug(label) })
            }}
            placeholder="e.g. 5 Pages"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="page-slug">Slug</Label>
          <Input
            id="page-slug"
            value={data.slug ?? ''}
            onChange={(e) => onChange({ ...data, slug: e.target.value })}
            placeholder="e.g. 5pages"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="page-desc">Description</Label>
        <Textarea
          id="page-desc"
          value={data.description ?? ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Small multi-page site"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="page-price">Extra Price (₹)</Label>
          <Input
            id="page-price"
            type="number"
            value={data.extraPrice ?? ''}
            onChange={(e) =>
              onChange({ ...data, extraPrice: parseInt(e.target.value) || 0 })
            }
            placeholder="2000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="page-order">Order</Label>
          <Input
            id="page-order"
            type="number"
            value={data.order ?? 0}
            onChange={(e) =>
              onChange({ ...data, order: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    </div>
  )
}

// ─── Portfolio Form ──────────────────────────────────────────────────
function PortfolioForm({
  data,
  onChange,
}: {
  data: Partial<PortfolioProjectItem>
  onChange: (data: Partial<PortfolioProjectItem>) => void
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="port-name">Name</Label>
          <Input
            id="port-name"
            value={data.name ?? ''}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="e.g. Spice Garden Restaurant"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port-category">Category</Label>
          <Select
            value={data.category ?? ''}
            onValueChange={(val) => onChange({ ...data, category: val })}
          >
            <SelectTrigger id="port-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="port-desc">Description</Label>
        <Textarea
          id="port-desc"
          value={data.description ?? ''}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Full-featured restaurant website..."
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="port-gradient">Gradient Classes</Label>
          <Input
            id="port-gradient"
            value={data.gradient ?? ''}
            onChange={(e) => onChange({ ...data, gradient: e.target.value })}
            placeholder="from-orange-400 via-red-400 to-rose-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="port-url">Website URL (optional)</Label>
          <Input
            id="port-url"
            value={data.websiteUrl ?? ''}
            onChange={(e) => onChange({ ...data, websiteUrl: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="port-order">Order</Label>
        <Input
          id="port-order"
          type="number"
          value={data.order ?? 0}
          onChange={(e) =>
            onChange({ ...data, order: parseInt(e.target.value) || 0 })
          }
        />
      </div>
    </div>
  )
}

// ─── Main Admin Panel ────────────────────────────────────────────────
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [categories, setCategories] = useState<WebsiteCategory[]>([])
  const [addons, setAddons] = useState<AddOnItem[]>([])
  const [pages, setPages] = useState<PageOptionItem[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioProjectItem[]>([])
  const [loading, setLoading] = useState(true)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<{
    type: TabType
    id?: string
  } | null>(null)
  const [formData, setFormData] = useState<Record<string, unknown>>({})

  // Delete state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: TabType
    id: string
    name: string
  } | null>(null)

  // Saving state
  const [saving, setSaving] = useState(false)

  // Fetch data helpers
  const loadCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) setCategories(await res.json())
    } catch (e) {
      console.error('Failed to fetch categories:', e)
    }
  }

  const loadAddons = async () => {
    try {
      const res = await fetch('/api/addons')
      if (res.ok) setAddons(await res.json())
    } catch (e) {
      console.error('Failed to fetch add-ons:', e)
    }
  }

  const loadPages = async () => {
    try {
      const res = await fetch('/api/pages')
      if (res.ok) setPages(await res.json())
    } catch (e) {
      console.error('Failed to fetch page options:', e)
    }
  }

  const loadPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio')
      if (res.ok) setPortfolio(await res.json())
    } catch (e) {
      console.error('Failed to fetch portfolio:', e)
    }
  }

  // Initial data load - warm up DB first, then load data
  useEffect(() => {
    async function loadAll() {
      // Warm up the database connection first to handle Neon cold starts
      try { await fetch('/api/warmup') } catch {}
      await Promise.all([loadCategories(), loadAddons(), loadPages(), loadPortfolio()])
      setLoading(false)
    }
    loadAll()
  }, [])

  // Refresh handler
  const handleRefresh = async () => {
    setLoading(true)
    await Promise.all([loadCategories(), loadAddons(), loadPages(), loadPortfolio()])
    setLoading(false)
  }

  // CRUD handlers
  const openCreate = (type: TabType) => {
    setEditingItem({ type })
    // Set default values for new items so Select components work properly
    const defaults: Record<string, Record<string, unknown>> = {
      categories: { icon: '', basePrice: 0, order: 0, features: '' },
      addons: { price: 0, order: 0 },
      pages: { extraPrice: 0, order: 0, description: '' },
      portfolio: { category: '', gradient: 'from-orange-400 via-red-400 to-rose-500', order: 0, description: '', websiteUrl: '' },
    }
    setFormData(defaults[type] || {})
    setDialogOpen(true)
  }

  const openEdit = (type: TabType, id: string, data: Record<string, unknown>) => {
    setEditingItem({ type, id })
    // Make sure websiteUrl is never undefined for portfolio items
    if (type === 'portfolio') {
      setFormData({ ...data, websiteUrl: (data as Record<string, unknown>).websiteUrl ?? '' })
    } else {
      setFormData(data)
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!editingItem) return
    const { type, id } = editingItem

    // Validate required fields before sending
    if (type === 'portfolio') {
      if (!formData.name || !(formData.name as string).trim()) {
        alert('Please enter a project name.')
        return
      }
      if (!formData.category) {
        alert('Please select a category.')
        return
      }
      if (!formData.description || !(formData.description as string).trim()) {
        alert('Please enter a description.')
        return
      }
      if (!formData.gradient || !(formData.gradient as string).trim()) {
        alert('Please enter gradient classes (e.g. from-orange-400 via-red-400 to-rose-500).')
        return
      }
    }

    if (type === 'categories') {
      if (!formData.name || !(formData.name as string).trim()) {
        alert('Please enter a category name.')
        return
      }
      if (!formData.icon) {
        alert('Please select an icon.')
        return
      }
    }

    if (type === 'addons') {
      if (!formData.name || !(formData.name as string).trim()) {
        alert('Please enter an add-on name.')
        return
      }
    }

    if (type === 'pages') {
      if (!formData.label || !(formData.label as string).trim()) {
        alert('Please enter a label.')
        return
      }
    }

    const apiMap = {
      categories: '/api/categories',
      addons: '/api/addons',
      pages: '/api/pages',
      portfolio: '/api/portfolio',
    }

    const url = id ? `${apiMap[type]}/${id}` : apiMap[type]
    const method = id ? 'PUT' : 'POST'

    // Clean up formData: remove readonly fields and convert empty strings to null for nullable fields
    const cleanData = { ...formData }
    delete cleanData.id
    delete cleanData.createdAt
    delete cleanData.updatedAt
    // Convert empty websiteUrl to null
    if (type === 'portfolio' && (cleanData.websiteUrl === '' || cleanData.websiteUrl === undefined)) {
      cleanData.websiteUrl = null
    }

    setSaving(true)
    const maxAttempts = 3
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 30000) // 30s timeout

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cleanData),
          signal: controller.signal,
        })
        clearTimeout(timeout)

        if (res.ok) {
          setDialogOpen(false)
          setEditingItem(null)
          setFormData({})
          // Refresh data
          if (type === 'categories') loadCategories()
          if (type === 'addons') loadAddons()
          if (type === 'pages') loadPages()
          if (type === 'portfolio') loadPortfolio()
          break // Success - exit retry loop
        } else {
          const err = await res.json()
          const errorMsg = err.error || 'Failed to save'
          // If it's a timeout/warming error and we have retries left, retry
          if ((errorMsg.includes('warming') || errorMsg.includes('timeout') || errorMsg.includes('connect')) && attempt < maxAttempts - 1) {
            await new Promise(r => setTimeout(r, 2000 * (attempt + 1)))
            continue
          }
          alert(`Error: ${errorMsg}`)
          break
        }
      } catch (e: unknown) {
        const isAbort = e instanceof Error && e.name === 'AbortError'
        if ((isAbort || (e instanceof TypeError)) && attempt < maxAttempts - 1) {
          // Network error or timeout - retry
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)))
          continue
        }
        console.error('Save failed:', e)
        alert('Failed to save. The database may be warming up. Please wait a moment and try again.')
        break
      } finally {
        if (attempt === maxAttempts - 1) {
          setSaving(false)
        }
      }
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!deleteConfirm) return
    const { type, id } = deleteConfirm

    const apiMap = {
      categories: '/api/categories',
      addons: '/api/addons',
      pages: '/api/pages',
      portfolio: '/api/portfolio',
    }

    try {
      const res = await fetch(`${apiMap[type]}/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDeleteConfirm(null)
        if (type === 'categories') loadCategories()
        if (type === 'addons') loadAddons()
        if (type === 'pages') loadPages()
        if (type === 'portfolio') loadPortfolio()
      } else {
        alert('Failed to delete')
      }
    } catch (e) {
      console.error('Delete failed:', e)
      alert('Failed to delete. Please try again.')
    }
  }

  const sidebarItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories' as TabType, label: 'Categories', icon: Globe },
    { id: 'addons' as TabType, label: 'Add-ons', icon: Puzzle },
    { id: 'pages' as TabType, label: 'Page Options', icon: FileText },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: Briefcase },
  ]

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-lg font-bold text-emerald-400">
            Parth Web Studio
          </h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full text-gray-300 hover:text-white hover:bg-gray-800 gap-2 justify-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              window.location.href = '/admin/login'
            }}
            className="w-full text-red-400 hover:text-red-300 hover:bg-gray-800 gap-2 justify-start"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {sidebarItems.find((i) => i.id === activeTab)?.label}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
              <span className="ml-3 text-gray-500">Loading data...</span>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Website Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                          {categories.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Add-ons
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                          {addons.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Page Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                          {pages.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Portfolio Projects
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-gray-900">
                          {portfolio.length}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Recent Categories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {categories.slice(0, 5).map((cat) => (
                            <div
                              key={cat.id}
                              className="flex items-center justify-between py-2 border-b last:border-0"
                            >
                              <div>
                                <span className="text-sm font-medium">
                                  {cat.name}
                                </span>
                                <span className="ml-2 text-xs text-gray-400">
                                  {cat.icon}
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-emerald-600">
                                ₹{cat.basePrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Recent Portfolio
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {portfolio.slice(0, 5).map((proj) => (
                            <div
                              key={proj.id}
                              className="flex items-center justify-between py-2 border-b last:border-0"
                            >
                              <div>
                                <span className="text-sm font-medium">
                                  {proj.name}
                                </span>
                                <span className="ml-2 text-xs text-gray-400">
                                  {proj.category}
                                </span>
                              </div>
                              {proj.websiteUrl && (
                                <a
                                  href={proj.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-600 hover:underline flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Demo
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Categories */}
              {activeTab === 'categories' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                      {categories.length} categories
                    </p>
                    <Button
                      onClick={() => openCreate('categories')}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Category
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Order
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Name
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Slug
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Icon
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Base Price
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Features
                            </th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((cat) => (
                            <tr
                              key={cat.id}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-sm">
                                {cat.order}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                {cat.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {cat.slug}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {cat.icon}
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                                ₹{cat.basePrice.toLocaleString('en-IN')}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                                {cat.features}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      openEdit('categories', cat.id, cat)
                                    }
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        type: 'categories',
                                        id: cat.id,
                                        name: cat.name,
                                      })
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {activeTab === 'addons' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                      {addons.length} add-ons
                    </p>
                    <Button
                      onClick={() => openCreate('addons')}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Add-on
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Order
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Name
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Slug
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Price
                            </th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {addons.map((addon) => (
                            <tr
                              key={addon.id}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-sm">
                                {addon.order}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                {addon.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {addon.slug}
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                                ₹{addon.price.toLocaleString('en-IN')}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      openEdit('addons', addon.id, addon)
                                    }
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        type: 'addons',
                                        id: addon.id,
                                        name: addon.name,
                                      })
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Page Options */}
              {activeTab === 'pages' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                      {pages.length} page options
                    </p>
                    <Button
                      onClick={() => openCreate('pages')}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Page Option
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Order
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Label
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Slug
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Description
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Extra Price
                            </th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pages.map((page) => (
                            <tr
                              key={page.id}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-sm">
                                {page.order}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium">
                                {page.label}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {page.slug}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {page.description}
                              </td>
                              <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                                {page.extraPrice === 0
                                  ? 'Included'
                                  : `₹${page.extraPrice.toLocaleString('en-IN')}`}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      openEdit('pages', page.id, page)
                                    }
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        type: 'pages',
                                        id: page.id,
                                        name: page.label,
                                      })
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio */}
              {activeTab === 'portfolio' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                      {portfolio.length} projects
                    </p>
                    <Button
                      onClick={() => openCreate('portfolio')}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Project
                    </Button>
                  </div>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Order
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Name
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Category
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Gradient
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Website URL
                            </th>
                            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolio.map((proj) => (
                            <tr
                              key={proj.id}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 text-sm">
                                {proj.order}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded bg-gradient-to-br ${proj.gradient} flex-shrink-0`}
                                  />
                                  <div>
                                    <div className="text-sm font-medium">
                                      {proj.name}
                                    </div>
                                    <div className="text-xs text-gray-400 truncate max-w-[200px]">
                                      {proj.description}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                {proj.category}
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-400 max-w-[150px] truncate">
                                {proj.gradient}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {proj.websiteUrl ? (
                                  <a
                                    href={proj.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:underline flex items-center gap-1"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    View
                                  </a>
                                ) : (
                                  <span className="text-gray-300">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      openEdit('portfolio', proj.id, proj)
                                    }
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() =>
                                      setDeleteConfirm({
                                        type: 'portfolio',
                                        id: proj.id,
                                        name: proj.name,
                                      })
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? 'Edit' : 'Add New'}{' '}
              {editingItem?.type === 'categories'
                ? 'Category'
                : editingItem?.type === 'addons'
                ? 'Add-on'
                : editingItem?.type === 'pages'
                ? 'Page Option'
                : 'Portfolio Project'}
            </DialogTitle>
            <DialogDescription>
              {editingItem?.id
                ? 'Update the details below and save.'
                : 'Fill in the details below to create a new item.'}
            </DialogDescription>
          </DialogHeader>

          {editingItem?.type === 'categories' && (
            <CategoryForm
              data={formData as Partial<WebsiteCategory>}
              onChange={(data) => setFormData(data)}
            />
          )}
          {editingItem?.type === 'addons' && (
            <AddOnForm
              data={formData as Partial<AddOnItem>}
              onChange={(data) => setFormData(data)}
            />
          )}
          {editingItem?.type === 'pages' && (
            <PageOptionForm
              data={formData as Partial<PageOptionItem>}
              onChange={(data) => setFormData(data)}
            />
          )}
          {editingItem?.type === 'portfolio' && (
            <PortfolioForm
              data={formData as Partial<PortfolioProjectItem>}
              onChange={(data) => setFormData(data)}
            />
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {saving ? 'Saving...' : editingItem?.id ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &ldquo;{deleteConfirm?.name}
              &rdquo;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
