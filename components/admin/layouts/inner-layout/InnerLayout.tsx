"use client";

import Button from "../../ui/button/Button";
import style from "./inner-layout.module.scss";

interface ILayout {
  variants: "board" | "profile";
  title: string;
  needBtn: boolean;
  btnName?: string;
  iconSrc?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function InnerLayout({ variants, title, needBtn, btnName = "", iconSrc, onClick, children }: ILayout) {
  return (
    <>
      <section className={style.wrap}>
        <h5 className="admin-titleXl-b">{title}</h5>
        {needBtn && <Button type="button" btnName={btnName} variants="primary" visual="solid" src={iconSrc} onClick={onClick} />}
      </section>
      <section className={`${style["white-panel"]} ${style[variants]}`}>{children}</section>
    </>
  );
}
