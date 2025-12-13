import style from "./board.module.scss";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return <div className={style.table}>{children}</div>;
}
