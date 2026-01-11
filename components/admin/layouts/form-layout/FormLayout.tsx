import { FormHTMLAttributes, useState } from "react";
import style from "./form.module.scss";
import Button from "../../ui/button/Button";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import { FormType } from "@/utils/propType";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  mode: FormType;
  variants: "grid" | "column";
  onDelete: () => void;
  onBack: () => void;
  onMoveEdit: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

export default function FormLayout({ mode, variants, onDelete, onBack, onReset, onMoveEdit, children, ...props }: IForm) {
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
    <form {...props} className={style[variants]}>
      {children}
      <footer className={`${style.footer} ${isClose ? style.close : ""}`.trim()}>
        <Button type="button" btnName="돌아가기" variants="back" visual="none" onClick={onBack} />
        <div className={style["btn-wrap"]}>
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
          {mode === "add" && (
            <button type="button" className="" onClick={onReset}>
              초기화
            </button>
          )}
          <Button
            type={mode === "readOnly" ? "button" : "submit"}
            form={props.id}
            btnName={btnName(mode)}
            variants="primary"
            visual="solid"
            onClick={mode === "readOnly" ? onMoveEdit : undefined}
          />
        </div>
      </footer>
    </form>
  );
}
