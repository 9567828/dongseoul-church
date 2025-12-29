import { ButtonHTMLAttributes } from "react";
import style from "./button.module.scss";

interface Ibutton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variants: "login" | "trans" | "primary" | "small" | "secondary" | "delete" | "back" | "close";
  visual: "solid" | "outline" | "" | "none";
  color?: "gray";
  btnName: string;
  src?: string;
  height?: string;
}

export default function Button({ variants, visual, color, btnName, src, height, ...props }: Ibutton) {
  return (
    <button
      {...props}
      style={height ? { height: `${height}` } : undefined}
      className={`${style[variants]} ${visual !== "none" ? style.default : ""} ${visual !== "none" ? style[visual] : ""} ${
        color ? style[color] : ""
      }`.trim()}
    >
      {src && <img src={src} alt={btnName} />}
      {variants === "close" && <img src="/imgs/admin/icons/ic_close.svg" alt="닫기버튼" />}
      {variants === "back" && <div className={style.icon}></div>}
      {btnName !== "" && <span>{btnName}</span>}
    </button>
  );
}
