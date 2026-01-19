import style from "./filter.module.scss";

export default function FilterHead({ title }: { title: string }) {
  return (
    <div className={style.title}>
      <p>{title}</p>
    </div>
  );
}
