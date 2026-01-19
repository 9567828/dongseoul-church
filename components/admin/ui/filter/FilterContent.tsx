import Button from "../button/Button";
import style from "./filter.module.scss";

export default function FilterContent({ children, onConfirm }: { onConfirm: () => void; children: React.ReactNode }) {
  return (
    <div className={style.content}>
      {children}
      <Button type="button" variants="primary" visual="solid" btnName="완료" onClick={onConfirm} />
    </div>
  );
}
