"use client";

import Loading from "@/app/Loading";
import Header from "@/components/admin/layouts/header/Header";
import SideMenu from "@/components/admin/layouts/side-menu/SideMenu";
import { useSideBarStateStore } from "@/hooks/store/useSideBarStateStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { _hasHydrated } = useSideBarStateStore();

  if (!_hasHydrated) return <Loading />;

  return (
    <div className="admin-grid">
      <SideMenu />
      <div className="admin-column">
        <Header />
        <main className="inner">{children}</main>
      </div>
    </div>
  );
}
