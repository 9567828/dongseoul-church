import style from "@/styles/ui/not-found.module.scss";
import Link from "next/link";

export const metadata = {
  title: "error",
};

export default function NotFound() {
  return (
    <div className={style["err-wrap"]}>
      <div className={style["txt-wrap"]}>
        <h1>404 ERROR</h1>
        <p>원하시는 페이지를 찾을 수 없습니다</p>
      </div>
      <Link href={"/"} className={style.btn}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
