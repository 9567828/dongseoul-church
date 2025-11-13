"use client";
import style from "./youtube.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useSelectList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { SermonRow } from "@/utils/supabase/sql";

export default function Youtube() {
  const { data: { list } = { list: [] }, isLoading } = useSelectList<SermonRow>("sermons", 3);

  return (
    <section id="youtubeSection" className={style.section}>
      <div className={style["tit-wrap"]}>
        <p>말씀영상</p>
      </div>
      <div className={style["slide-wrap"]}>
        {list.length <= 0 && [] ? (
          <div>로딩중</div>
        ) : (
          list.map((v, i) => (
            <Link key={i} href={v.youtube_URL!} target="_blank">
              <div className={`${style.imgWrap}`.trim()}>
                <div className={style.logo}></div>
                <img src={v.thumbnail!} alt={v.title!} />
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
