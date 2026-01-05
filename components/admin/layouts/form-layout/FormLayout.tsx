import { FormHTMLAttributes, useState } from "react";
import style from "./form.module.scss";
import Button from "../../ui/button/Button";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import { useHooks } from "@/hooks/useHooks";
import { UserFormType } from "@/utils/propType";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  mode: UserFormType;
  variants: "grid" | "";
  onDelete: () => void;
  onBack: () => void;
  userId?: string;
  children: React.ReactNode;
}

export default function FormLayout({ mode, variants, onDelete, onBack, userId, children, ...props }: IForm) {
  const [hover, setHover] = useState(false);
  const { isClose } = useSideBarStateStore();
  const { useRoute } = useHooks();

  const btnName = (mode: UserFormType) => {
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
          <Button
            type={mode === "readOnly" ? "button" : "submit"}
            form={props.id}
            btnName={btnName(mode)}
            variants="primary"
            visual="solid"
            onClick={mode === "readOnly" ? () => useRoute(`/admin/users/edit/${userId}`) : undefined}
          />
        </div>
      </footer>
    </form>
  );
}
