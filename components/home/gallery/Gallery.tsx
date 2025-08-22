import style from "./gallery.module.scss";

const imgList = [
  { src: "imgs/home/image 64.png", alt: "사진" },
  { src: "imgs/home/image 70.png", alt: "사진" },
  { src: "imgs/home/image 71.png", alt: "사진" },
  { src: "imgs/home/image 73.png", alt: "사진" },
  { src: "imgs/home/image 76.png", alt: "사진" },
  { src: "imgs/home/image 76.png", alt: "사진" },
];

export default function Gallery() {
  return (
    <section className={style.section}>
      <div className={style["img-wrap"]}>
        <div className={`${style["item-box"]} ${style["txt-wrap"]}`}>
          <p>LATEST</p>
          <p>ALBUM</p>
        </div>
        {imgList.map((img, i) => (
          <div key={i} className={style["item-box"]}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
        <div className={`${style["item-box"]} ${style["txt-wrap"]} ${style.more}`}>
          <p>교회사진</p>
          <p>더보기</p>
        </div>
      </div>
    </section>
  );
}
