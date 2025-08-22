"use client";
import style from "./youtube.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MouseEvent, useState } from "react";

const imgList = [
  { src: "/imgs/home/image 65.png", alt: "유튜브" },
  { src: "/imgs/home/image 66.png", alt: "유튜브" },
  { src: "/imgs/home/image 66.png", alt: "유튜브" },
];

export default function Youtube() {
  const [activeIndex, setActiveIndex] = useState(1);

  const onClick = (n: number) => {
    setActiveIndex(n);
  };
  return (
    <section id="youtubeSection" className={style.section}>
      <div className={style["tit-wrap"]}>
        <p>제목입니다</p>
        <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
      </div>
      <div className={style["slide-wrap"]}>
        {imgList.map((img, i) => (
          <div key={i} className={`${style.imgWrap}`.trim()}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}

        {/* <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          loopAdditionalSlides={10}
          // loop={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/imgs/home/image 65.png" alt="유투브" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/imgs/home/image 66.png" alt="유트브" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/imgs/home/image 66.png" alt="유트브" />
          </SwiperSlide>
        </Swiper> */}
      </div>
    </section>
  );
}
