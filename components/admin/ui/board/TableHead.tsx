import style from "./board.module.scss";
import CheckBox from "../check-box/CheckBox";
import { useSortState } from "@/hooks/store/useSortState";
import { ChangeEvent } from "react";

export type tableHeadType = {
  id: string;
  name: string;
  isSort: boolean;
  width?: string;
};

type tableHead = {
  headList: tableHeadType[];
  checkBtnId: string;
  gridCol?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
};

export default function TableHead({ checkBtnId, headList, gridCol, onChange, checked }: tableHead) {
  const { sortMap, toggleSort } = useSortState();

  return (
    <div className={style["table-head"]} style={gridCol ? { gridTemplateColumns: `${gridCol}` } : undefined}>
      <label htmlFor={checkBtnId} className="check-box">
        <CheckBox id={checkBtnId} variants="main" checked={checked} onChange={onChange} />
      </label>
      {headList.map((h, i) => {
        const state = sortMap[h.id] || "none";
        // const state = sortMap.sort;

        return (
          <div
            key={i}
            id={h.id}
            style={h.width ? { width: `${h.width}` } : undefined}
            className={`${style["filed-name"]} ${h.isSort ? style["add-sort-icon"] : ""}`.trim()}
            onClick={h.isSort ? () => toggleSort(h.id) : undefined}
          >
            <p>{h.name}</p>
            {h.isSort && (
              <img
                src={`/imgs/admin/icons/ic_arrow-${
                  state === "asc" ? `narrow-up` : state === "desc" ? `narrow-down` : `down-up`
                }.svg`}
                alt="필터버튼"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
