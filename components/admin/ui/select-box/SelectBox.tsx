import { useState } from "react";
import style from "./select.module.scss";

interface ISelect {
  variant: "number";
}

export default function SelectBox({ variant }: ISelect) {
  const [open, setOpen] = useState(false);
  return (
    <div className={style["select-wrap"]}>
      <div className={`${style[variant]} ${open ? style.active : ""}`.trim()} onClick={() => setOpen((prev) => !prev)}>
        1
      </div>
      {open && (
        <ul className={style.option}>
          <li data-value="1" onClick={() => setOpen(false)}>
            1
          </li>
          <li data-value="2" onClick={() => setOpen(false)}>
            2
          </li>
          <li data-value="3" onClick={() => setOpen(false)}>
            3
          </li>
        </ul>
      )}
    </div>
  );
}
