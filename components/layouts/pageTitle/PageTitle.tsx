import style from "./pagetitle.module.scss";

interface Ititle {
  title: string;
}

export default function PageTitle({ title }: Ititle) {
  return (
    <div className={style["bg-img"]}>
      <h1>{title}</h1>
    </div>
  );
}
