import style from "./label.module.scss";

export type labelColor = "orange" | "purple" | "green" | "red" | "yellow";

interface ILabel {
  variant: labelColor;
  text: string;
}

export default function Label({ variant, text }: ILabel) {
  return (
    <div className={`${style.default} ${style[variant]}`}>
      <p>{text}</p>
    </div>
  );
}
