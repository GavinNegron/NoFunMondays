import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {
    try {
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;

        if (!accessToken || !refreshToken) {
            if (request.nextUrl.pathname !== '/login') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        let decoded;
        try {
            decoded = jwtDecode(accessToken);
        } catch (error) {
            console.error('Invalid token:', error);
            if (request.nextUrl.pathname !== '/login') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        const isTokenExpired = decoded.exp * 1000 < Date.now();
        if (isTokenExpired) {
            if (request.nextUrl.pathname !== '/login') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        if (request.nextUrl.pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/login']
};