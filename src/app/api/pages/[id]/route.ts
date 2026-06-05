import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const page = await withRetry(() => db.pageOption.findUnique({ where: { id } }))
    if (!page) {
      return NextResponse.json(
        { error: 'Page option not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(page)
  } catch (error) {
    console.error('Failed to fetch page option:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page option' },
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
    const page = await withRetry(() =>
      db.pageOption.update({
        where: { id },
        data: {
          label: body.label,
          slug: body.slug,
          description: body.description,
          extraPrice: body.extraPrice,
          order: body.order,
        },
      })
    )
    return NextResponse.json(page)
  } catch (error) {
    console.error('Failed to update page option:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to update page option. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await withRetry(() => db.pageOption.delete({ where: { id } }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete page option:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to delete page option. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
