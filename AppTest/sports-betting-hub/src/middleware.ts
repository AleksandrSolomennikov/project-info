import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-storage')?.value;

    // Protected routes
    if (request.nextUrl.pathname.startsWith('/profile') && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}