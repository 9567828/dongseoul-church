import style from "./label.module.scss";

interface ILabel {
  variant: "orange" | "purple" | "green" | "red";
  text: string;
}

export default function Label({ variant, text }: ILabel) {
  return (
    <div className={`${style.default} ${style[variant]}`}>
      <p>{text}</p>
    </div>
  );
}
