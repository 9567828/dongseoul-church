import PhotoBoard from "@/components/layouts/board/photo-board/PhotoBoard";

export const metadata = {
  title: "말씀영상",
};

export const photoList = [
  { id: "1", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "2", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "3", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "4", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "5", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "6", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "7", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "8", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
  { id: "9", thumbnail: "/imgs/image 85.png", title: "제목", created_at: "2025.09.09", youtube_URL: "" },
];

export default function Page() {
  return (
    <div className="inner">
      <PhotoBoard list={photoList} variant="sermon" />
    </div>
  );
}
