import style from "./login.module.scss";

interface IAuthLayout {
  open?: boolean;
  children: React.ReactNode;
}

export default function AuthLayout({ open, children }: IAuthLayout) {
  return (
    <div className={style.body}>
      <div className={`${style.container} ${open ? style.open : ""}`.trim()}>{children}</div>
    </div>
  );
}
