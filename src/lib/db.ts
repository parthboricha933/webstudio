import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Force the Neon PostgreSQL URL with connection pooling and timeout settings
const neonUrl = 'postgresql://neondb_owner:npg_vXa4u5nckQJD@ep-still-fog-ao6zogzd.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30&pool_timeout=30'

if (process.env.DATABASE_URL?.startsWith('file:')) {
  process.env.DATABASE_URL = neonUrl
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasourceUrl: neonUrl,
  })

// Warm up the connection on first import
db.$connect().catch(() => {
  // Silently fail - the connection will be retried on actual queries
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
