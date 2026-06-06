import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await withRetry(() =>
      db.portfolioProject.findUnique({ where: { id } })
    )
    if (!project) {
      return NextResponse.json(
        { error: 'Portfolio project not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to fetch portfolio project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio project' },
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
    const project = await withRetry(() =>
      db.portfolioProject.update({
        where: { id },
        data: {
          name: body.name?.trim() || body.name,
          category: body.category,
          description: body.description?.trim() || body.description,
          gradient: body.gradient?.trim() || body.gradient,
          websiteUrl: body.websiteUrl?.trim() || null,
          order: body.order,
        },
      })
    )
    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to update portfolio project:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to update portfolio project. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await withRetry(() => db.portfolioProject.delete({ where: { id } }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete portfolio project:', error)
    const message = error instanceof Error && (error.message.includes('timeout') || error.message.includes('connect'))
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to delete portfolio project. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
