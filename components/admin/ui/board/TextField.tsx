import Link from "next/link";
import AvatarWrap from "../avatar-wrap/AvatarWrap";
import style from "./board.module.scss";
import FieldLayout from "./FieldLayout";

interface IText {
  withImg: boolean;
  src?: string | null;
  text: string;
  link?: string;
  isBlank?: boolean;
  description?: string;
}

export default function TextField({ text, link, isBlank, description, withImg, src = null }: IText) {
  return (
    <FieldLayout>
      {withImg && <AvatarWrap size="md" src={src !== null ? src : null} />}
      <div className={style["text-box"]}>
        {!link ? (
          <p className={style.text}>{text}</p>
        ) : (
          <Link href={link} target={isBlank ? "_blank" : "_self"}>
            {text}
          </Link>
        )}
        {description && <p className={style["sub-text"]}>{description}</p>}
      </div>
    </FieldLayout>
  );
}
