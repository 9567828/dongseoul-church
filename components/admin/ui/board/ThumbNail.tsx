import style from "./board.module.scss";

interface IThumbnail {
  src: string;
  alt: string;
}

export default function ThumbNail({ src, alt }: IThumbnail) {
  return (
    <div className={style["thumbnail-wrap"]}>
      <img src={src} alt={alt} />
    </div>
  );
}
