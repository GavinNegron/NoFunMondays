import { NextResponse } from "next/server";

export async function middleware(request) {
    try {
        const isAuthenticated = request.cookies.get('is_auth')?.value;

        if (isAuthenticated && request.nextUrl.pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (!isAuthenticated && request.nextUrl.pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error occurred while checking authentication: ', error);
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/login']
}