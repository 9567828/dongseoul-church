import MiddleImg from "@/components/ui/ministry/middle-img/MiddleImg";
import Title from "@/components/ui/ministry/title/Title";
import MemberList from "./(member-list)/MemberList";

export const metadata = {
  title: "셀라찬양단",
};

export default function Page() {
  return (
    <>
      <Title
        variant="center"
        title="셀라찬양단"
        content={`셀라찬양단은 언제나 하나님만을 예배하는 팀으로 서 있습니다.\n음악적 기호로 주로 표현되는 ‘셀라’는 ‘영원히’ ‘다함께’ 라는 의미도 담고 있습니다.\n셀라찬양단은 동서울교회 성도들과 함께 언제나 주님만을 예배하는 예배공동체로써 나아갑니다.`}
      />
      <MiddleImg url="/imgs/ministry/parise/praise.png" isText={true} text="'영원히' 하나님만을 '다함께' 예배하는" />
      <MemberList />
    </>
  );
}
