"use client";

import Link from "next/link";
import style from "./page.module.scss";
import Button from "@/components/admin/ui/button/Button";
import RadioBtn from "@/components/admin/ui/button/RadioBtn";
import ToggleBtn from "@/components/admin/ui/button/ToggleBtn";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import ImgContainer from "@/components/admin/ui/img-container/ImgContainer";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [active, setActive] = useState(false);
  const [curImg, setCurImg] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [addImg, setAddImg] = useState<string | null>("");
  const [isError, setIsError] = useState(false);

  const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const { files } = e.target;

    const mb = 1024 * 1024; //1mb(메가)
    const limit_size = mb * 5;

    if (files && files.length === 1) {
      const file = files[0];

      if (file.size > limit_size) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setImgFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAddImg(reader.result as string);
      };
    } else {
      setImgFile(null);
      setAddImg("");
      setIsError(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <ul className={style.ul}>
        <li className={style.li} onClick={() => setActive(true)} onMouseLeave={() => setActive(false)}>
          <Link href="">하이</Link>
          <span className={style.span}>
            {active && (
              <span className={`${active ? style.visible : style.leave}`.trim()}>
                <span className={style.child}></span>
              </span>
            )}
          </span>
        </li>
        <li className={style.li}>
          <Link href="">헬로</Link>
        </li>
      </ul>
      <InputBox variants="outline" height="lg" placeholder="입력하세요" />
      <Button variants="login" visual="none" btnName="buttn" />
      <Button variants="delete" visual="solid" btnName="buttn" src="/imgs/admin/icons/ic_trash.svg" />
      <Button variants="delete" visual="outline" btnName="buttn" src="/imgs/admin/icons/ic_trash.svg" />
      <div style={{ width: "300px", height: "100px", backgroundColor: "black", paddingTop: "20px" }}>
        <Button variants="trans" visual="none" btnName="buttn" />
      </div>
      <Button btnName="돌아가기" variants="back" visual="none" />
      <Button btnName="" variants="close" visual="none" />
      <CheckBox id="check" variants="login">
        <label htmlFor="check">로그인</label>
      </CheckBox>
      <CheckBox id="log" variants="main">
        <label htmlFor="log">다른거</label>거거
      </CheckBox>
      <RadioBtn text="선택하세요" />
      <ToggleBtn id="toggle" />
      <ImgContainer
        variant="image"
        mode="default"
        onChange={handlePreview}
        errorMode={isError}
        addImg={addImg}
        currImg={"/imgs/admin/Frame 35574.png"}
      />
      <ImgContainer
        variant="profile"
        mode="readonly"
        onChange={handlePreview}
        errorMode={isError}
        addImg={addImg}
        currImg={"/imgs/admin/Frame 35574.png"}
      />
    </div>
  );
}
