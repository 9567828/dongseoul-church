"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../../database.types";

export default function createBrowClient() {
  return createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: {
      flowType: "pkce",
    },
  });
}
