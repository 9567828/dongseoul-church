"use client";

import { useParams, usePathname } from "next/navigation";
import style from "./board-detail.module.scss";
import BackBtn from "@/components/ui/back-btn/BackBtn";
import MoveBtn from "@/components/ui/move-btn/MoveBtn";
import { useHooks } from "@/hooks/useHooks";
import { AlbumRow } from "../photo-board/PhotoBoard";
import { formatDate } from "@/utils/formatDate";

export interface IPhotoDetail {
  id: string | number;
  created_at: string | null;
  updated_at?: string | null;
  title?: string | null;
  thumbnail?: string | null;
  writer?: string | null;
  /**
   * @param album table 필드
   */
  src?: string | null;
  /**
   * @param sermon table 필드
   */
  youtube_URL?: string | null;
  prev_id?: string | number | null;
  next_id?: string | number | null;
}

interface IDetail {
  detail: IPhotoDetail;
  variant: "album" | "nomal";
}

export default function BoardDetail({ detail, variant }: IDetail) {
  const { useRoute } = useHooks();
  const path = usePathname();

  // "/"로 path 나누기
  const segments = path.split("/").filter(Boolean);
  // [id] path제외하고 path 합침
  const basePath = "/" + segments.slice(0, -1).join("/");

  console.log("basePath? ", basePath, path);

  return (
    <div className="inner">
      <BackBtn onClick={() => useRoute(basePath)} />
      <div className={style["board-wrap"]}>
        <div className={style.head}>
          <p className="bodyMd-m">{detail.title!}</p>
          <p>{formatDate(detail.created_at!)}</p>
        </div>
        <div className={style.content}>
          {detail.src ? (
            <div className={style["content-img"]}>
              <img src={detail.src} alt={detail.title!} />
            </div>
          ) : (
            <p>{""}</p>
          )}
        </div>
        <div>
          <MoveBtn variant="prev" isNull={detail.prev_id === null} onClick={() => useRoute(`${basePath}/${detail.prev_id}`)} />
          <MoveBtn variant="next" isNull={detail.prev_id === null} onClick={() => useRoute(`${basePath}/${detail.prev_id}`)} />
        </div>
      </div>
    </div>
  );
}
