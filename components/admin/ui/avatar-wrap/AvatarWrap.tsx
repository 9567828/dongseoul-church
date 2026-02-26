import { HTMLAttributes } from "react";
import style from "./avatar.module.scss";

interface IAvatar extends HTMLAttributes<HTMLDivElement> {
  // variant: "img" | "empty";
  src: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AvatarWrap({ size = "sm", src, ...props }: IAvatar) {
  return (
    <div
      {...props}
      className={`${style.default} ${src !== null && src !== "" ? style.img : style.empty} ${style[size]}`}
    >
      <img src={src !== null && src !== "" ? src : "/imgs/admin/icons/ic_user-dark.svg"} alt="user-image" />
    </div>
  );
}
