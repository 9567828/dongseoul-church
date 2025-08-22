"use client";
import style from "../../styles/components/screens/home/hero.module.scss";

interface IHero {
  url: string;
  title: string;
  subTxt: string;
}

export default function Hero({ url, title, subTxt }: IHero) {
  return (
    <section className={style.section} style={{ backgroundImage: `url("${url}")` }}>
      <div className={style.titWrap}>
        <p>{title}</p>
        <p>{subTxt}</p>
      </div>
    </section>
  );
}
