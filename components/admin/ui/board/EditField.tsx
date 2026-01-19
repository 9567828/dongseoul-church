import style from "./board.module.scss";

export default function EditField({ children }: { children: React.ReactNode }) {
  return <div className={style["modal-wrap"]}>{children}</div>;
}
