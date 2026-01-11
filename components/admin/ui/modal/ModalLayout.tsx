import Button from "../button/Button";
import style from "./modal.module.scss";

interface IModal {
  variant?: "edit" | "nomal" | "add";
  changeHeight?: boolean;
  title: string;
  onClick: () => void;
  modalRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export default function ModalLayout({ variant = "nomal", changeHeight = false, title, onClick, modalRef, children }: IModal) {
  return (
    <>
      {(variant === "nomal" || variant === "add") && <div className={style["modal-bg"]}></div>}
      <div ref={modalRef} className={`${style["modal-continer"]} ${style[variant]} ${changeHeight ? style.change : ""}`.trim()}>
        <div className={`${style["modal-title"]} ${style[variant]}`}>
          <p>{title}</p>
          <Button onClick={onClick} btnName="" variants="close" visual="none" />
        </div>
        <div className={`${style["modal-content"]} ${style[variant]}`}>{children}</div>
      </div>
    </>
  );
}
