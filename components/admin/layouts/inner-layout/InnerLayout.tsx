"use client";

import Button from "../../ui/button/Button";
import style from "./inner-layout.module.scss";

interface ILayout {
  mode: "default" | "withFooter";
  isGrid?: boolean;
  title: string;
  needBtn?: boolean;
  btnName?: string;
  iconSrc?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function InnerLayout({ mode, title, needBtn = false, btnName = "", iconSrc, isGrid, onClick, children }: ILayout) {
  return (
    <main className={`${style.inner} ${mode === "withFooter" ? style.height : ""}`.trim()}>
      <section className={style.wrap}>
        <h5 className="admin-titleXl-b">{title}</h5>
        {needBtn && <Button type="button" btnName={btnName} variants="primary" visual="solid" src={iconSrc} onClick={onClick} />}
      </section>
      {isGrid ? <div className={style.grid}>{children}</div> : <>{children}</>}
    </main>
  );
}
