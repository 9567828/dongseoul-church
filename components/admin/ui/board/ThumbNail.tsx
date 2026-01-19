import style from "./board.module.scss";

interface IThumbnail {
  mode?: "boards" | "search";
  src: string;
  alt: string;
}

export default function ThumbNail({ src, alt, mode = "boards" }: IThumbnail) {
  return (
    <div className={`${style["thumbnail-wrap"]} ${style[mode]}`}>
      <div className={style.inner}>
        <img src={src || "/imgs/admin/img-default.png"} alt={alt} />
      </div>
    </div>
  );
}
