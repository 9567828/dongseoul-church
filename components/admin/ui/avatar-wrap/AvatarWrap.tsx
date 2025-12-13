import style from "./avatar.module.scss";

interface IAvatar {
  variant: "img" | "empty";
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
}

export default function AvatarWrap({ variant, size = "sm", src }: IAvatar) {
  return (
    <div className={`${style.default} ${style[variant]} ${style[size]}`}>
      <img src={src !== "" && src ? src : "/imgs/admin/icons/ic_user-dark.svg"} alt="user-image" />
    </div>
  );
}
