"use client";

import Link from "next/link";
import style from "./page.module.scss";
import { useState } from "react";

export default function Page() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <h1>로그인</h1>
      <ul className={style.ul}>
        <li className={style.li} onClick={() => setActive(true)} onMouseLeave={() => setActive(false)}>
          <Link href="">하이</Link>
          <span className={style.span}>
            {active && (
              <span className={`${active ? style.visible : style.leave}`.trim()}>
                <span className={style.child}></span>
              </span>
            )}
          </span>
        </li>
        <li className={style.li}>
          <Link href="">헬로</Link>
        </li>
      </ul>
    </div>
  );
}
