import Title from "@/components/main/ui/ministry/title/Title";
import Visit, { IVisit } from "./(screen)/Visit";
import style from "./(screen)/visit.module.scss";

export const metadata = {
  title: "새가족등록",
};

const visitInfo: IVisit[] = [
  {
    number: "01",
    title: "새가족 등록",
    icon: "ic_apply.svg",
    content: "예배실에서 전도사님들이 전해드리는 등록 카드를 작성합니다",
    color: "#F8C99D",
    isDashed: false,
  },
  {
    number: "02",
    title: "환영인사",
    icon: "ic_party.svg",
    content: "새가족 환영시간에 목사님께서 소개하시고 모든 교우들이 큰 박수로 환영합니다",
    color: "#CA9D74",
  },
  {
    number: "03",
    title: "5주간 교육",
    icon: "ic_education.svg",
    content: "5주간 새가족 교육실에서 교육을 진행 합니다",
    color: "#9D744C",
  },
  {
    number: "04",
    title: "수료",
    icon: "ic_Academic-Cap.svg",
    content: "새가족 교육을 수료하면 교육 수료증과 소정의 선물을 드립니다",
    color: "#714D28",
  },
  { number: "05", title: "모임", icon: "ic_group.svg", content: "교육 수료후 교우들과 모임을 진행합니다", color: "#482902" },
];

export default function Page() {
  return (
    <div className="inner">
      <Title title="새가족 등록 안내" variant="nomal" />
      <div className={style.container}>
        {visitInfo.map((v) => (
          <Visit key={v.number} number={v.number} title={v.title} icon={v.icon} content={v.content} color={v.color} />
        ))}
      </div>
    </div>
  );
}
