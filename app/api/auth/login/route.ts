import { signIn } from "@/utils/supabase/sql/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const {
      data: {
        user: { id },
      },
    } = await signIn(email, password);

    return NextResponse.json({ result: true });
  } catch (error) {
    if (error) throw error;
    return NextResponse.json({ result: false });
  }
};
