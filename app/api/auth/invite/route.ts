import { createAdminClient } from "@/utils/supabase/services/adminClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const email = await req.json();

  const supabase = await createAdminClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/set-password`,
  });

  if (error) return NextResponse.json({ result: false, message: error });

  // user 테이블 업데이트
  const { statusText: usersUpdate, error: usersErr } = await supabase.from("users").insert({
    id: user?.id!,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  if (usersErr) NextResponse.json({ result: false, message: usersErr });

  // member 테이블 업데이트
  const { statusText: memberUpdate, error: memebersErr } = await supabase
    .from("members")
    .update({ admin_user: user?.id, updated_at: new Date().toISOString() })
    .eq("email", email);

  if (memebersErr) NextResponse.json({ result: false, message: memebersErr });

  return NextResponse.json({ result: true, message: user, insertUser: usersUpdate, memberUpdate });
};
