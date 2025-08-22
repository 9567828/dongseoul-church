import PageTitle from "@/components/layouts/PageTitle";
import Board from "../../../../../components/Board";
import style from "../../../../../styles/components/screens/bulletin/page.module.scss";

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
