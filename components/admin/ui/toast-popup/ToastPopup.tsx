"use client";

import { useToastStore } from "@/hooks/store/useToastStore";
import style from "./toast.module.scss";

export default function ToastPopup() {
  const { toasts } = useToastStore();

  return (
    <div className={style.container}>
      {toasts.map((t) => {
        const styleName =
          t.type === "success"
            ? style.success
            : t.type === "fetching"
              ? style.fetching
              : t.type === "info"
                ? style.info
                : style.error;
        const iconSrc =
          t.type === "success"
            ? `ic_check-toast`
            : t.type === "fetching"
              ? `ic_fetching`
              : t.type === "info"
                ? `ic_Info`
                : `ic_Fail`;

        return (
          <div key={t.id} className={`${style["toast-wrap"]} ${styleName}`}>
            <img src={`/imgs/admin/icons/${iconSrc}.svg`} alt="체크" />
            <p className="admin-bodySm-m">{t.message}</p>
          </div>
        );
      })}
    </div>
  );
}
