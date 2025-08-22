"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuList = [
  {
    menu: "교회소개",
    href: "",
    subMenu: [
      { submenu: "담임목사인사", href: "" },
      { submenu: "교회연혁", href: "" },
      { submenu: "오시는길", href: "" },
    ],
  },
  {
    menu: "예배안내",
    href: "",
    subMenu: [
      { submenu: "주보", href: "/bulletin" },
      { submenu: "예배당안내", href: "/room" },
    ],
  },
  { menu: "교회사진", href: "", subMenu: [] },
  { menu: "사역안내", href: "", subMenu: [] },
  { menu: "새가족등록", href: "", subMenu: [] },
];

export default function Header() {
  const path = usePathname();

  return (
    <header>
      <nav>
        <h1>
          <Link href={"/"}>로고</Link>
        </h1>
        <ul className="main-menu-list">
          {menuList.map((m, i) => (
            <li key={i} className="main-menu">
              <Link href={m.href} className={path === m.href ? "active" : ""}>
                {m.menu}
              </Link>
              {m.subMenu.length > 0 ? (
                <ul className="sub-menu">
                  {m.subMenu.map((s, i) => (
                    <li key={i}>
                      <Link href={s.href}>{s.submenu}</Link>
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
