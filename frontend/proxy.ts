import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/admin"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("your_shoppy_auth")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (isAuthRoute && authCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*"],
};
