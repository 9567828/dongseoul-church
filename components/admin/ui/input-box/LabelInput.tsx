import { ChangeEvent, InputHTMLAttributes, RefObject } from "react";
import Button from "../button/Button";
import style from "./input.module.scss";
import InputBox from "./InputBox";
import { RefCallBack } from "react-hook-form";
import InfoMessage from "../info-message/InfoMessage";
import { UserFormType } from "@/utils/propType";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  mode: UserFormType;
  label: string;
  isRequired?: boolean;
  withBtn?: boolean;
  btnName?: string;
  onClick?: () => void;
  errMsg?: string;
}

export default function LabelInput({
  mode,
  type,
  label,
  isRequired = false,
  withBtn = false,
  btnName,
  onClick,
  errMsg,
  ...props
}: IInput) {
  const isError = errMsg !== undefined;

  return (
    <div style={{ width: "100%" }}>
      <div className={style["with-label"]}>
        <label htmlFor={props.id} className={`${isRequired ? style.import : ""}`.trim()}>
          {label}
        </label>
        <div className={style["input-wrap"]}>
          <InputBox {...props} variants="solid" height="md" disabled={mode === "readOnly"} error={isError} />
          {withBtn && <Button btnName={btnName!} variants="primary" visual="outline" onClick={onClick} />}
        </div>
      </div>
      {isError && <InfoMessage mode="error" msg={errMsg!} />}
    </div>
  );
}
