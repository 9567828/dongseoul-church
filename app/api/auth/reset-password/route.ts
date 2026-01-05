import { createServClient } from "@/utils/supabase/services/serverClinet";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const supabase = await createServClient();
  const email = await req.json();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  console.log(data);

  if (error) return NextResponse.json({ result: false, message: error });

  return NextResponse.json({ result: true, message: data });
};
