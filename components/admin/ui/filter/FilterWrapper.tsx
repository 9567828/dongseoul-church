import React from "react";
import ModalHead from "../modal/layout/ModalHead";
import style from "./filter.module.scss";

export default function FilterWrapper({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className={style.dim}>
      <div className={style.container}>
        <ModalHead fontType="admin-bodySm-b" title="Filter" variant="wide" onClose={onClose} />
        <div className={style["content-container"]}>{children}</div>
      </div>
    </div>
  );
}
