"use client";

import Link from "next/link";
import style from "./photo.module.scss";
import { usePathname } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { SermonRow, tables } from "@/utils/supabase/sql";

interface IPhotoBoard {
  list: tables[];
  variant: "album" | "sermon" | "admin-sermon";
}

export default function PhotoBoard({ list = [], variant }: IPhotoBoard) {
  const path = usePathname();

  return (
    <ul className={style.wrapper}>
      {list.map((m) => {
        const isSermon = variant === "sermon";

        let href: string;
        let target: "_blank" | "";
        if (isSermon) {
          href = (m as SermonRow).youtube_URL!;
          target = "_blank";
        } else {
          href = `${path}/${m.id}`;
          target = "";
        }

        return (
          <li key={m.id}>
            <Link href={href} className={style.content} target={target}>
              <div className={style.img}>
                {isSermon && <div className={style.logo}></div>}
                <img src={m.thumbnail!} alt={m.title!} />
              </div>
              <div className={style["text-wrap"]}>
                <p className="bodyMd-m">{m.title}</p>
                <p className={style.date}>{formatDate(m.created_at)}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
