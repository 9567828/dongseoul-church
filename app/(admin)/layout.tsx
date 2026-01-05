import "@/styles/admin/global.scss";
import localFont from "next/font/local";

export const metadata = {
  title: "관리자페이지",
};

const adminMinSans = localFont({
  src: "./(font)/MinSansVF.woff2",
  weight: "100 900",
  style: "normal",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={adminMinSans.className}>{children}</div>;
}
