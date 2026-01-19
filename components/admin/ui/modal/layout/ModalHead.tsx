import Button from "../../button/Button";
import style from "../modal.module.scss";

interface IModalHeadProps {
  title: string;
  fontType: "admin-bodySm-b" | "admin-bodySm-r";
  variant?: "wide" | "";
  onClose: () => void;
}

export default function ModalHead({ title, fontType, variant = "", onClose }: IModalHeadProps) {
  return (
    <div className={`${style["modal-title"]} ${variant !== "" ? style[variant] : ""}`.trim()}>
      <p className={fontType}>{title}</p>
      <Button onClick={onClose} btnName="" variants="close" visual="none" />
    </div>
  );
}
