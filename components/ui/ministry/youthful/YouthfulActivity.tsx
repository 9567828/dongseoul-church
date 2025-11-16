import Title from "../title/Title";
import style from "./youthful.module.scss";

const iconBaseURL = "/imgs/icons/youthful/";

const activeList = [
  {
    src: `${iconBaseURL}ic_crown.svg`,
    title: "리더십트레이닝",
    sub: "리더십 훈련으로 청년부의 모든 행사를 이끌어 가며 청년들에게 본을 보이는 리더십",
  },
  {
    src: `${iconBaseURL}ic_winter.svg`,
    title: "동계수련회",
    sub: "한 해 주신 말씀으로 갖는 동계 수련회",
  },
  {
    src: `${iconBaseURL}ic_group.svg`,
    title: "소그룹모임",
    sub: "청년들이 함께 그룹별로 모여 나누는 믿음의 모임",
  },
  {
    src: `${iconBaseURL}ic_sun.svg`,
    title: "하계수련회",
    sub: "청년들의 신앙과 삶을 위해 갖는 뜨거운 수련회",
  },
  {
    src: `${iconBaseURL}ic_party.svg`,
    title: "새가족초청잔치",
    sub: "그리스도의 복음을 전하는 사명을 행하는 사역",
  },
  {
    src: `${iconBaseURL}ic_outside.svg`,
    title: "아웃팅",
    sub: "그리스도 안에서 나누는 즐거운 교제",
  },
  {
    src: `${iconBaseURL}ic_conversation.svg`,
    title: "말씀컨퍼런스",
    sub: "말씀과 신앙, 그리고 실제 삶의 주제를 깊이 배우는 시간",
  },
  {
    src: `${iconBaseURL}ic_volunteer.svg`,
    title: "지역봉사",
    sub: "그리스도의 사랑을 지역사회에 전하며 믿음을 실천하는 사역",
  },
];

export default function YouthfulActivity() {
  return (
    <section className={style.section}>
      <div className={style.inner}>
        <div className={style.txt}>
          <h5>YOUTHFUL Active</h5>
          <Title
            variant="left"
            title="유스풀 청년부 주요사역"
            content={`예수님의 사랑으로 하나 되어\n함께 배우고 섬기며 세상을 변화시키는 청년 공동체입니다.`}
          />
        </div>
        <div className={style["active-list"]}>
          {activeList.map((a, i) => (
            <div key={i} className={style.active}>
              <div className={style.icon}>
                <img src={a.src} alt="아이콘" />
              </div>
              <div className={style["active-info"]}>
                <h5>{a.title}</h5>
                <p>{a.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
