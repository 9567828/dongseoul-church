import style from "./visit.module.scss";

interface IVisit {
  title: string;
  content: string;
  icon: string;
  number: string;
  isDashed?: boolean;
  color?: string;
}

export default function Visit({ title, content, icon, number, isDashed = true, color }: IVisit) {
  return (
    <div className={style.wrapper}>
      <div className={style["number-wrap"]}>
        <div className={style.number}>
          <p>{number}</p>
        </div>
        {isDashed ? <div className={style.dashed}></div> : null}
      </div>
      <div className={style["content-wrap"]}>
        <div className={style["line-box"]} style={color ? { backgroundColor: `${color}` } : undefined}></div>
        <img src={`/imgs/icons/${icon}`} alt={title} />
        <div className={style["text-wrap"]}>
          <h4 style={color ? { color: `${color}` } : undefined}>{title}</h4>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
