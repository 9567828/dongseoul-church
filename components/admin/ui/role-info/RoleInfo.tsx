import style from "./role-info.module.scss";

export default function RoleInfo() {
  return (
    <div className={style["info-wrap"]}>
      <div className={style["info-head"]}>
        <img src="/imgs/admin/icons/ic_tool-tip.svg" alt="tool-tip" />
        <p>role</p>
      </div>
      <div className={style["info-text"]}>
        <p>super - 모든 권한 부여</p>
        <p>admin - 게시글 관리만 가능</p>
        <p>nomal - 관리자 접근 불가</p>
      </div>
    </div>
  );
}
