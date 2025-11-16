import style from "./title.module.scss";

interface ITitle {
  title: string;
  content?: string;
  isYouthful?: boolean;
  variant?: "power" | "center" | "left" | "nomal";
}

export default function Title({ title, content, isYouthful = false, variant = "power" }: ITitle) {
  return (
    <div className={`${style["txt-wrap"]} ${variant === "center" ? "inner" : ""} ${style[variant]}`}>
      <h3>{title}</h3>
      {content && <p>{content}</p>}
      {isYouthful && <p style={{ fontWeight: 700, marginTop: "10px" }}>예배안내: 매주일 오후 1시 장소: 1층 믿음홀</p>}
    </div>
  );
}
