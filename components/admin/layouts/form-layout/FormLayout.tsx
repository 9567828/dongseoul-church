import { FormHTMLAttributes, useState } from "react";
import style from "./form.module.scss";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import { FormType } from "@/utils/propType";
import FormFooter from "../form-footer/FormFooter";

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
  return (
    <form {...props} className={style[variants]}>
      {children}
      <FormFooter formId={props.id!} mode={mode} onBack={onBack} onClick={onMoveEdit} onDelete={onDelete} onReset={onReset} />
    </form>
  );
}
