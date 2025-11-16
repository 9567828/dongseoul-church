import Title from "@/components/ui/ministry/title/Title";
import Visit from "./(screen)/Visit";
import style from "./(screen)/visit.module.scss";

export const metadata = {
  title: "새가족등록",
};

export default function Page() {
  return (
    <div className="inner">
      <Title title="새가족 등록 안내" variant="nomal" />
      <div className={style.container}>
        <Visit
          number="01"
          icon="ic_apply.svg"
          title="새가족 등록"
          content="예배실에서 전도사님들이 전해 드리는 등록 카드를 작성합니다"
          isDashed={false}
        />
        <Visit
          number="02"
          icon="ic_party.svg"
          title="환영인사"
          content="새가족 환영시간에 목사님께서 소개하시고 모든 교우들이 큰 박수로 환영합니다"
          color="#CA9D74"
        />
        <Visit
          number="03"
          icon="ic_education.svg"
          title="5주간 교육"
          content="5주간 새가족 교육실에서 교육을 진행 합니다"
          color="#9D744C"
        />
        <Visit
          number="04"
          icon="ic_Academic-Cap.svg"
          title="수료"
          content="새가족 교육을 수료하면 교육 수료증과 소정의 선물을 드립니다"
          color="#714D28"
        />
        <Visit number="05" icon="ic_group.svg" title="모임" content="교육 수료후 교우들과 모임을 진행합니다" color="#482902" />
      </div>
    </div>
  );
}
