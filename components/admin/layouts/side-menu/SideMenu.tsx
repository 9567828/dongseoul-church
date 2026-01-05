"use client";

import Link from "next/link";
import style from "./side-menu.module.scss";
import { usePathname } from "next/navigation";
import { useSideMenuSubOpenStore } from "@/hooks/store/useSideMenuSubOpenStore";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import { adminMenuList } from "@/utils/menuList";
import { roleEum } from "@/utils/supabase/sql";

const defaultImgSrc = "/imgs/admin/icons/menus/";

export default function SideMenu({ role }: { role: roleEum }) {
  // export default function SideMenu() {
  const path = usePathname();
  const { isSubOpen, toggleSideMenu } = useSideMenuSubOpenStore();
  const { _hasHydrated, isClose } = useSideBarStateStore();
  // const { data, isLoading } = useQuery({ queryKey: ["member", "own"], queryFn: () => useSelectLogginUser() });

  const sliceList = adminMenuList.filter((v) => !v.menu.startsWith("신도"));
  const roleAllow = role === "super" ? adminMenuList : sliceList;
  // const roleAllow = adminMenuList;

  // if (!_hasHydrated) return null;

  return (
    <>
      <div style={{ width: `${isClose ? "60px" : "250px"}` }}></div>
      <aside className={`${style.aside} ${isClose ? style["side-close"] : ""}`.trim()}>
        <nav>
          <div className={style.head}>
            <h1>
              <img src="/imgs/admin/cms_logo.svg" alt="관리자페이지로고" />
            </h1>
            {!isClose && (
              <div className={style.title}>
                <p>관리자페이지</p>
                <p>Admin Dashboard</p>
              </div>
            )}
          </div>

          <ul className={style["menu-wrap"]}>
            {roleAllow.map((m, i) => {
              const isSub = m.sub.length > 0;

              return (
                <li key={i}>
                  <Link
                    href={m.href}
                    onClick={isSub && !isClose ? () => toggleSideMenu() : undefined}
                    className={`${style["main-menu"]} ${path.startsWith(m.rootHref) ? style.active : ""}`.trim()}
                  >
                    <div>
                      <img
                        src={`${defaultImgSrc}${
                          path === m.href || (isClose && path.startsWith(m.rootHref)) ? m.mainIocn : m.darkIcon
                        }`}
                        alt=""
                      />
                      {!isClose && <span>{m.menu}</span>}
                    </div>
                    {isSub && !isClose ? (
                      <img src={`${defaultImgSrc}ic_chevron-${isSubOpen ? "up" : "down"}.svg`} alt="메뉴열림/닫힘" />
                    ) : null}
                  </Link>

                  {isSub && (isSubOpen || isClose) ? (
                    <ul className={`${style["sub-wrap"]} ${isClose ? style["menu-hover"] : ""}`}>
                      {m.sub.map((s, idx) => (
                        <li key={idx}>
                          <Link
                            href={`${m.rootHref}${s.href}`}
                            className={`${style["sub-menu"]} ${
                              path.startsWith(`${m.rootHref!}${s.href}`) ? style.active : ""
                            }`.trim()}
                          >
                            {s.submenu}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
