import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SECRET || 'parth-web-studio-admin-secret-key-2024'
)

export const SESSION_COOKIE_NAME = 'admin_session'
export const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

// Admin credentials - you can change these
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'parth@2024', // Change this to your desired password
}

export async function createSession(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY)
  return token
}

export async function verifySession(token: string): Promise<{ username: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as { username: string; role: string }
  } catch {
    return null
  }
}

export async function getSession(): Promise<{ username: string; role: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null
  return verifySession(token)
}
