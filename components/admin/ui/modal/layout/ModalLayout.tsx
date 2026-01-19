import style from "../modal.module.scss";

interface IModalProps {
  hasDim?: boolean;
  variant: "row" | "center";
  changeBottm?: boolean;
  left?: string;
  children: React.ReactNode;
  modalRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ModalLayout({ hasDim = false, variant, changeBottm = false, left, modalRef, children }: IModalProps) {
  return (
    <>
      {hasDim && <div className={style["modal-dim"]}></div>}
      <div
        ref={modalRef}
        style={left ? { left: `${left}` } : undefined}
        className={`${style["modal-continer"]} ${style[variant]} ${changeBottm ? style.change : ""}`.trim()}
      >
        {children}
      </div>
    </>
  );
}
