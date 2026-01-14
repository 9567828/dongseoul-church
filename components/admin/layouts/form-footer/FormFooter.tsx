import { useState } from "react";
import Button from "../../ui/button/Button";
import style from "./form.module.scss";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import { FormType } from "@/utils/propType";

interface IFormFooter {
  mode: FormType;
  formId: string;
  onDelete: () => void;
  onBack: () => void;
  onClick: () => void;
  onReset: () => void;
}

export default function FormFooter({ mode, formId, onClick, onDelete, onBack, onReset }: IFormFooter) {
  const [hover, setHover] = useState(false);
  const { isClose } = useSideBarStateStore();

  const btnName = (mode: FormType) => {
    if (mode === "add") {
      return "등록";
    } else if (mode === "edit") {
      return "완료";
    } else {
      return "수정";
    }
  };

  return (
    <footer className={`${style.footer} ${isClose ? style.close : ""}`.trim()}>
      <div className={style.inner}>
        <Button type="button" btnName="돌아가기" variants="back" visual="none" onClick={onBack} />
        <div className={style["btn-wrap"]}>
          {mode === "add" ||
            (mode === "edit" && (
              <button type="button" className="admin-bodyMd-m" onClick={onReset}>
                초기화
              </button>
            ))}
          {mode !== "add" && (
            <Button
              type="button"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={onDelete}
              btnName="삭제"
              variants="delete"
              visual="outline"
              src={`/imgs/admin/icons/ic_trash${hover ? `-hover` : ""}.svg`}
            />
          )}
          <Button
            type={mode === "readOnly" ? "button" : "submit"}
            form={formId}
            btnName={btnName(mode)}
            variants="primary"
            visual="solid"
            onClick={mode === "readOnly" ? onClick : undefined}
          />
        </div>
      </div>
    </footer>
  );
}
