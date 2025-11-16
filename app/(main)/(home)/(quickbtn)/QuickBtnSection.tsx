"use client";

import style from "./quickbtn.module.scss";
import QucickBtn from "./QuickBtn";
import { useHooks } from "@/hooks/useHooks";

const btnList = [
  { id: "locationBtn", src: "/imgs/icons/ic_Location.svg", alt: "오시는길", label: "오시는길", route: "/about/location" },
  { id: "newBtn", src: "/imgs/icons/ic_User.svg", alt: "새가족등록", label: "새가족등록", route: "/visit" },
  { id: "dutyBtn", src: "/imgs/icons/ic_file.svg", alt: "사역등록", label: "사역등록", route: "/ministry/resgister" },
];

export default function QucickBtnSection() {
  const { useRoute } = useHooks();

  return (
    <section
      className={style.section}
      style={{
        backgroundImage: 'linear-gradient(rgba(56, 49, 49, 0.43)), url("/imgs/home/quick-btn-bg.png")',
      }}
    >
      <div className={style["btn-wrap"]}>
        {btnList.map((b, i) => (
          <QucickBtn id={b.id} key={i} label={b.label} src={b.src} alt={b.alt} onClick={() => useRoute(`${b.route}`)} />
        ))}
      </div>
    </section>
  );
}
