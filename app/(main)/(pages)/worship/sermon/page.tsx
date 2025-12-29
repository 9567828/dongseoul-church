import SermonList from "./(list)/SermonList";
import { Suspense } from "react";
import { ISearchParams } from "@/utils/propType";
import { getSearchQuerys } from "@/utils/pagenation";

export const metadata = {
  title: "말씀영상",
};

export interface YoutubeApiItem {
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    title: string;
    thumbnails: { high: { url: string } };
    description: string;
  };
}

interface YoutubeVideo {
  created_at: string;
  updated_at: string;
  writer: string;
  title: string;
  video_id: string;
  youtube_URL: string;
  published_date: string;
  thumbnail: string;
  description: string;
}

// const getYoutube = async () => {
//   const data = await fetch("http://localhost:3000/api/getYoutube", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return await data.json();
// };

// const insertDB = async () => {
//   const {
//     result: { nextPageToken, items },
//   } = await getYoutube();

//   const videos: SermonRow[] = items.map((t: YoutubeApiItem) => ({
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//     writer: "c0e43662-9223-4488-b04a-b650c27e53e4",
//     title: t.snippet.title,
//     video_id: t.id.videoId,
//     youtube_URL: `https://www.youtube.com/watch?v=${t.id.videoId}`,
//     published_date: t.snippet.publishedAt,
//     thumbnail: t.snippet.thumbnails.high.url,
//     description: t.snippet.description,
//   }));

//   return await fetch(`http://localhost:3000/api/insert`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ videos }),
//   });
// };

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 9);

  return (
    <Suspense>
      <SermonList currPage={currPage} listNum={listNum} />
    </Suspense>
  );
}
