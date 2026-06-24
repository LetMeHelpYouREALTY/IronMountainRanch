import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Injects the request Host into `x-domain` for Server Components (metadata, OG image, copy).
 * Must be set on the *request* headers — `headers().get("x-domain")` does not read response headers.
 */
export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
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
