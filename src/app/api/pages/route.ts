import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pages = await withRetry(() =>
      db.pageOption.findMany({
        orderBy: { order: 'asc' },
      })
    )
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Failed to fetch page options:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page options. Database may be warming up - please try again.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const page = await withRetry(() =>
      db.pageOption.create({
        data: {
          label: body.label,
          slug: body.slug,
          description: body.description,
          extraPrice: body.extraPrice,
          order: body.order ?? 0,
        },
      })
    )
    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Failed to create page option:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to create page option. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
