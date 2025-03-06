import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {
    try {
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;

        // If no refresh token exists, user is not authenticated at all
        if (!refreshToken) {
            if (request.nextUrl.pathname !== '/login') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        // If we have a refresh token but no access token or expired access token, try to refresh
        let isTokenExpired = false;
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                isTokenExpired = decoded.exp * 1000 < Date.now();
            } catch (error) {
                console.error('Invalid token:', error);
                isTokenExpired = true;
            }
        } else {
            isTokenExpired = true;
        }

        // If token is expired and we have a refresh token, attempt to refresh
        if (isTokenExpired) {
            try {
                // Make request to your refresh token endpoint
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/refresh-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refreshToken: refreshToken,
                    }),
                });

                const responseBody = await response.json();  // Parse response as JSON
            
                if (!response.ok) {
                    // If refresh failed, redirect to login
                    if (request.nextUrl.pathname !== '/login') {
                        return NextResponse.redirect(new URL('/login', request.url));
                    }
                    return NextResponse.next();
                }

                // If we successfully refreshed, allow the request to continue
                const res = NextResponse.next();

                // Copy any new cookies from the refresh response
                const cookies = response.headers.getSetCookie();
                if (cookies && cookies.length > 0) {
                    for (const cookie of cookies) {
                        res.headers.append('Set-Cookie', cookie);
                    }
                }

                return res;
            } catch (error) {
                console.error('Error refreshing token:', error);
                if (request.nextUrl.pathname !== '/login') {
                    return NextResponse.redirect(new URL('/login', request.url));
                }
                return NextResponse.next();
            }
        }

        // Redirect from login page if already authenticated
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
