"use client";

import Loading from "@/app/Loading";
import style from "./album.module.scss";
import FormLayout from "@/components/admin/layouts/form-layout/FormLayout";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import Label from "@/components/admin/ui/label/Label";
import { useHooks } from "@/hooks/useHooks";
import { useSelectOne } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDate } from "@/utils/formatDate";
import { FormType } from "@/utils/propType";
import { AlbumWithName } from "@/utils/supabase/sql";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import RadioBtn from "@/components/admin/ui/button/RadioBtn";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import { handlers } from "@/utils/handlers";
import { useState } from "react";
import { getAlbumImgURL } from "@/utils/supabase/sql/storage/storage";

interface IAlbumForm {
  mode: FormType;
  id: string;
}

export default function AlbumForm({ mode, id }: IAlbumForm) {
  const { useMoveBack, useRoute } = useHooks();
  const { handleImgFile, handleCheckedIsShow } = handlers();
  const { data, isLoading } = useSelectOne<AlbumWithName>("albums", id, "all");

  const d = data?.data;
  const state = d?.is_show ? "노출" : "비노출";
  let imgUrl;

  if (d?.src) {
    imgUrl = getAlbumImgURL(d.src);
  }

  type StateType = "show" | "noShow";
  const [isShow, setIsShow] = useState<StateType>(state === "노출" ? "show" : "noShow");

  const handleRadio = (id: StateType) => {
    setIsShow(id);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <InnerLayout
      mode="withFooter"
      title="앨범상세"
      sub1={`작성일자: ${formatDate(d?.created_at!)}`}
      sub2={`작성자: ${d?.displayName.name}`}
    >
      <FormLayout
        mode={mode}
        onBack={useMoveBack}
        onDelete={() => console.log()}
        onMoveEdit={() => useRoute(`/admin/boards/albums/edit/${id}`)}
        onReset={() => console.log()}
        variants="column"
      >
        <WhitePanel variants="detail" title="제목">
          {mode === "readOnly" ? (
            <p className={style.title}>{d?.title}</p>
          ) : (
            <InputBox variants="outline" placeholder={d?.title!} />
          )}
        </WhitePanel>
        <WhitePanel variants="detail" title="내용">
          <div className={style.state}>
            <p className="admin-bodyMd-r">노출상태: </p>
            {mode === "readOnly" ? (
              <Label text={state} variant={state === "노출" ? "green" : "red"} />
            ) : (
              <div className={style["radio-wrap"]}>
                <RadioBtn
                  id="show"
                  name="state"
                  text="노출"
                  value="show"
                  checked={isShow === "show"}
                  onChange={(e) => handleRadio(e.target.value as StateType)}
                />
                <RadioBtn
                  id="noShow"
                  name="state"
                  text="비노출"
                  value="noShow"
                  checked={isShow === "noShow"}
                  onChange={(e) => handleRadio(e.target.value as StateType)}
                />
              </div>
            )}
          </div>
          <div>
            <p className="admin-bodySm-m ">업로드이미지</p>
            <div className={style["img-container"]}>
              <div className={style["img-wrap"]}>
                <img src={imgUrl} alt={d?.title!} />
              </div>
              {mode === "edit" && (
                <>
                  <InfoMessage mode="info" addPd={false} msg="5MB미만 이미지 파일만 업로드 가능 합니다." />
                  <div className={style["btn-wrap"]}>
                    <label className={style["add-btn"]}>
                      사진수정
                      <input type="file" name="" id="" />
                    </label>
                    <button type="button" className="admin-bodyMd-m">
                      초기화
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </WhitePanel>
      </FormLayout>
    </InnerLayout>
  );
}
