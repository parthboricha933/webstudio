import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pages = await db.pageOption.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Failed to fetch page options:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page options' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const page = await db.pageOption.create({
      data: {
        label: body.label,
        slug: body.slug,
        description: body.description,
        extraPrice: body.extraPrice,
        order: body.order ?? 0,
      },
    })
    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Failed to create page option:', error)
    return NextResponse.json(
      { error: 'Failed to create page option' },
      { status: 500 }
    )
  }
}
