"use client";

import { MouseEvent } from "react";
import style from "../../styles/components/screens/home/about.module.scss";
import PrimaryBtn from "../ui/PrimaryBtn";

export default function About() {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };
  return (
    <section className={style.section}>
      <div className={style.left}>
        <img src="/imgs/home/church-bg.png" alt="교회사진" />
      </div>
      <div className={style.right}>
        <div className="top">
          <p className={style.label}>about us</p>
          <div className={style.txtWrap}>
            <p className={style.title}>A church that loves God and people</p>
            <p className={style.subTxt}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu tempor incididunt ut labore et dolore magna
              aliquaLorem ipsum dolor sit amet, consectetur adipiscing
            </p>
          </div>
        </div>
        <PrimaryBtn label="더보기" classNameKey={"more"} onClick={onClick} />
      </div>
    </section>
  );
}
