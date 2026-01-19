"use client";

import style from "./header.module.scss";
import { headerMenuList } from "@/utils/menuList";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link href={"/"} className={style["logo-wrap"]}>
          <h1>
            <img src="/imgs/logo.png" alt="로고" />
          </h1>
        </Link>

        <ul className={style["main-menu-list"]}>
          {headerMenuList.map((m, i) => (
            <li key={i} className={style["main-menu"]}>
              <Link href={m.href} className={path.startsWith(m.href) ? style.active : ""}>
                {m.menu}
              </Link>
              {m.subMenu ? (
                <ul className={style["sub-menu"]}>
                  {m.subMenu.map((s, i) => (
                    <li key={i}>
                      <Link href={`${m.href}/${s.href}`} className={path.includes(s.href) ? style.active : ""}>
                        {s.submenu}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
