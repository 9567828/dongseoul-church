import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/services/proxy";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|imgs|site.manifest.json|robots.txt|sitemap.xml|.well-known).*)"],
// };
