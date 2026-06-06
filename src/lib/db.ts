import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Neon PostgreSQL connection URLs
// Direct connection (for migrations): ep-still-fog-ao6zogzd
// Pooler connection (for queries): ep-still-fog-ao6zogzd-pooler
// IMPORTANT: pgbouncer=true is required for Prisma to work with Neon's PgBouncer pooler
// Without it, Prisma's prepared statements fail against PgBouncer's transaction mode

const directUrl = 'postgresql://neondb_owner:npg_vXa4u5nckQJD@ep-still-fog-ao6zogzd.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30'

const poolerUrl = 'postgresql://neondb_owner:npg_vXa4u5nckQJD@ep-still-fog-ao6zogzd-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=30'

// Use the direct URL as fallback - it's more reliable for Prisma
const connectionString = directUrl

if (process.env.DATABASE_URL?.startsWith('file:')) {
  process.env.DATABASE_URL = connectionString
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasourceUrl: connectionString,
  })

// Warm up the connection on first import
db.$connect().catch(() => {
  // Silently fail - the connection will be retried on actual queries
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Helper: retry a database operation with exponential backoff
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: unknown

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Reconnect before retrying
      if (attempt > 0) {
        try {
          await db.$disconnect()
        } catch {}
        try {
          await db.$connect()
        } catch {}
      }

      const result = await operation()
      return result
    } catch (error: unknown) {
      lastError = error
      const errorMessage = error instanceof Error ? error.message : String(error)

      // Check if it's a connection error that might benefit from retry
      const isConnectionError =
        errorMessage.includes('connect') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('ECONNRESET') ||
        errorMessage.includes('EPIPE') ||
        errorMessage.includes('Connection') ||
        errorMessage.includes('P1001') ||
        errorMessage.includes('P1002') ||
        errorMessage.includes('P1008') ||
        errorMessage.includes('Timed out') ||
        errorMessage.includes('P2010') ||
        errorMessage.includes('prepared statement') ||
        errorMessage.includes('Invalid or unexpected')

      if (!isConnectionError || attempt === maxRetries - 1) {
        throw error
      }

      console.warn(`DB operation attempt ${attempt + 1} failed (will retry):`, errorMessage)
      const delay = baseDelay * Math.pow(2, attempt)
      await new Promise((r) => setTimeout(r, delay))
    }
  }

  throw lastError
}
