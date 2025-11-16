"use client";

import style from "./pagetitle.module.scss";
import { useHooks } from "@/hooks/useHooks";

export default function PageTitle() {
  const { getPageName } = useHooks();

  const { title, sub } = getPageName() || { title: "", sub: undefined };

  return (
    <div className={style["bg-img"]}>
      <div className={style["name-wrap"]}>
        {sub === undefined ? null : <p>{title}</p>}
        <h1>{sub === undefined ? title : sub}</h1>
      </div>
    </div>
  );
}
