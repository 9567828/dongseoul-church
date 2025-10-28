"use client";

import { useParams, usePathname } from "next/navigation";
import style from "./board-detail.module.scss";
import BackBtn from "@/components/ui/back-btn/BackBtn";
import MoveBtn from "@/components/ui/move-btn/MoveBtn";
import { useHooks } from "@/hooks/useHooks";

export interface IPhotoDetail {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  thumbnail: string;
  writer: string;
  /**
   * @param album table 필드
   */
  src?: string;
  /**
   * @param sermon table 필드
   */
  youtube_URL?: string;
  prev?: string | null;
  next?: string | null;
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

  return (
    <div className="inner">
      <BackBtn onClick={() => useRoute(basePath)} />
      <div className={style["board-wrap"]}>
        <div className={style.head}>
          <p className="bodyMd-m">{detail.title}</p>
          <p>{detail.created_at}</p>
        </div>
        <div className={style.content}>
          {detail.src ? (
            <div className={style["content-img"]}>
              <img src={detail.src} alt={detail.title} />
            </div>
          ) : (
            <p>{""}</p>
          )}
        </div>
        <div>
          <MoveBtn variant="prev" isNull={detail.prev === null} onClick={() => useRoute(`${basePath}/${detail.prev}`)} />
          <MoveBtn variant="next" isNull={detail.next === null} onClick={() => useRoute(`${basePath}/${detail.next}`)} />
        </div>
      </div>
    </div>
  );
}
