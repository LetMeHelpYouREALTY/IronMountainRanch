import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_SITE_HOST } from "@/lib/site-url";

const APEX_SITE_HOST = "ironmountainranchlasvegas.com";

/**
 * Apex → www redirect (backup to Vercel/next.config redirects) and `x-domain` for Server Components.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const hostWithoutPort = hostname.split(":")[0]?.toLowerCase() ?? "";

  if (hostWithoutPort === APEX_SITE_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_SITE_HOST;
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-domain", hostname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|videos|robots.txt|sitemap.xml|monitoring|\\.well-known).*)",
  ],
};
