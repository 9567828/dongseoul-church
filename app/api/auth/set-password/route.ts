import { createServClient } from "@/utils/supabase/services/serverClinet";
import { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // if (code) {
  //   const supabase = await createServClient();
  //   await supabase.auth.exchangeCodeForSession(code);
  // }

  if (token_hash && type) {
    const supabase = await createServClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!session) {
      return NextResponse.json({ result: false, message: "session 없음" });
    }

    // console.log(session);

    // if (!error) {
    //   return NextResponse.redirect(next);
    // }
  }

  // return NextResponse.redirect(new URL("/auth/set-password", req.url));
};
