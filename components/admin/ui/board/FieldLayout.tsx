import style from "./board.module.scss";

export default function FieldLayout({ children }: { children: React.ReactNode }) {
  return <div className={style["text-field-wrap"]}>{children}</div>;
}
