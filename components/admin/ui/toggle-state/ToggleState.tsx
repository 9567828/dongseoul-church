import React from "react";
import style from "./toggle.module.scss";

export default function ToggleState({ children }: { children: React.ReactNode }) {
  return <fieldset className={style["toggle-wrap"]}>{children}</fieldset>;
}
