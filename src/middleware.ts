import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SECRET || 'parth-web-studio-admin-secret-key-2024'
)

const SESSION_COOKIE_NAME = 'admin_session'

// Paths that require authentication
const PROTECTED_PATHS = ['/admin']
// Paths that are publicly accessible even under /admin
const PUBLIC_PATHS = ['/admin/login', '/admin/api']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path needs protection
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname.startsWith(path) && !PUBLIC_PATHS.some((pub) => pathname.startsWith(pub))
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  // Check for session cookie
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  if (!token) {
    // Redirect to login page
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify the JWT token
  try {
    await jwtVerify(token, SECRET_KEY)
    return NextResponse.next()
  } catch {
    // Token is invalid or expired - redirect to login
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    const response = NextResponse.redirect(loginUrl)
    // Clear the invalid cookie
    response.cookies.set(SESSION_COOKIE_NAME, '', { maxAge: 0, path: '/' })
    return response
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
