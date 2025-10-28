import PhotoBoard from "@/components/layouts/board/photo-board/PhotoBoard";
import { photoList } from "../../worship/sermon/page";

export const metadata = {
  title: "교회사진",
};

export default function Page() {
  return (
    <div className="inner">
      <PhotoBoard list={photoList} variant="album" />
    </div>
  );
}
