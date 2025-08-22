import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <h1>로고이미지</h1>
        <div className="meta">
          <p>©2025 dongseoul-Church. All Rights reserved.</p>
          <p>
            design By <span>double U studio</span>
          </p>
        </div>
      </div>
      <ul className="footer-right">
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
