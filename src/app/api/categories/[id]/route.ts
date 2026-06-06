import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const category = await withRetry(() =>
      db.websiteCategory.findUnique({ where: { id } })
    )
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to fetch category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
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
    const category = await withRetry(() =>
      db.websiteCategory.update({
        where: { id },
        data: {
          name: body.name,
          slug: body.slug,
          icon: body.icon,
          basePrice: body.basePrice,
          features: body.features,
          order: body.order,
        },
      })
    )
    return NextResponse.json(category)
  } catch (error) {
    console.error('Failed to update category:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to update category. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await withRetry(() => db.websiteCategory.delete({ where: { id } }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete category:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to delete category. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
