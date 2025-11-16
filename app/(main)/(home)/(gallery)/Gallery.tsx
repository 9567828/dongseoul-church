"use client";

import style from "./gallery.module.scss";
import { useSelectList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useHooks } from "@/hooks/useHooks";
import Link from "next/link";
import { AlbumRow } from "@/utils/supabase/sql";
import { formatDate } from "@/utils/formatDate";

export default function Gallery() {
  const { useRoute } = useHooks();
  const { data: { list } = { list: [] }, isLoading } = useSelectList<AlbumRow>("albums", 6, true);

  return (
    <section className={style.section}>
      <div className={style["img-wrap"]}>
        <div className={`${style["item-box"]} ${style["txt-wrap"]}`}>
          <p>LATEST</p>
          <p>ALBUM</p>
        </div>
        {list.map((v, i) => (
          <div key={i} className={style["item-box"]}>
            {isLoading ? (
              <div>로딩중</div>
            ) : (
              <Link href={`/community/album/${v.id}`} className={style["img-box"]}>
                <img src={v.thumbnail!} alt={v.title!} />
                <div className={style.dim}>
                  <p>{v.title}</p>
                  <p>{formatDate(v.created_at)}</p>
                </div>
              </Link>
            )}
          </div>
        ))}
        <div className={`${style["item-box"]} ${style["txt-wrap"]} ${style.more}`}>
          <p>교회사진</p>
          <p onClick={() => useRoute("/community/album")}>더보기</p>
        </div>
      </div>
    </section>
  );
}
