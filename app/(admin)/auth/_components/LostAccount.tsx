import style from "./login.module.scss";

export default function LostAccount() {
  return (
    <div className={`bodyMd-r ${style["info-wrap"]}`}>
      <h4>account info</h4>
      <p>계정을 분실한 경우 관리자에게 문의하세요</p>
    </div>
  );
}
