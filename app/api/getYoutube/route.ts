import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const video = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&channelId=${process.env.YOUTUBE_CHANNEL_KEY}&order=date&key=${process.env.YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await video.json();

    return NextResponse.json({ result: data });
  } catch (error) {
    console.error("가져오기 실패:", error);
    return NextResponse.json({ result: false }, { status: 500 });
  }
};
