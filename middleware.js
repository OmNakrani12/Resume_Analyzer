import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Protected Routes
  const protectedRoutes = ['/dashboard', '/profile', '/analyze', '/resume']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Auth Routes (Login/Register)
  const authRoutes = ['/signin', '/signup']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/analyze/:path*',
    '/resume/:path*',
    '/signin',
    '/signup',
    '/forgot-password',
  ],
}
