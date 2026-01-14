"use client";

import { useToastStore } from "@/hooks/store/useToastStore";
import style from "./toast.module.scss";

export default function ToastPopup() {
  const { toasts } = useToastStore();

  return (
    <div className={style.container}>
      {toasts.map((t) => (
        <div key={t.id} className={`${style["toast-wrap"]} ${t.type === "success" ? style.success : style.error}`}>
          <img src={`/imgs/admin/icons/${t.type === "success" ? `ic_check-toast` : `ic_Fail`}.svg`} alt="체크" />
          <p className="admin-bodySm-m">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
