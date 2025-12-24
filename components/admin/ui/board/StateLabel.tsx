import style from "./board.module.scss";
import { ButtonHTMLAttributes } from "react";
import Label, { labelColor } from "../label/Label";

interface IState extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: labelColor;
  text: string;
  isEdit?: boolean;
}

export default function StateLabel({ variant, text, isEdit, ...props }: IState) {
  return (
    <button type="button" {...props} className={`${style["label-wrap"]} ${isEdit ? style.cursor : ""}`.trim()}>
      <Label text={text} variant={variant} />
      {isEdit && <img src="/imgs/admin/icons/ic_edit.svg" alt="수정버튼" className={style["edit-btn"]} />}
    </button>
  );
}
