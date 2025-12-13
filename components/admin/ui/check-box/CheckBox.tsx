import { InputHTMLAttributes } from "react";
import style from "./checkbox.module.scss";

interface ICheck extends InputHTMLAttributes<HTMLInputElement> {
  variants: "login" | "main";
  children?: React.ReactNode;
}

export default function CheckBox({ variants, children, ...props }: ICheck) {
  return (
    <div className={style["check-box"]}>
      <input type="checkbox" {...props} className={style[variants]} />
      <label htmlFor={props.id}></label>
      {children}
    </div>
  );
}
