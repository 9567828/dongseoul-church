"use client";

import { MouseEvent } from "react";
import style from "./quickbtn.module.scss";

interface IQuick {
  id: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  src: string;
  alt: string;
  label: string;
}

export default function QucickBtn({ id, label, src, alt, onClick }: IQuick) {
  return (
    <button id={id} className={style.button} onClick={onClick}>
      <p className={style.icon}>
        <img src={src} alt={alt} />
      </p>
      <p className={style.txt}>{label}</p>
    </button>
  );
}
