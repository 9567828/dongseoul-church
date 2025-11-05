"use client";

import { usePathname } from "next/navigation";
import style from "./board-detail.module.scss";
import BackBtn from "@/components/ui/back-btn/BackBtn";
import MoveBtn from "@/components/ui/move-btn/MoveBtn";
import { useHooks } from "@/hooks/useHooks";
import { formatDate } from "@/utils/formatDate";
import { AlbumRow, tables } from "@/utils/supabase/sql";

interface IPrevNext {
  id: string | number | null;
  title: string;
}

interface IDetail {
  detail: tables;
  variant: "album" | "nomal";
  prev?: IPrevNext;
  next?: IPrevNext;
}

export default function BoardDetail({ detail, variant, prev, next }: IDetail) {
  const { useRoute } = useHooks();
  const path = usePathname();

  // "/"로 path 나누기
  const segments = path.split("/").filter(Boolean);
  // [id] path제외하고 path 합침
  const basePath = "/" + segments.slice(0, -1).join("/");
  const isAlbum = variant === "album";

  return (
    <div className="inner">
      <BackBtn onClick={() => useRoute(basePath)} />
      <div className={style["board-wrap"]}>
        <div className={style.head}>
          <p className="bodyMd-m">{detail.title!}</p>
          <p>{formatDate(detail.created_at!)}</p>
        </div>
        <div className={style.content}>
          {isAlbum ? (
            <div className={style["content-img"]}>
              <img src={(detail as AlbumRow).src!} alt={detail.title!} />
            </div>
          ) : (
            <p>{""}</p>
          )}
        </div>
        <div>
          <MoveBtn
            variant="prev"
            title={prev === null ? "" : prev?.title!}
            isNull={prev === null}
            onClick={() => useRoute(`${basePath}/${prev?.id}`)}
          />
          <MoveBtn
            variant="next"
            title={next === null ? "" : next?.title!}
            isNull={next === null}
            onClick={() => useRoute(`${basePath}/${next?.id}`)}
          />
        </div>
      </div>
    </div>
  );
}
