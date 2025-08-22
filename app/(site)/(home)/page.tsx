import Hero from "../../../components/home/hero/Hero";
import About from "../../../components/home/about/About";
import QucickBtnSection from "../../../components/home/quickbtn/QuickBtnSection";
import Youtube from "../../../components/home/youtube/Youtube";
import Gallery from "../../../components/home/gallery/Gallery";
export default function Home() {
  return (
    <>
      <Hero url="/imgs/home/hero-bg.png" title="제목입니다" subTxt="설명문입니다" />
      <About />
      <QucickBtnSection />
      <Youtube />
      <Gallery />
    </>
  );
}
