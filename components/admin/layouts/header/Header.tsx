"use client";

import { useRef, useState } from "react";
import AvatarWrap from "../../ui/avatar-wrap/AvatarWrap";
import SearchInput from "../../ui/input-box/SearchInput";
import style from "./header.module.scss";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";
import Link from "next/link";
import { RoleWithMember } from "@/utils/supabase/sql";
import ProfileModal from "../../ui/modal/ProfileModal";
import { useHooks } from "@/hooks/useHooks";

export default function Header({ user }: { user: RoleWithMember }) {
  const { useRoute, useOnClickOutSide } = useHooks();
  const [alret, setAlert] = useState(false);
  const { isClose, toggleSideBar } = useSideBarStateStore();
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState("");
  // const { data } = useQuery({ queryKey: ["member", "own"], queryFn: () => useSelectLogginUser() });
  const modalRef = useRef<HTMLDivElement | null>(null);
  // useOnClickOutSide(modalRef, () => setOpenModal((prev) => !prev));

  const onClickProfile = () => {
    setOpenModal(false);
    useRoute("/admin/profile");
  };

  return (
    <>
      <header className={`${style.header} ${isClose ? style.close : ""}`.trim()}>
        <nav>
          <div className={style["menu-wrap"]}>
            <button onClick={toggleSideBar}>
              <img src="/imgs/admin/icons/ic_menu.svg" alt="메뉴버튼" />
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (value.trim() === "") {
                  return;
                }
                useRoute(`/admin/search?keyword=${value}`);
              }}
            >
              <SearchInput
                id="headerSearch"
                variants="header"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </form>
          </div>
          <div className={style["menu-wrap"]}>
            <Link href={"/"} title="홈으로 이동">
              <img src="/imgs/admin/icons/ic_home.svg" alt="홈으로이동" />
            </Link>
            <button type="button">
              {!alret ? (
                <img src="/imgs/admin/icons/ic_alert=off.svg" alt="알림아이콘" />
              ) : (
                <img src="/imgs/admin/icons/ic_alert=on.svg" alt="알림아이콘" />
              )}
            </button>
            <button type="button" onClick={() => setOpenModal((prev) => !prev)}>
              <AvatarWrap size="sm" src={user.avatar_url || null} />
            </button>
          </div>
        </nav>
      </header>
      {openModal && (
        <ProfileModal
          modalRef={modalRef}
          name={user.name}
          email={user.email}
          avatar={user.avatar_url!}
          onClick={onClickProfile}
        />
      )}
    </>
  );
}
