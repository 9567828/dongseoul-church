import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const video = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${process.env.YOUTUBE_CHANNEL_KEY}&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await video.json();

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("가져오기 실패:", error);
    return NextResponse.json({ result: false }, { status: 500 });
  }
};
