import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// This endpoint warms up the Neon database connection
// Called on page load to prevent cold-start delays for data-fetching components
export async function GET() {
  try {
    // Simple lightweight query to wake up the database
    await db.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'warm' })
  } catch {
    // Don't fail - the actual data endpoints have their own retry logic
    return NextResponse.json({ status: 'cold' })
  }
}
