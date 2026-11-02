import { NextRequest, NextResponse } from "next/server";

const DOMAIN = "mumandkids.daizlab.store";
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== DOMAIN) return NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") return NextResponse.next();
  const cleanPath = pathname === "/" ? "" : pathname.replace(/^\/mumandkids(?=\/|$)/, "");
  const target = request.nextUrl.clone();
  target.pathname = "/mumandkids" + cleanPath;
  return NextResponse.rewrite(target);
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
