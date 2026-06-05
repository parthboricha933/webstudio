import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const addon = await withRetry(() => db.addOn.findUnique({ where: { id } }))
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
    const addon = await withRetry(() =>
      db.addOn.update({
        where: { id },
        data: {
          name: body.name,
          slug: body.slug,
          price: body.price,
          order: body.order,
        },
      })
    )
    return NextResponse.json(addon)
  } catch (error) {
    console.error('Failed to update add-on:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to update add-on. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await withRetry(() => db.addOn.delete({ where: { id } }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete add-on:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to delete add-on. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
