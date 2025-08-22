import PageTitle from "@/components/layouts/pageTitle/PageTitle";
import Board from "../../../../../components/layouts/board/Board";
import style from "./page.module.scss";

export default function Page() {
  return (
    <div>
      <PageTitle title="주보" />
      <div className={style.section}>
        <Board />
      </div>
    </div>
  );
}
