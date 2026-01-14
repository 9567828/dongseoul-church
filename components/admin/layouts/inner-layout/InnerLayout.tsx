"use client";

import Button from "../../ui/button/Button";
import style from "./inner-layout.module.scss";

type SubType = { date: string; name: string };

interface ILayout {
  mode: "default" | "withFooter";
  title: string;
  needBtn?: boolean;
  btnName?: string;
  iconSrc?: string;
  sub1?: SubType;
  sub2?: SubType;
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
      <div className={style.container}>
        <section className={style.wrap}>
          <h5 className="admin-titleXl-b">{title}</h5>
          {needBtn && (
            <Button type="button" btnName={btnName} variants="primary" visual="solid" src={iconSrc} onClick={onClick} />
          )}
        </section>
        {(sub1 || sub2) && (
          <div className={style["sub-wrap"]}>
            <section>
              <p>{sub1?.date}</p>
              <p>{sub1?.name}</p>
            </section>
            <section>
              <p>{sub2?.date}</p>
              <p>{sub2?.name}</p>
            </section>
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
