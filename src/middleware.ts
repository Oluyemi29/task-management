import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!token.user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (token && token.user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
