import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const addon = await db.addOn.findUnique({ where: { id } })
    if (!addon) {
      return NextResponse.json({ error: 'Add-on not found' }, { status: 404 })
    }
    return NextResponse.json(addon)
  } catch (error) {
    console.error('Failed to fetch add-on:', error)
    return NextResponse.json(
      { error: 'Failed to fetch add-on' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const addon = await db.addOn.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        price: body.price,
        order: body.order,
      },
    })
    return NextResponse.json(addon)
  } catch (error) {
    console.error('Failed to update add-on:', error)
    return NextResponse.json(
      { error: 'Failed to update add-on' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.addOn.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete add-on:', error)
    return NextResponse.json(
      { error: 'Failed to delete add-on' },
      { status: 500 }
    )
  }
}
