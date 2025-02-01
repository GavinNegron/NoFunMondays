import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {
    try {
        const token = request.cookies.get('accessToken')?.value;

        if (!token) {
            if (request.nextUrl.pathname === '/login') {
                return NextResponse.next(); 
            }
            return NextResponse.redirect(new URL('/login', request.url)); 
        }

        const decoded = jwtDecode(token); 
        const isTokenExpired = decoded.exp * 1000 < Date.now(); 

        if (isTokenExpired) {
            return NextResponse.redirect(new URL('/login', request.url)); 
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