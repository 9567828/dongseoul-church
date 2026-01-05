import { ITab } from "@/components/admin/ui/board/BoardTab";

export const headerMenuList = [
  {
    menu: "교회소개",
    href: "/about",
    subMenu: [
      { submenu: "담임목사 인사", href: "/pastor" },
      { submenu: "5대 비전", href: "/vision" },
      { submenu: "예배안내", href: "/worship-info" },
      { submenu: "섬기는이", href: "/servants" },
      { submenu: "오시는길", href: "/location" },
    ],
  },
  { menu: "예배", href: "/worship", subMenu: [{ submenu: "말씀영상", href: "/sermon" }] },
  { menu: "커뮤니티", href: "/community", subMenu: [{ submenu: "교회사진", href: "/album" }] },
  {
    menu: "사역안내",
    href: "/ministry",
    subMenu: [
      { submenu: "파워키즈", href: "/power-kids" },
      { submenu: "파워틴즈", href: "/power-teens" },
      { submenu: "유스풀 청년부", href: "/youthful" },
      { submenu: "셀라찬양단", href: "/praise" },
      { submenu: "사역신청", href: "/resgister" },
    ],
  },
  { menu: "새가족등록", href: "/visit" },
];

export const adminMenuList = [
  {
    menu: "신도관리",
    href: "/admin/users",
    rootHref: "/admin/users",
    whiteIcon: "ic_Users-white.svg",
    darkIcon: "ic_Users-dark.svg",
    mainIocn: "ic_Users-main.svg",
    sub: [],
  },
  {
    menu: "게시물관리",
    href: "",
    rootHref: "/admin/boards",
    whiteIcon: "ic_Document-white.svg",
    darkIcon: "ic_Document-dark.svg",
    mainIocn: "ic_Document-main.svg",
    sub: [
      { submenu: "앨범목록", href: "/albums" },
      { submenu: "유튜브목록", href: "/youtube" },
    ],
  },
];

export const boardTapList: ITab[] = [
  { id: "all", name: "전체" },
  { id: "active", name: "노출" },
  { id: "inActive", name: "비노출" },
];

export const userTapList: ITab[] = [
  { id: "all", name: "전체" },
  { id: "active", name: "관리자" },
  { id: "inActive", name: "일반신도" },
];
