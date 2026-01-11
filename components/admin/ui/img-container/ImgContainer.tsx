import { InputHTMLAttributes, useEffect, useState } from "react";
import AvatarWrap from "../avatar-wrap/AvatarWrap";
import Button from "../button/Button";
import style from "./img-container.module.scss";
import InfoMessage from "../info-message/InfoMessage";

interface Iimgwrap extends InputHTMLAttributes<HTMLInputElement> {
  mode: "default" | "readonly";
  variant: "profile" | "image";
  addImg?: string | null;
  currImg?: string | null;
  errorMode?: boolean;
  onReset: () => void;
}

export default function ImgContainer({
  variant,
  mode = "default",
  addImg,
  currImg,
  errorMode = false,
  onReset,
  ...props
}: Iimgwrap) {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {variant === "image" && (
          <div className={style[variant]}>
            <img
              src={addImg ? addImg : currImg ? currImg : "/imgs/admin/icons/ic_Img.svg"}
              alt="사진등록"
              className={addImg || currImg ? style.preview : undefined}
            />
          </div>
        )}
        {variant === "profile" && <AvatarWrap src={addImg! ? addImg : currImg ? currImg : null} size="xl" />}
        {mode === "default" && (
          <>
            <input {...props} type="file" id="upload" style={{ display: "none" }} accept="image/*" />
            <label htmlFor="upload" className={style.label}>
              <Button type="button" variants="small" visual="outline" btnName="사진선택" />
            </label>
          </>
        )}
      </div>
      {mode === "default" && (
        <div className={style["btn-wrap"]}>
          <InfoMessage addPd={false} mode={errorMode ? "error" : "info"} msg="5MB미만 이미지 파일만 업로드 가능 합니다." />
          <button type="button" onClick={onReset} className={style["reset-btn"]}>
            초기화
          </button>
        </div>
      )}
    </div>
  );
}
