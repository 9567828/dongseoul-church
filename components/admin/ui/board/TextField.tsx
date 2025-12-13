import Link from "next/link";
import AvatarWrap from "../avatar-wrap/AvatarWrap";
import style from "./board.module.scss";

interface IText {
  withImg: boolean;
  src?: string;
  text: string;
  link?: string;
  isBlank?: boolean;
  description?: string;
}

export default function TextField({ text, link, isBlank, description, withImg, src }: IText) {
  return (
    <div className={style["text-field-wrap"]}>
      {withImg && <AvatarWrap variant={src !== "" ? "img" : "empty"} size="md" src={src} />}
      <div className={style["text-box"]}>
        {!link ? (
          <p>{text}</p>
        ) : (
          <Link href={link} target={isBlank ? "_blank" : "_self"}>
            {text}
          </Link>
        )}
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
