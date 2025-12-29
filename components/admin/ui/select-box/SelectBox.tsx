import React, { useRef, useState } from "react";
import style from "./select.module.scss";
import { useHooks } from "@/hooks/useHooks";

interface ISelect {
  variant: "number";
  optList: string[];
  value: string;
  onChange: (item: string) => void;
  onClick?: (item: string) => void;
}

export default function SelectBox({ variant, optList, value, onChange, onClick }: ISelect) {
  const [open, setOpen] = useState(false);
  const { useOnClickOutSide } = useHooks();

  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutSide(selectRef, () => setOpen(false));

  const handleSelect = (item: string) => {
    if (item) {
      onChange(item);
      if (typeof onClick === "function") {
        onClick(item);
      }
      setOpen(false);
    }
  };

  return (
    <div ref={selectRef} className={style["select-wrap"]}>
      <div className={`${style[variant]} ${open ? style.active : ""}`.trim()} onClick={() => setOpen((prev) => !prev)}>
        {value}
      </div>
      {open && (
        <ul className={style.option}>
          {optList.map((v, i) => (
            <li key={i} data-value={v} onClick={() => handleSelect(v)}>
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
