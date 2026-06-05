import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const addons = await db.addOn.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(addons)
  } catch (error) {
    console.error('Failed to fetch add-ons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch add-ons' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const addon = await db.addOn.create({
      data: {
        name: body.name,
        slug: body.slug,
        price: body.price,
        order: body.order ?? 0,
      },
    })
    return NextResponse.json(addon, { status: 201 })
  } catch (error) {
    console.error('Failed to create add-on:', error)
    return NextResponse.json(
      { error: 'Failed to create add-on' },
      { status: 500 }
    )
  }
}
