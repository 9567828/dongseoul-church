"use client";

import Loading from "@/app/Loading";
import style from "./album.module.scss";
import FormLayout from "@/components/admin/layouts/form-layout/FormLayout";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import Label from "@/components/admin/ui/label/Label";
import { useHooks } from "@/hooks/useHooks";
import { useSelectOne } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDateTime } from "@/utils/formatDate";
import { FormType, modalActType } from "@/utils/propType";
import { AlbumWithName, EditAlbumPayload } from "@/utils/supabase/sql";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import RadioBtn from "@/components/admin/ui/button/RadioBtn";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import { handlers } from "@/utils/handlers";
import { FormEvent, useState } from "react";
import { getAlbumImgURL } from "@/utils/supabase/sql/storage/storage";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { useDeleteAlbums, useEditAlbum } from "@/tanstack-query/useMutation/boards/useMutationAlbum";
import { useToastStore } from "@/hooks/store/useToastStore";
import { useQueryClient } from "@tanstack/react-query";
import FullImg from "@/components/admin/ui/full-img/FullImg";
import DeleteModal from "@/components/admin/ui/modal/DeleteModal";

interface IAlbumForm {
  mode: FormType;
  id: string;
}

export default function AlbumForm({ mode, id }: IAlbumForm) {
  const queryClient = useQueryClient();
  const { useMoveBack, useRoute, useClearBodyScroll } = useHooks();
  const { handleImgFile, handleCheckedIsShow } = handlers();
  const { data, isLoading } = useSelectOne<AlbumWithName>("albums", id, "all");
  const { data: member } = useSelectLogginUser();
  const { mutate: edit } = useEditAlbum();
  const { mutate: deletAlbum } = useDeleteAlbums();
  const toast = useToastStore();

  const d = data?.data;
  const state = d?.is_show ? "노출" : "비노출";
  let imgUrl;

  if (d?.src) {
    imgUrl = getAlbumImgURL(d.src);
  }

  type StateType = "show" | "noShow";
  const [isShow, setIsShow] = useState<StateType>(state === "노출" ? "show" : "noShow");
  const [openModal, setOpenModal] = useState<modalActType | null>(null);
  const [inputTitle, setInputTitle] = useState(d?.title);
  const [inputImg, setInputImg] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const [fileErr, setFileErr] = useState(false);

  useClearBodyScroll(openModal);

  const handleRadio = (id: StateType) => {
    setIsShow(id);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!d?.title) return;
    if (fileErr) {
      toast.error("사진파일을 확인해 주세요.");
      return;
    }
    const newObj: EditAlbumPayload = {
      payload: {
        id: d.id!,
        updated_at: new Date().toISOString(),
        title: inputTitle?.trim() === "" ? d?.title! : inputTitle!,
        edit_writer: member?.id!,
        is_show: isShow === "show" ? true : false,
      },
      imgFile: inputImg,
      imgPath: d.src!,
    };

    edit(newObj, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["albums", id],
        });

        queryClient.invalidateQueries({
          queryKey: ["albums"],
        });

        setFileErr(false);
        setInputImg(null);
        setPrevImg(null);
        useRoute(`/admin/boards/albums/${id}`);
      },
      onError: (error) => {
        if (error.cause === "경로오류") {
          toast.error("저장에 실패 되었습니다.");
        }
      },
    });
  };

  const handleDelete = () => {
    deletAlbum([id], {
      onSuccess: (data) => {
        queryClient.removeQueries({
          queryKey: ["albums", id],
        });
        queryClient.invalidateQueries({
          queryKey: ["albums"],
        });
        toast.success("삭제 완료 되었습니다.");
        useRoute(`/admin/boards/albums`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("삭제 실패 되었습니다.");
      },
    });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <InnerLayout
        mode="withFooter"
        title="앨범상세"
        sub1={{ date: `작성일자: ${formatDateTime(d?.created_at!)}`, name: `작성자: ${d?.origin.name!}` }}
        sub2={
          d?.edit_writer !== null
            ? { date: `수정일자: ${formatDateTime(d?.updated_at!)}`, name: `수정자: ${d?.editor.name}` }
            : undefined
        }
      >
        <FormLayout
          mode={mode}
          onSubmit={onSubmit}
          onBack={useMoveBack}
          onDelete={() => setOpenModal({ action: "delete" })}
          onMoveEdit={() => useRoute(`/admin/boards/albums/edit/${id}`)}
          onReset={() => {
            if (confirm("변경사항이 모두 초기화 됩니다.")) {
              setInputImg(null);
              setPrevImg(null);
              setInputTitle("");
            }
          }}
          variants="column"
        >
          <WhitePanel variants="detail" title="제목">
            {mode === "readOnly" ? (
              <p className={style.title}>{d?.title}</p>
            ) : (
              <InputBox
                variants="outline"
                placeholder={d?.title!}
                value={inputTitle!}
                onChange={(e) => setInputTitle(e.target.value)}
              />
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
                <div className={style["img-wrap"]} onClick={() => setOpenModal({ action: "openImg" })}>
                  <img src={prevImg ? prevImg : imgUrl} alt={d?.title!} />
                </div>
                {mode === "edit" && (
                  <>
                    <InfoMessage
                      mode={fileErr ? "error" : "info"}
                      addPd={false}
                      msg="5MB미만 이미지 파일만 업로드 가능 합니다."
                    />

                    <div className={style["btn-wrap"]}>
                      <label htmlFor="inputFile" className={style["add-btn"]}>
                        사진수정
                        <input
                          type="file"
                          id="inputFile"
                          onChange={(e) => {
                            const file = handleImgFile(e, setPrevImg);
                            if (file?.file) {
                              setInputImg(file?.file);
                            }
                            setFileErr(file?.err!);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        className="admin-bodyMd-m"
                        onClick={() => {
                          setPrevImg(null);
                          setInputImg(null);
                        }}
                      >
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
      {openModal?.action === "openImg" && (
        <FullImg onClick={() => setOpenModal(null)} img={imgUrl ? imgUrl : prevImg!} alt={d?.title!} />
      )}
      {openModal?.action === "delete" && (
        <DeleteModal title="게시글 삭제" onConfirm={handleDelete} onCancel={() => setOpenModal(null)} />
      )}
    </>
  );
}
