"use client";

import Link from "next/link";
import style from "./photo.module.scss";
import { usePathname } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { Database, Tables } from "@/database.types";

export type AlbumRow = Tables<"albums">;
export type SermonRow = Tables<"sermons">;

export interface IPhotoList {
  id?: string | number;
  created_at: string;
  src?: string | null;
  writer?: string | null;
  thumbnail?: string | null;
  title?: string | null;
  published_date?: string | null;
  youtube_URL?: string | null;
}

interface IPhotoBoard {
  list: IPhotoList[];
  variant: "album" | "sermon";
}

export default function PhotoBoard({ list = [], variant }: IPhotoBoard) {
  const path = usePathname();

  return (
    <ul className={style.wrapper}>
      {list.map((m, i) => (
        <li key={i}>
          <Link
            href={variant === "album" ? `${path}/${m.id}` : `${m.youtube_URL}`}
            className={style.content}
            target={variant === "sermon" ? "_blank" : ""}
          >
            <div className={style.img}>
              {variant === "sermon" && <div className={style.logo}></div>}
              <img src={m.thumbnail!} alt={m.title!} />
            </div>
            <div className={style["text-wrap"]}>
              <p className="bodyMd-m">{m.title}</p>
              <p className={style.date}>{formatDate(m.created_at)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
