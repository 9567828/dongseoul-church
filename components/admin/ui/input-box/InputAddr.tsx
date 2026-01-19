import { FormType } from "@/utils/propType";
import Button from "../button/Button";
import style from "./input.module.scss";
import InputBox from "./InputBox";
import { InputHTMLAttributes } from "react";

interface IAddr extends InputHTMLAttributes<HTMLInputElement> {
  mode: FormType;
  addr: string | null;
  code: string | null;
  errMode?: boolean;
}

export default function InputAddr({ mode, code, addr, errMode, ...props }: IAddr) {
  const handlePopUpAddr = () => {
    const width = 500;
    const height = 600;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      "/search-addr?from=user",
      "daumPostcode",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
    );
  };

  return (
    <div className={style["addr-wrap"]}>
      <div>
        {mode !== "readOnly" && <p className={style["addr-label"]}>주소입력</p>}
        <div className={style.flex}>
          <div className={style["addr-search"]}>
            <p className={style.addr}>{code === "" ? `우편번호` : code}</p>
            <p className={style.addr}>{addr === "" ? `주소를 입력해 주세요` : addr}</p>
          </div>

          <Button
            type="button"
            variants="secondary"
            visual="outline"
            btnName="주소검색"
            onClick={handlePopUpAddr}
            disabled={mode === "readOnly"}
          />
        </div>
      </div>
      <InputBox
        {...props}
        variants="solid"
        height="md"
        placeholder="상세주소를 입력해 주세요"
        error={errMode}
        disabled={mode === "readOnly"}
      />
    </div>
  );
}
