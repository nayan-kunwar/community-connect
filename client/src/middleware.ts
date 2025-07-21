import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/signin') || pathname.startsWith('/signup');
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // If user is not authenticated and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If user is authenticated and trying to visit login/signup
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
