import CheckBox from "../check-box/CheckBox";
import style from "./board.module.scss";

interface ITableContent {
  grid?: string;
  allChecked: boolean;
  isChecked: boolean;
  addChecked: boolean;
  id: string;
  toggle: () => void;
  children: React.ReactNode;
}

export default function TableContent({ grid, allChecked, isChecked, addChecked, id, toggle, children }: ITableContent) {
  return (
    <div
      style={grid ? { gridTemplateColumns: `${grid}` } : undefined}
      className={`${style["table-content"]} ${allChecked || isChecked ? style.active : ""}`.trim()}
    >
      {addChecked && (
        <label htmlFor={id} className="check-box">
          <CheckBox
            id={id}
            variants="main"
            onChange={(e) => {
              e.stopPropagation();

              toggle();
            }}
            checked={allChecked ? allChecked : isChecked}
          />
        </label>
      )}
      {children}
    </div>
  );
}
