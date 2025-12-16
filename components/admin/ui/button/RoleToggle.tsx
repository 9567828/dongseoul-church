import { InputHTMLAttributes } from "react";
import style from "./button.module.scss";

interface IRoleState extends InputHTMLAttributes<HTMLInputElement> {
  isSuper: boolean;
}

export default function RoleToggle({ isSuper, ...props }: IRoleState) {
  return (
    <label htmlFor={props.id} className={style["role-wrap"]}>
      <input type="checkbox" {...props} />
      <p className={`${style["role-text"]} ${isSuper ? style.super : ""}`}>super</p>
      <p className={`${style["role-text"]} ${isSuper ? "" : style.admin}`}>admin</p>
    </label>
  );
}
