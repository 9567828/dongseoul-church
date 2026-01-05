import { createServClient } from "@/utils/supabase/services/serverClinet";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { videos } = await req.json();

    const supabase = await createServClient();

    const { data, error } = await supabase.from("sermons").upsert(videos).select();

    if (error) {
      return NextResponse.json({ result: false });
    }

    return NextResponse.json({ result: true });
  } catch (err) {
    throw err;
  }
};
