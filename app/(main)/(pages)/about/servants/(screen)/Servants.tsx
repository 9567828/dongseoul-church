import style from "./servants.module.scss";

interface IServant {
  variant?: "pastor" | "sub-pastor" | "nomal";
  start?: number;
  end?: number;
}

const list = [
  { name: "김도담", title: "담임목사", deal: "목사", email: "", src: "/imgs/about/pastor.png" },
  { name: "김도현", title: "부목사", deal: "목사", email: "", src: "/imgs/about/servants/kimdohyun.png" },
  { name: "박진우", title: "부목사", deal: "목사", email: "", src: "/imgs/about/servants/parkjinyoo.png" },
  {
    name: "최예은",
    title: "교육전도사",
    deal: "전도사",
    email: "yeunchoi@church.org",
    src: "/imgs/about/servants/choiyeeun.png",
  },
  {
    name: "윤성호",
    title: "청년부담당",
    deal: "전도사",
    email: "sunghoyoon@church.org",
    src: "/imgs/about/servants/yoonsungho.png",
  },
  {
    name: "김하늘",
    title: "아동부담당",
    deal: "전도사",
    email: "haneulkim@church.org",
    src: "/imgs/about/servants/kimsky.png",
  },
  {
    name: "박소정",
    title: "중등부담당",
    deal: "전도사",
    email: "sojungpark@church.org",
    src: "/imgs/about/servants/parksojung.png",
  },
  {
    name: "이재현",
    title: "고등부담당",
    deal: "전도사",
    email: "jaehyunlee@church.org",
    src: "/imgs/about/servants/leejaehyun.png",
  },
  {
    name: "정수빈",
    title: "미디어사역",
    deal: "간사",
    email: "jaehyunlee@church.org",
    src: "/imgs/about/servants/jungsubin.png",
  },
  {
    name: "오유리",
    title: "행정사역",
    deal: "간사",
    email: "yurioh@church.org",
    src: "/imgs/about/servants/oyuri.png",
  },
  {
    name: "조민재",
    title: "새가족부",
    deal: "부장",
    email: "minjaecho@church.org",
    src: "/imgs/about/servants/jominjae.png",
  },
  {
    name: "정다은",
    title: "예배지원",
    deal: "간사",
    email: "daeunjung@church.org",
    src: "/imgs/about/servants/jungdaeun.png",
  },
];

export default function Servants({ variant = "nomal", start, end }: IServant) {
  return (
    <>
      {list.slice(start, end).map((v, i) => (
        <div key={i} className={`${style["content-box"]} ${style[variant]}`}>
          <div className={`${style["img-wrap"]} ${style[variant]}`}>
            <img src={v.src} alt="섬기는이" />
          </div>
          <div className={`${style["txt-wrap"]} ${style[variant]}`}>
            <p className={style.title}>{v.title}</p>
            <p className={style.name}>
              {v.name}
              <span>{v.deal}</span>
            </p>
            {variant === "nomal" ? <p>{v.email}</p> : null}
          </div>
        </div>
      ))}
    </>
  );
}
