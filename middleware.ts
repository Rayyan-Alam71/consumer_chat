//export {default } from "next-auth/middleware"

//export const config = {
//    matcher : ['/dashboard/:path*' , '/create-bot']
//}

// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Early return for non-matched (redundant but Edge-safe)
    if (!req.nextUrl.pathname.match(/^\/dashboard\/|\/create-bot$/)) {
      return NextResponse.next();
    }
    return NextResponse.next(); // Or your logic
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = { matcher: ["/dashboard/:path*", "/create-bot"] };
