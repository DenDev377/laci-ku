import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Jika user sudah login dan membuka halaman login/register, redirect ke /dashboard
    if (
      token &&
      (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Rute dashboard mewajibkan user terautentikasi (memiliki token valid)
        if (pathname.startsWith("/dashboard")) {
          return !!token;
        }

        // Halaman lain diizinkan diakses publik
        return true;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
