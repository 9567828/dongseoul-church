"use client";

import { IPhotoList } from "@/components/layouts/board/photo-board/PhotoBoard";
import style from "./gallery.module.scss";
import { useSelectList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useHooks } from "@/hooks/useHooks";
import Link from "next/link";
import { Tables } from "@/database.types";

export default function Gallery() {
  const { useRoute } = useHooks();
  const { data: { list } = { list: [] }, isLoading } = useSelectList<Tables<"albums">>("albums", 6);

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
              <Link href={`/community/album/${v.id}`}>
                <img src={v.thumbnail!} alt={v.title!} />
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
