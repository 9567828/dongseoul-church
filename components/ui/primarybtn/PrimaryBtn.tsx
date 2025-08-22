"use client";

import { MouseEvent } from "react";
import style from "./primarybtn.module.scss";

interface IButton {
  label: string;
  src?: string;
  alt?: string;
  classNameKey?: keyof typeof style;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function PrimaryBtn({ label, src, alt, classNameKey, onClick }: IButton) {
  return (
    <button className={`${style.btn} ${classNameKey ? style[classNameKey] : ""}`.trim()} onClick={onClick}>
      {src ? <img src={src} alt={alt} /> : null}
      {label}
    </button>
  );
}
