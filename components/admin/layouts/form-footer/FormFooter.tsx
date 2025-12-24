import { useState } from "react";
import Button from "../../ui/button/Button";
import style from "./form.module.scss";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";

type ModeType = "add" | "edit" | "readOnly";

interface IFormFooter {
  mode: ModeType;
  formId: string;
  onDelete: () => void;
  onClick: () => void;
  onBack: () => void;
}

export default function FormFooter({ mode, formId, onDelete, onClick, onBack }: IFormFooter) {
  const [hover, setHover] = useState(false);
  const { isClose } = useSideBarStateStore();

  const btnName = (mode: ModeType) => {
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
      <Button type="button" btnName="돌아가기" variants="back" visual="none" onClick={onBack} />
      <div className={style["btn-wrap"]}>
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
        <Button type="submit" form={formId} btnName={btnName(mode)} variants="primary" visual="solid" onClick={onClick} />
      </div>
    </footer>
  );
}
