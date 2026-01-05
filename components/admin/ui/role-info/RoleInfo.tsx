import style from "./role-info.module.scss";

export default function RoleInfo({ variant }: { variant: "horizontal" | "vertical" }) {
  return (
    <div className={`${style["info-wrap"]} ${style[variant]}`.trim()}>
      <div className={style["info-head"]}>
        <img src="/imgs/admin/icons/ic_tool-tip.svg" alt="tool-tip" />
        <p>role</p>
      </div>
      <div className={style["info-text"]}>
        <p>super - 모든 권한 부여</p>
        <p>admin - 게시글 관리만 가능</p>
      </div>
    </div>
  );
}
