import Button from "../button/Button";
import style from "./modal.module.scss";

interface IModal {
  variant?: "edit" | "nomal";
  changeHeight?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function ModalLayout({ variant = "nomal", changeHeight = false, title, onClick, children }: IModal) {
  return (
    <>
      {variant === "nomal" && <div className={style["modal-bg"]}></div>}
      <div className={`${style["modal-continer"]} ${style[variant]} ${changeHeight ? style.change : ""}`.trim()}>
        <div className={`${style["modal-title"]} ${style[variant]}`}>
          <p>{title}</p>
          <Button onClick={onClick} btnName="" variants="close" visual="none" />
        </div>
        <div className={style["modal-content"]}>{children}</div>
      </div>
    </>
  );
}
