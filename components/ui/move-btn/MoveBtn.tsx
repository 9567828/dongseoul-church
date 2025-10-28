import style from "./move.module.scss";

interface IMove {
  variant?: "prev" | "next";
  onClick: () => void;
  isNull: boolean;
}

export default function MoveBtn({ variant = "prev", onClick, isNull = false }: IMove) {
  return (
    <div className={style["btn-wrap"]}>
      {isNull ? (
        <p className="bodyMd-m">{variant === "prev" ? "이전글 없음" : "다음글 없음"}</p>
      ) : (
        <button className={style.btn} onClick={onClick}>
          <p className="bodyMd-m">{variant === "prev" ? "이전글" : "다음글"}</p>
          <img
            src="/imgs/icons/ic_Arrow-updown.svg"
            alt="화살표"
            style={variant === "next" ? { transform: "rotate(180deg)" } : undefined}
          />
        </button>
      )}
    </div>
  );
}
