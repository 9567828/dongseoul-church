import { boardTapList, ITab } from "@/utils/menuList";
import style from "./board.module.scss";
import { useTabStore } from "@/hooks/store/useTabStore";

interface ITabProps {
  list: ITab[];
}

export default function BoardTap({ list }: ITabProps) {
  const { isActive, toggleTab } = useTabStore();

  return (
    <div className={style["tab-wrap"]}>
      {list.map((v, i) => (
        <button
          type="button"
          key={i}
          id={v.id}
          className={`${style["tab-btn"]} ${isActive[v.id] ? style.active : ""}`.trim()}
          onClick={() => toggleTab(v.id)}
        >
          <span>{v.name}</span>
        </button>
      ))}
    </div>
  );
}
