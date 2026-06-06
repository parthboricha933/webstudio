import { db, withRetry } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await withRetry(() =>
      db.portfolioProject.findMany({
        orderBy: { order: 'asc' },
      })
    )
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio projects. Database may be warming up - please try again.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }
    if (!body.category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }
    if (!body.description || !body.description.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }
    if (!body.gradient || !body.gradient.trim()) {
      return NextResponse.json({ error: 'Gradient is required' }, { status: 400 })
    }

    const project = await withRetry(() =>
      db.portfolioProject.create({
        data: {
          name: body.name.trim(),
          category: body.category,
          description: body.description.trim(),
          gradient: body.gradient.trim(),
          websiteUrl: body.websiteUrl?.trim() || null,
          order: body.order ?? 0,
        },
      })
    )
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create portfolio project:', error)
    const message = error instanceof Error && error.message.includes('timeout')
      ? 'Database is warming up. Please wait a moment and try again.'
      : 'Failed to create portfolio project. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
