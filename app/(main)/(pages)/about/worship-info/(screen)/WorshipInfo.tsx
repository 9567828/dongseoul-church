import style from "./worship.module.scss";

const infoList = [
  { title: "주일 오전 예배", time: "주일 오전 11시", location: "은혜홀" },
  { title: "주일 오후 예배", time: "주일 오후 02시", location: "은혜홀" },
  { title: "새벽 기도회", time: "월-금 오전 05시 30분", location: "믿음홀" },
  { title: "금요 기도회", time: "금요일 오후 08시 30분", location: "믿음홀" },
  { title: "수요 예배", time: "수요일 오후 07시 30분", location: "믿음홀" },
  { title: "파워키즈", time: "주일 오전 11시", location: "드림홀" },
  { title: "파워틴즈", time: "오전 09시 40분", location: "믿음홀" },
  { title: "유스풀 청년부", time: "주일 오후 01시", location: "믿음홀" },
];

export default function WorshipInfo() {
  return (
    <div className="inner">
      <div className={style.table}>
        <ul className={style["table-head"]}>
          <li>예배명</li>
          <li>시간</li>
          <li>장소</li>
        </ul>
        <div className={style["content-wrap"]}>
          {infoList.map((v, i) => (
            <ul key={i} className={style["table-content"]}>
              <li>{v.title}</li>
              <li>{`${v.time}`}</li>
              <li>{v.location}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
