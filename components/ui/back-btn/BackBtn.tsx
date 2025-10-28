"use client";

import { useHooks } from "@/hooks/useHooks";
import style from "./back.module.scss";

export default function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button className={style.btn} onClick={onClick}>
      <img src="/imgs/icons/ic_arrow.svg" alt="화살표" />
      <p className="bodyMd-m">목록으로</p>
    </button>
  );
}
