import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Force the Neon PostgreSQL URL if the env var is still the old SQLite one
const neonUrl = 'postgresql://neondb_owner:npg_vXa4u5nckQJD@ep-still-fog-ao6zogzd.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'

if (process.env.DATABASE_URL?.startsWith('file:')) {
  process.env.DATABASE_URL = neonUrl
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasourceUrl: neonUrl,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
