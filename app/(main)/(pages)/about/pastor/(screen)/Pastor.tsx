import style from "./pastor.module.scss";

export default function Pastor() {
  return (
    <div className={`inner ${style.wrapper}`}>
      <div className={style["txt-wrap"]}>
        <h1 className="title2Xl-b" style={{ marginBottom: "10px" }}>
          홈페이지를 찾아주셔서 반갑고 감사합니다.
        </h1>
        <p className="bodyMd-m">
          동서울교회의 꿈은 ‘예수를 닮아가는 믿음 공동체’로 나아가는 것입니다.
          <br />
          서로를 있는 그대로 환대하고 예수님의 사랑으로 하나되는 공동체가 되길 소망합니다. 함께 울고 웃고, 삶을 나누며 살아가는
          사람 냄새나는 따뜻한 공동체가 되길 기대합니다. 지금 어떤 삶의 여정을 걷고 계시든지 이 공간에서 편안한 쉼과 회복을 얻고
          <br />
          새로운 소망과 복된 만남을 시작하실 수 있길 바랍니다.
          <br /> 예수님의 평안과 사랑이 여러분의 삶에 가득하기를 바랍니다.
          <br /> 언제든지 편하게 찾아오셔서 차 한 잔의 따뜻함처럼 여러분을 환영합니다.
        </p>
        <div>
          <p className={style.name}>
            <span className="bodyLg-r">담임목사</span>윤다니엘
          </p>
        </div>
      </div>
      <div className={style["img-wrap"]}>
        <img src="/imgs/about/pastor.png" alt="동서울교회 윤다니엘목사님" />
      </div>
    </div>
  );
}
