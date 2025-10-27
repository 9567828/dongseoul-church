import style from "./member.module.scss";

const memList = [
  {
    title: "리더",
    group: [
      {
        deal: "",
        member: [
          { name: "유영민", src: "" },
          { name: "홍성일", src: "" },
        ],
      },
    ],
  },
  {
    title: "밴드",
    group: [
      {
        deal: "keyboard",
        member: [
          { name: "김연진", src: "" },
          { name: "백지현", src: "" },
        ],
      },
      { deal: "Drum", member: [{ name: "홍승우", src: "" }] },
      { deal: "E.G", member: [{ name: "최종근", src: "" }] },
      { deal: "Bass", member: [{ name: "김범수", src: "" }] },
    ],
  },
  {
    title: "보컬",
    group: [
      {
        deal: "",
        member: [
          { name: "김현수", src: "" },
          { name: "강향승", src: "" },
          { name: "배경빈", src: "" },
          { name: "신소향", src: "" },
        ],
      },
    ],
  },
  {
    title: "엔지니어",
    group: [
      {
        deal: "",
        member: [
          { name: "주승호", src: "" },
          { name: "조현우", src: "" },
        ],
      },
    ],
  },
];

export default function MemberList() {
  return (
    <section className={style.section}>
      <div className={style["text-wrap"]}>
        <h1>찬양단 안내</h1>
        <p>매주일예베 은혜홀</p>
      </div>
      <div className={style.table}>
        {memList.map((t, i) => (
          <div key={i} className={style["table-row"]}>
            <div className={style["table-head"]}>
              <p className="bodyMd-b">{t.title}</p>
            </div>
            <div className={style["table-content"]}>
              {t.group.map((g, idx) => {
                const deal = g.deal;
                const name = g.member.map((m) => m.name).join(", ");
                return (
                  <p key={idx} className={deal !== "" ? style.band : ""}>
                    {deal !== "" ? `${deal}-${name}` : name}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
