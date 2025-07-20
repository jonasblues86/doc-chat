import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //public routes
        if (
          pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/"
        ) {
          return true;
        }

        //protected routes

        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/dashboard", "/dashboard/:path*"] };
