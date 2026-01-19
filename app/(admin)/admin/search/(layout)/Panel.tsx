import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import style from "@/app/(admin)/admin/search/(layout)/search.module.scss";
import Link from "next/link";

interface IPanelProps {
  mode: "general" | "detail";
  title: string;
  url: string;
  children: React.ReactNode;
}

export default function PanelLayout({ mode, title, url, children }: IPanelProps) {
  return (
    <WhitePanel variants="detail">
      <div className={style.title}>
        <h1 className="admin-titleLg-b">{title}</h1>
        <Link href={url} className={style["more-btn"]}>
          {mode === "general" ? "더보기 >" : "통합 검색결과 보기 >"}
        </Link>
      </div>
      {children}
    </WhitePanel>
  );
}
