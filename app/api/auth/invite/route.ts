import { createServClient } from "@/utils/supabase/services/serverClinet";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const email = await req.json();

  const supabase = await createServClient();

  const {
    data: { user: invited_at },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/auth/set-password`,
  });

  if (error) return NextResponse.json({ result: false, message: error });

  return NextResponse.json({ result: true, message: invited_at });
};
