import { createServClient } from "@/utils/supabase/services/serverClinet";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const password = await req.json();
  const supabase = await createServClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   return NextResponse.json({ result: false, message: "session 없음" });
  // }

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) return NextResponse.json({ result: false, message: error });

  return NextResponse.json({ result: true, message: data });
};
