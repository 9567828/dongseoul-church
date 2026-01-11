"use client";

import Button from "../../ui/button/Button";
import style from "./inner-layout.module.scss";

interface ILayout {
  mode: "default" | "withFooter";
  title: string;
  needBtn?: boolean;
  btnName?: string;
  iconSrc?: string;
  sub1?: string;
  sub2?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function InnerLayout({
  mode,
  title,
  needBtn = false,
  btnName = "",
  iconSrc,
  onClick,
  sub1,
  sub2,
  children,
}: ILayout) {
  return (
    <main className={`${style.inner} ${mode === "withFooter" ? style.height : ""}`.trim()}>
      <section className={style.wrap}>
        <h5 className="admin-titleXl-b">{title}</h5>
        {needBtn && <Button type="button" btnName={btnName} variants="primary" visual="solid" src={iconSrc} onClick={onClick} />}
      </section>
      {(sub1 || sub2) && (
        <section className={style["sub-wrap"]}>
          <p>{sub1}</p>
          <p>{sub2}</p>
        </section>
      )}
      {children}
    </main>
  );
}
