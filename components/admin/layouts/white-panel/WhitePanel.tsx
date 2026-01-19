import style from "./white.module.scss";

interface IPanel {
  title?: string;
  variants: "board" | "profile" | "detail";
  children: React.ReactNode;
}

export default function WhitePanel({ title, variants, children }: IPanel) {
  return (
    <section className={`${style["white-panel"]} ${style[variants]}`.trim()}>
      {title && <h4 className={style["panel-title"]}>{title}</h4>}
      {variants === "profile" ? (
        <div className={`${variants === "profile" ? style.flex : ""}`.trim()}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </section>
  );
}
