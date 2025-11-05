"use client";

import { headerMenuList } from "@/utils/menuList";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <header>
      <nav>
        <Link href={"/"} className="logo-wrap">
          <h1>
            <img src="/imgs/logo.png" alt="로고" />
          </h1>
        </Link>

        <ul className="main-menu-list">
          {headerMenuList.map((m, i) => (
            <li key={i} className="main-menu">
              <Link href={m.href} className={path.startsWith(m.href) ? "active" : ""}>
                {m.menu}
              </Link>
              {m.subMenu ? (
                <ul className="sub-menu">
                  {m.subMenu.map((s, i) => (
                    <li key={i}>
                      <Link href={`${m.href}/${s.href}`}>{s.submenu}</Link>
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
