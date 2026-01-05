import React from "react";
import style from "./login.module.scss";

interface IAuthProps {
  open?: boolean;
  divRef?: React.RefObject<HTMLDivElement | null>;
  isMob?: boolean;
  children: React.ReactNode;
  variant: "login" | "";
}

export default function AuthWrapper({ divRef, variant, open, isMob, children }: IAuthProps) {
  return (
    <div ref={divRef} className={`${style.wrapper} ${style[variant]} ${open ? style.open : ""}`.trim()}>
      <div className={style.head}>
        <h1>{!isMob ? "관리자페이지" : "로그인"}</h1>
        {!isMob && <p>어서오세요🙌 관리자페이지 입니다</p>}
      </div>
      {children}
      <div className={`bodyMd-r ${style["info-wrap"]}`}>
        <h4>account info</h4>
        <p>계정을 분실한 경우 관리자에게 문의하세요</p>
      </div>
    </div>
  );
}
