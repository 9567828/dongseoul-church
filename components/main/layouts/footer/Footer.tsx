import Link from "next/link";
import style from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style["footer-left"]}>
        <h1>
          <img src="/imgs/logo-white.png" alt="로고" />
        </h1>
        <div className={style.meta}>
          <p>©2025 dongseoul-Church. All Rights reserved.</p>
          <Link href={"/auth/login"} className={style["footer-link"]}>
            <img src="/imgs/icons/ic_Link.svg" alt="페이지이동" />
            Site Management
          </Link>
        </div>
      </div>
      <ul className={style["footer-right"]}>
        <li>
          <Link href="">이용약관</Link>
        </li>
        <li>
          <Link href="">개인정보처리방침</Link>
        </li>
        <li>
          <Link href="">이용안내</Link>
        </li>
      </ul>
    </footer>
  );
}
