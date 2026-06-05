import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const addons = await withRetry(() =>
      db.addOn.findMany({
        orderBy: { order: 'asc' },
      })
    )
    return NextResponse.json(addons)
  } catch (error) {
    console.error('Failed to fetch add-ons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch add-ons. Database may be warming up - please try again.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const addon = await withRetry(() =>
      db.addOn.create({
        data: {
          name: body.name,
          slug: body.slug,
          price: body.price,
          order: body.order ?? 0,
        },
      })
    )
    return NextResponse.json(addon, { status: 201 })
  } catch (error) {
    console.error('Failed to create add-on:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to create add-on. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
