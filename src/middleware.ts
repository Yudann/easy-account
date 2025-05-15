import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get('isLogin')?.value

  const { pathname } = request.nextUrl

  // kalau belum login dan bukan di /login, redirect ke login
  if (!isLogin && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // kalau udah login dan akses /login, lempar ke /dashboard
  if (isLogin === 'true' && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/transaksi', '/jurnal-umum', '/buku-besar', '/neraca-saldo', '/laporan/:path*', '/login'],
}
