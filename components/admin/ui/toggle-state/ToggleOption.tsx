import { InputHTMLAttributes } from "react";
import style from "./toggle.module.scss";

interface IState extends InputHTMLAttributes<HTMLInputElement> {
  inputName: string;
  state: string;
}

export default function ToggleOption({ inputName, state, ...props }: IState) {
  return (
    <label htmlFor={state}>
      <input type="radio" name={inputName} id={state} {...props} />
      <p className={style["opt-text"]}>{state}</p>
    </label>
  );
}
