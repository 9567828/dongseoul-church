import { ChangeEvent } from "react";
import InputBox from "./InputBox";
import Button from "../button/Button";
import style from "./input.module.scss";

interface IInput {
  mode: "edit" | "add" | "readOnly";
  type: "text" | "email" | "password" | "phone";
  id: string;
  label: string;
  isImport?: boolean;
  placeholder?: string;
  withBtn?: boolean;
  btnName?: string;
  onClick?: () => void;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function LabelInput({
  id,
  mode,
  type,
  label,
  isImport = false,
  placeholder,
  withBtn = false,
  btnName,
  onClick,
  error,
  value,
  onChange,
}: IInput) {
  return (
    <div className={style["with-label"]}>
      <label htmlFor={id} className={`${isImport ? style.import : ""}`.trim()}>
        {label}
      </label>
      <div className={style["input-wrap"]}>
        <InputBox
          type={type}
          id={id}
          variants="solid"
          height="md"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={mode === "readOnly"}
          error={error}
        />
        {withBtn && <Button btnName={btnName!} variants="primary" visual="outline" onClick={onClick} />}
      </div>
    </div>
  );
}
