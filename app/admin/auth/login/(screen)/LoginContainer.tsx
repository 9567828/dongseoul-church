"use client";

import InputBox from "@/components/admin/ui/input-box/InputBox";
import style from "./login.module.scss";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import Button from "@/components/admin/ui/button/Button";
import { useHooks } from "@/hooks/useHooks";
import { FormEvent, useEffect, useRef, useState } from "react";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import { signIn } from "@/utils/supabase/sql/auth";
import { request } from "@/lib/api";

export default function LoginContainer() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { useResize, useOnClickOutSide, useRoute } = useHooks();
  const wrapRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(wrapRef, () => setOpen(false));

  const width = useResize();
  const isMob = width !== null && width <= 450;

  const hanleOnChange = (e: string, onChange: (e: string) => void) => {
    onChange(e);
    if (err) setErr("");
  };

  useEffect(() => {
    if (!isMob) {
      setOpen(false);
    }
  }, [width]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setErr("아이디 또는 비밀번호를 입력하세요");
      return;
    }

    const req = await request({ method: "POST", url: "/auth/login", data: { email, password } });
    const { result } = await req;

    if (result) {
      useRoute("/admin/users");
    } else {
      console.log("로그인 실패");
    }

    setErr("");
  };

  return (
    <div className={`${style.container} ${open ? style.open : ""}`.trim()}>
      {isMob ? (
        <div className={`${style["mob-wrap"]} ${open ? style.open : ""}`.trim()}>
          <div className={style.head}>
            <h1>관리자페이지</h1>
            <p>어서오세요🙌 관리자페이지 입니다</p>
          </div>
          {!open && <Button variants="trans" visual="none" btnName="로그인" onClick={() => setOpen(true)} />}
        </div>
      ) : null}
      <div ref={wrapRef} className={`${style.wrapper} ${open ? style.open : ""}`.trim()}>
        <div className={style.head}>
          <h1>{!isMob ? "관리자페이지" : "로그인"}</h1>
          {!isMob && <p>어서오세요🙌 관리자페이지 입니다</p>}
        </div>
        <form className={style.form} onSubmit={onSubmit}>
          <div className={style["form-wrap"]}>
            <InputBox
              id="id"
              variants="login"
              type="text"
              placeholder="이메일 아이디를 입력하세요"
              value={email}
              error={err !== ""}
              onChange={(e) => hanleOnChange(e.target.value, setEmail)}
            />
            <div>
              <InputBox
                id="password"
                variants="login"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                error={err !== ""}
                onChange={(e) => hanleOnChange(e.target.value, setPassword)}
              />
              {err !== "" && <InfoMessage mode="error" msg={err} />}
            </div>
            {/* <div className={style["login-set"]}>
              <CheckBox id="autoLogin" variants="login">
                <label htmlFor="autoLogin" className={style.label}>
                  자동로그인
                </label>
              </CheckBox>
            </div> */}
            <button type="button" className={style["set-password"]}>
              비밀번호 재설정
            </button>
            <Button type="submit" btnName="로그인" variants="login" visual="none" />
          </div>
        </form>
        <div className={`bodyMd-r ${style["info-wrap"]}`}>
          <h4>account info</h4>
          <p>계정을 분실한 경우 관리자에게 문의하세요</p>
        </div>
      </div>
    </div>
  );
}
