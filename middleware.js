import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
  if (isAdminPath && !isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If logged in and trying to access /admin/login, redirect to /admin
  if (isLoginPage) {
    const authCookie = request.cookies.get('admin_auth');
    if (authCookie && authCookie.value === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
