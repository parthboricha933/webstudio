import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const projects = await db.portfolioProject.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch portfolio projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const project = await db.portfolioProject.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        gradient: body.gradient,
        websiteUrl: body.websiteUrl ?? null,
        order: body.order ?? 0,
      },
    })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create portfolio project:', error)
    return NextResponse.json(
      { error: 'Failed to create portfolio project' },
      { status: 500 }
    )
  }
}
