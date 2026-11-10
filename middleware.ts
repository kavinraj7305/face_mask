import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";

export default auth((req) => {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!req.auth?.user) {
    const login = new URL("/login", req.nextUrl.origin);
    login.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  if (!isAdminEmail(req.auth.user.email)) {
    return NextResponse.redirect(new URL("/orders", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
