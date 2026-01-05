import { createServClient } from "@/utils/supabase/services/serverClinet";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  const supabase = await createServClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ result: false });
  }

  return NextResponse.json({ result: true });
};
