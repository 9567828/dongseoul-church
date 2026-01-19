import { InputHTMLAttributes } from "react";
import style from "./input.module.scss";
import InfoMessage from "../info-message/InfoMessage";

interface Iinput extends InputHTMLAttributes<HTMLInputElement> {
  variants: "login" | "solid" | "outline";
  height?: "sm" | "md" | "lg";
  error?: boolean;
}

export default function InputBox({ variants, height = "sm", error = false, ...props }: Iinput) {
  return (
    <div
      className={`${style.wrapper} ${style[variants]} ${style[height]} ${
        variants === "solid" || variants === "outline" ? style.default : ""
      } ${error ? style.error : ""}`.trim()}
    >
      <input {...props} />
    </div>
  );
}
