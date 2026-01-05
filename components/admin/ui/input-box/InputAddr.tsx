import { UserFormType } from "@/utils/propType";
import Button from "../button/Button";
import style from "./input.module.scss";
import InputBox from "./InputBox";

interface IAddr {
  mode: UserFormType;
}

export default function InputAddr({ mode }: IAddr) {
  return (
    <div className={style["addr-wrap"]}>
      <div>
        {mode !== "readOnly" && <p className={style["addr-label"]}>주소입력</p>}
        <div className={style.flex}>
          <div className={`${style.default} ${style.addr}`}>
            <p>주소를 입력해 주세요</p>
          </div>
          <Button type="button" variants="secondary" visual="outline" btnName="주소검색" disabled={mode === "readOnly"} />
        </div>
      </div>
      <InputBox variants="solid" height="md" placeholder="상세주소를 입력해 주세요" disabled={mode === "readOnly"} />
    </div>
  );
}
