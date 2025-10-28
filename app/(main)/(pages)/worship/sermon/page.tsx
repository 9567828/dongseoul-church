import PhotoBoard from "@/components/layouts/board/photo-board/PhotoBoard";

export const metadata = {
  title: "말씀영상",
};

export const photoList = [
  {
    id: "1",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: null,
    next: "2",
  },
  {
    id: "2",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "1",
    next: "3",
  },
  {
    id: "3",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "2",
    next: "4",
  },
  {
    id: "4",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "3",
    next: "5",
  },
  {
    id: "5",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "4",
    next: "6",
  },
  {
    id: "6",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "5",
    next: "7",
  },
  {
    id: "7",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "6",
    next: "8",
  },
  {
    id: "8",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "7",
    next: "9",
  },
  {
    id: "9",
    thumbnail: "/imgs/image 85.png",
    title: "제목",
    created_at: "2025.09.09",
    updated_at: "2025.09.09",
    writer: "관리자",
    src: "/imgs/image 85.png",
    youtube_URL: "",
    prev: "8",
    next: null,
  },
];

export default function Page() {
  return (
    <div className="inner">
      <PhotoBoard list={photoList} variant="sermon" />
    </div>
  );
}
