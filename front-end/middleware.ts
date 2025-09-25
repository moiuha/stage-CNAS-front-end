import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request : NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = request.cookies.get('role')?.value;
  if (request.nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/' && role !== 'USER') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};