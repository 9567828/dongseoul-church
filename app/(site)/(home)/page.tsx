import Hero from "../../../components/home/Hero";
import About from "../../../components/home/About";
import QucickBtnSection from "../../../components/home/QuickBtnSection";
import Youtube from "../../../components/home/Youtube";
import Gallery from "../../../components/home/Gallery";
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
