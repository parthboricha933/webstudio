import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await db.portfolioProject.findUnique({ where: { id } })
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
    const project = await db.portfolioProject.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        gradient: body.gradient,
        websiteUrl: body.websiteUrl ?? null,
        order: body.order,
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error('Failed to update portfolio project:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio project' },
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
    await db.portfolioProject.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete portfolio project:', error)
    return NextResponse.json(
      { error: 'Failed to delete portfolio project' },
      { status: 500 }
    )
  }
}
