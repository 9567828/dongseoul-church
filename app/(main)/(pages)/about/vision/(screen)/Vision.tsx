import style from "./vision.module.scss";

const visionList = [
  { id: 1, title: "Praise the Lord", text: `은혜와 감격이 있는\n공동체`, color: "#482902" },
  { id: 2, title: "Preach the Gespel", text: "복음을 담대히 전하는 증거 공동체", color: "#CA8029" },
  { id: 3, title: "Prepare the Next Generation", text: "다음세대를 준비하는 양육 공동체", color: "#CA9D74" },
  { id: 4, title: "Provide a Shelter", text: `가정을 건강하게\n 세우는 회복 공동체`, color: "#D17D09" },
  { id: 5, title: "Present for Neighbor", text: "지역과 이웃에 선물이 되는 공동체", color: "#9D744C" },
];

interface IVision {
  start?: number;
  end?: number;
  addClass?: "top";
}

export default function Vision({ start, end, addClass }: IVision) {
  return (
    <div className={`${style["vision-wrap"]} ${addClass ? style[addClass] : ""}`.trim()}>
      {visionList.slice(start, end).map((v) => (
        <div key={v.id} className={style.polygon}>
          <div className={style["small-polygon"]}>
            <svg width="96" height="82" viewBox="0 0 96 82" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M95.1494 40.9099L71.5736 81.535L24.4219 81.535L0.846014 40.9099L24.4219 0.28473L71.5736 0.284732L95.1494 40.9099Z"
                fill={v.color}
              />
            </svg>
            <p className={style.number}>{`0${v.id}`}</p>
          </div>
          <div className={style["txt-wrap"]}>
            <h1>{v.title}</h1>
            <p>{v.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
