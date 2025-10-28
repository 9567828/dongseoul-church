"use client";

import Link from "next/link";
import style from "./photo.module.scss";
import { usePathname } from "next/navigation";
import { useHooks } from "@/hooks/useHooks";

export interface IPhotoList {
  id: string;
  created_at: string;
  title: string;
  thumbnail: string;
  youtube_URL?: string;
}

interface IPhotoBoard {
  list: IPhotoList[];
  variant: "album" | "sermon";
}

export default function PhotoBoard({ list, variant }: IPhotoBoard) {
  const path = usePathname();
  const { useRoute } = useHooks();

  return (
    <ul className={style.wrapper}>
      {list.map((m, i) => (
        <li key={i}>
          <Link href={variant === "album" ? `${path}/${m.id}` : m.youtube_URL!} className={style.content}>
            <div className={style.img}>
              {variant === "sermon" && <div className={style.logo}></div>}
              <img src={m.thumbnail} alt={m.title} />
            </div>
            <div className={style["text-wrap"]}>
              <p className="bodyMd-m">{m.title}</p>
              <p className={style.date}>{m.created_at}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
