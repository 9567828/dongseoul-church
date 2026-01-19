import style from "./full.module.scss";
import { RefObject } from "react";

interface IfullProps {
  onClick: () => void;
  img: string;
  alt: string;
}

export default function FullImg({ img, alt, onClick }: IfullProps) {
  return (
    <div className={style["img-bg"]} onClick={onClick}>
      <div className={style.img}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
}
