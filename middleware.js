import { NextResponse } from "next/server";

export function middleware(request) {
    
    const { pathname } = request.nextUrl;
    
    const token = request.cookies.get("token");

    if ((!token || token === "") && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
    ]
}