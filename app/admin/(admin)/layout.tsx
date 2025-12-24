"use client";

import Loading from "@/app/Loading";
import Header from "@/components/admin/layouts/header/Header";
import SideMenu from "@/components/admin/layouts/side-menu/SideMenu";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { _hasHydrated, isClose } = useSideBarStateStore();

  if (!_hasHydrated) return <Loading />;

  return (
    <div className="admin-grid">
      <div style={{ width: `${isClose ? "60px" : "250px"}` }}></div>
      <SideMenu />
      <div>
        <Header />
        <>{children}</>
      </div>
    </div>
  );
}
