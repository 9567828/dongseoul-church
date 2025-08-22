import style from "../styles/components/board.module.scss";

const contentList = [
  { title: "2025.08.18 주보", href: "", writer: "작성자", date: "2025.08.18" },
  { title: "2025.08.18 주보", href: "", writer: "작성자", date: "2025.08.18" },
  { title: "2025.08.18 주보", href: "", writer: "작성자", date: "2025.08.18" },
  { title: "2025.08.18 주보", href: "", writer: "작성자", date: "2025.08.18" },
  { title: "2025.08.18 주보", href: "", writer: "작성자", date: "2025.08.18" },
];

export default function Board() {
  return (
    <div className={style["table-wrap"]}>
      <ul className={`${style.table} ${style["table-head"]}`}>
        <li className={style["table-line"]}>
          <p>No.</p>
          <p>제목</p>
        </li>
        <li className={style["table-line"]}>
          <p>작성자</p>
          <p className={style.date}>작성일자</p>
        </li>
      </ul>
      <ul className={style["table-content-wrap"]}>
        {contentList.map((c, i) => (
          <li key={i} className={`${style.table} ${style["table-content"]}`}>
            <div className={style["table-line"]}>
              <p className={style.num}>{i + 1}</p>
              <p>
                <a href={c.href} className={style.title}>
                  {c.title}
                </a>
              </p>
            </div>
            <div className={style["table-line"]}>
              <p>{c.writer}</p>
              <p className={style.date}>{c.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
