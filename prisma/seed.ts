import { PrismaClient } from '@prisma/client'

const neonUrl = 'postgresql://neondb_owner:npg_vXa4u5nckQJD@ep-still-fog-ao6zogzd.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

const prisma = new PrismaClient({
  datasourceUrl: neonUrl,
})

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.portfolioProject.deleteMany()
  await prisma.pageOption.deleteMany()
  await prisma.addOn.deleteMany()
  await prisma.websiteCategory.deleteMany()

  // Seed Website Categories
  const categories = [
    { name: 'Local Business', slug: 'local-business', icon: 'Store', basePrice: 4999, features: 'Shops,Salons,Clinics,Local Services', order: 1 },
    { name: 'Restaurant', slug: 'restaurant', icon: 'UtensilsCrossed', basePrice: 7999, features: 'Digital Menu,WhatsApp Orders,Food Gallery,Contact', order: 2 },
    { name: 'Cafe', slug: 'cafe', icon: 'Coffee', basePrice: 7999, features: 'Digital Menu,Online Ordering,Table Reservation,Loyalty Program', order: 3 },
    { name: 'Hotel', slug: 'hotel', icon: 'Hotel', basePrice: 12999, features: 'Room Listings,Inquiry System,Amenities,Gallery', order: 4 },
    { name: 'Hospital', slug: 'hospital', icon: 'Stethoscope', basePrice: 9999, features: 'Doctor Profiles,Appointment Booking,Services,Emergency Contact', order: 5 },
    { name: 'Gym', slug: 'gym', icon: 'Dumbbell', basePrice: 8999, features: 'Membership Plans,Trainer Profiles,Gallery,Contact Forms', order: 6 },
    { name: 'School', slug: 'school', icon: 'GraduationCap', basePrice: 14999, features: 'Admissions,Staff Information,Announcements,Gallery', order: 7 },
    { name: 'Business', slug: 'business', icon: 'Briefcase', basePrice: 14999, features: 'Services,Lead Generation,Contact Forms,SEO Setup', order: 8 },
    { name: 'E-Commerce', slug: 'ecommerce', icon: 'ShoppingCart', basePrice: 24999, features: 'Products,Cart,Checkout,Customer Accounts', order: 9 },
  ]

  for (const cat of categories) {
    await prisma.websiteCategory.create({ data: cat })
  }
  console.log(`Seeded ${categories.length} website categories`)

  // Seed Add-ons
  const addons = [
    // General Add-ons
    { name: 'Payment Gateway', slug: 'payment-gateway', price: 3000, order: 1 },
    { name: 'AI Chatbot', slug: 'ai-chatbot', price: 5000, order: 2 },
    { name: 'Voice AI Assistant', slug: 'voice-ai', price: 10000, order: 3 },
    { name: 'Online Food Ordering', slug: 'food-ordering', price: 5000, order: 4 },
    { name: 'Hotel Room Booking', slug: 'hotel-booking', price: 6000, order: 5 },
    { name: 'Appointment Booking', slug: 'appointment-booking', price: 4000, order: 6 },
    { name: 'Admin Dashboard', slug: 'admin-dashboard', price: 7000, order: 7 },
    { name: 'Customer Login System', slug: 'customer-login', price: 5000, order: 8 },
    { name: 'Inventory Management', slug: 'inventory', price: 10000, order: 9 },
    { name: 'WhatsApp Automation', slug: 'whatsapp-automation', price: 3500, order: 10 },
    { name: 'Email Automation', slug: 'email-automation', price: 3000, order: 11 },
    { name: 'SMS Notifications', slug: 'sms-notifications', price: 4000, order: 12 },
    { name: 'Multi-Language Website', slug: 'multi-language', price: 3000, order: 13 },
    { name: 'Google Reviews Integration', slug: 'google-reviews', price: 1500, order: 14 },
    { name: 'Social Media Integration', slug: 'social-media', price: 1500, order: 15 },
    { name: 'Advanced SEO', slug: 'advanced-seo', price: 5000, order: 16 },
    { name: 'Google Business Profile Setup', slug: 'google-business', price: 2500, order: 17 },
    { name: 'Speed Optimization', slug: 'speed-optimization', price: 2000, order: 18 },
    { name: 'Security Setup', slug: 'security-setup', price: 2000, order: 19 },
    { name: 'Hosting Setup', slug: 'hosting-setup', price: 3000, order: 20 },
    { name: 'Domain Setup', slug: 'domain-setup', price: 1000, order: 21 },
    { name: 'Blog System', slug: 'blog-system', price: 3000, order: 22 },
    { name: 'Portfolio System', slug: 'portfolio-system', price: 2500, order: 23 },
    { name: 'Analytics Dashboard', slug: 'analytics-dashboard', price: 2500, order: 24 },
    { name: 'Live Chat Support', slug: 'live-chat', price: 2000, order: 25 },
    { name: 'Custom Forms', slug: 'custom-forms', price: 1500, order: 26 },
    // Hospital-Specific Add-ons
    { name: 'Doctor Profiles & Directory', slug: 'doctor-profiles', price: 4000, order: 27 },
    { name: 'OPD Online Registration', slug: 'opd-registration', price: 5000, order: 28 },
    { name: 'Online Lab Reports', slug: 'online-lab-reports', price: 4000, order: 29 },
    { name: 'Blood Bank Directory', slug: 'blood-bank', price: 3000, order: 30 },
    { name: 'Ambulance Booking System', slug: 'ambulance-booking', price: 3500, order: 31 },
    { name: 'Pharmacy Management', slug: 'pharmacy-management', price: 6000, order: 32 },
    { name: 'Patient Portal', slug: 'patient-portal', price: 7000, order: 33 },
    { name: 'Hospital Management System (HMS)', slug: 'hospital-management-system', price: 15000, order: 34 },
    { name: 'Telemedicine / Video Consultation', slug: 'telemedicine', price: 8000, order: 35 },
    { name: 'Health Checkup Packages', slug: 'health-checkup-packages', price: 3500, order: 36 },
    { name: 'Insurance / TPA Integration', slug: 'insurance-tpa', price: 5000, order: 37 },
    { name: 'Bed Availability Tracker', slug: 'bed-availability', price: 4000, order: 38 },
    { name: 'Emergency SOS Button', slug: 'emergency-sos', price: 3000, order: 39 },
    { name: 'Medical Records Access', slug: 'medical-records', price: 6000, order: 40 },
    { name: 'Vaccination Tracker', slug: 'vaccination-tracker', price: 3000, order: 41 },
    { name: 'ICU Status Dashboard', slug: 'icu-status-dashboard', price: 5000, order: 42 },
    { name: 'Staff Duty Roster', slug: 'staff-duty-roster', price: 3500, order: 43 },
    { name: 'Hospital Billing System', slug: 'hospital-billing', price: 6000, order: 44 },
    // Cafe-Specific Add-ons
    { name: 'Digital Menu Board', slug: 'digital-menu-board', price: 3000, order: 45 },
    { name: 'Online Ordering & Delivery', slug: 'cafe-online-ordering', price: 5000, order: 46 },
    { name: 'Table Reservation System', slug: 'table-reservation', price: 3500, order: 47 },
    { name: 'Loyalty & Rewards Program', slug: 'loyalty-program', price: 4000, order: 48 },
    { name: 'Wi-Fi Access Portal', slug: 'wifi-portal', price: 2000, order: 49 },
    { name: 'Event Calendar & Booking', slug: 'event-calendar', price: 2500, order: 50 },
    { name: 'Recipe / Brew Blog', slug: 'recipe-blog', price: 2500, order: 51 },
    { name: 'Gift Cards System', slug: 'gift-cards', price: 3000, order: 52 },
    { name: 'Catering Inquiry Form', slug: 'catering-inquiry', price: 1500, order: 53 },
    { name: 'Merchandise Store', slug: 'merchandise-store', price: 5000, order: 54 },
    { name: 'Coffee Subscription Plan', slug: 'coffee-subscription', price: 4000, order: 55 },
    { name: 'Barista / Team Profiles', slug: 'barista-profiles', price: 1500, order: 56 },
    { name: 'Nutrition & Allergen Info', slug: 'nutrition-info', price: 2000, order: 57 },
    { name: 'Photo Gallery', slug: 'cafe-gallery', price: 2000, order: 58 },
    { name: 'Customer Reviews Section', slug: 'customer-reviews', price: 1500, order: 59 },
    { name: 'Happy Hour & Specials Display', slug: 'happy-hour-specials', price: 2000, order: 60 },
    { name: 'Location & Hours Widget', slug: 'location-hours', price: 1500, order: 61 },
    { name: 'Takeaway & Pickup System', slug: 'takeaway-pickup', price: 3500, order: 62 },
  ]

  for (const addon of addons) {
    await prisma.addOn.create({ data: addon })
  }
  console.log(`Seeded ${addons.length} add-ons`)

  // Seed Page Options
  const pageOptions = [
    { label: '1 Page', slug: '1page', description: 'Single page website', extraPrice: 0, order: 1 },
    { label: '5 Pages', slug: '5pages', description: 'Small multi-page site', extraPrice: 2000, order: 2 },
    { label: '10 Pages', slug: '10pages', description: 'Medium multi-page site', extraPrice: 5000, order: 3 },
    { label: '15 Pages', slug: '15pages', description: 'Large multi-page site', extraPrice: 8000, order: 4 },
    { label: 'Custom', slug: 'custom-pages', description: 'Fully custom pages', extraPrice: 12000, order: 5 },
  ]

  for (const page of pageOptions) {
    await prisma.pageOption.create({ data: page })
  }
  console.log(`Seeded ${pageOptions.length} page options`)

  // Seed Portfolio Projects
  const projects = [
    { name: 'Spice Garden Restaurant', category: 'Restaurant', description: 'Full-featured restaurant website with digital menu and online ordering', gradient: 'from-orange-400 via-red-400 to-rose-500', order: 1 },
    { name: 'The Royal Feast', category: 'Restaurant', description: 'Premium dining website with reservation system and food gallery', gradient: 'from-amber-400 via-orange-500 to-red-600', order: 2 },
    { name: 'Mountain View Resort', category: 'Hotel', description: 'Luxury resort website with room listings and booking system', gradient: 'from-emerald-400 via-teal-500 to-cyan-600', order: 3 },
    { name: 'Heritage Grand Hotel', category: 'Hotel', description: 'Heritage hotel website with amenities showcase and inquiry forms', gradient: 'from-teal-400 via-emerald-500 to-green-600', order: 4 },
    { name: 'Brew & Bean Café', category: 'Cafe', description: 'Cozy café website with menu showcase and Google Maps integration', gradient: 'from-yellow-600 via-amber-500 to-orange-500', order: 5 },
    { name: 'The Coffee House', category: 'Cafe', description: 'Modern café website with gallery and online inquiry system', gradient: 'from-amber-700 via-yellow-800 to-orange-700', order: 6 },
    { name: 'CityCare Hospital', category: 'Hospital', description: 'Hospital website with doctor profiles and appointment booking', gradient: 'from-sky-400 via-blue-400 to-indigo-400', order: 7 },
    { name: 'Wellness Plus Clinic', category: 'Hospital', description: 'Medical clinic website with services and emergency contacts', gradient: 'from-cyan-400 via-teal-400 to-emerald-400', order: 8 },
    { name: 'FitZone Gym', category: 'Gym', description: 'Gym website with membership plans and trainer profiles', gradient: 'from-red-500 via-rose-500 to-pink-500', order: 9 },
    { name: 'Sunrise Academy', category: 'School', description: 'School website with admissions portal and staff information', gradient: 'from-violet-400 via-purple-400 to-fuchsia-400', order: 10 },
    { name: 'TechVista Solutions', category: 'Business', description: 'Corporate website with services and lead generation forms', gradient: 'from-slate-500 via-gray-500 to-zinc-600', order: 11 },
    { name: 'ShopEasy Store', category: 'E-Commerce', description: 'E-commerce platform with product catalog and checkout system', gradient: 'from-emerald-500 via-teal-500 to-cyan-500', order: 12 },
  ]

  for (const project of projects) {
    await prisma.portfolioProject.create({ data: project })
  }
  console.log(`Seeded ${projects.length} portfolio projects`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
