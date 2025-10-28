import style from "./board.module.scss";

export interface IBoardField {
  title: string;
  href: string;
  writer: string;
  date: string;
}

interface IBoard {
  list: IBoardField[];
}

export default function Board({ list }: IBoard) {
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
        {list.map((c, i) => (
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
