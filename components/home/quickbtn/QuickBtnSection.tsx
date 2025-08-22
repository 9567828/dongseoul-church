"use client";

import { MouseEvent } from "react";
import style from "./quickbtn.module.scss";
import QucickBtn from "./QuickBtn";

const btnList = [
  { id: "locationBtn", src: "/imgs/icons/ic_Location.svg", alt: "오시는길", label: "오시는길" },
  { id: "newBtn", src: "/imgs/icons/ic_User.svg", alt: "새가족등록", label: "새가족등록" },
  { id: "dutyBtn", src: "/imgs/icons/ic_file.svg", alt: "사역등록", label: "사역등록" },
];

export default function QucickBtnSection() {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };

  return (
    <section
      className={style.section}
      style={{
        backgroundImage: 'linear-gradient(rgba(56, 49, 49, 0.43)), url("/imgs/home/quick-btn-bg.png")',
      }}
    >
      <div className={style["btn-wrap"]}>
        {btnList.map((b, i) => (
          <QucickBtn id={b.id} key={i} label={b.label} src={b.src} alt={b.alt} onClick={onClick} />
        ))}
      </div>
    </section>
  );
}
