import style from "./move.module.scss";

interface IMove {
  variant?: "prev" | "next";
  onClick: () => void;
  isNull: boolean;
  title: string;
}

export default function MoveBtn({ variant = "prev", onClick, title, isNull = false }: IMove) {
  return (
    <div className={style["btn-wrap"]}>
      {isNull ? (
        <p className="bodyMd-m">{variant === "prev" ? "이전글 없음" : "다음글 없음"}</p>
      ) : (
        <div className={style["nav-wrap"]}>
          <nav className={style.nav}>
            <p className="bodyMd-m">{variant === "prev" ? "이전글" : "다음글"}</p>
            <img
              src="/imgs/icons/ic_Arrow-updown.svg"
              alt="화살표"
              style={variant === "next" ? { transform: "rotate(180deg)" } : undefined}
            />
          </nav>
          <button className={style.btn} onClick={onClick}>
            <p>{title}</p>
          </button>
        </div>
      )}
    </div>
  );
}
