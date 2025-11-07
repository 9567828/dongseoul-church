import Servants from "./(screen)/Servants";
import style from "./(page-ui)/servants.module.scss";

export const metadata = {
  title: "섬기는이",
};

export default function Page() {
  return (
    <div className={`inner ${style["container"]}`}>
      <Servants variant="pastor" start={0} end={1} />
      <div className={style["sub-wrap"]}>
        <Servants variant="sub-pastor" start={1} end={3} />
      </div>
      <div className={style["nomal-wrap"]}>
        <Servants variant="nomal" start={3} />
      </div>
    </div>
  );
}
