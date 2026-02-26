"use client";

import ModalLayout from "@/components/admin/ui/modal/layout/ModalLayout";
import style from "./album.module.scss";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import ImgContainer from "@/components/admin/ui/img-container/ImgContainer";
import Button from "@/components/admin/ui/button/Button";
import { useHooks } from "@/hooks/useHooks";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import { FormEvent, useRef, useState } from "react";
import { handlers } from "@/utils/handlers";
import { AddAlbumPayload } from "@/utils/supabase/sql";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { useQueryClient } from "@tanstack/react-query";
import ModalHead from "@/components/admin/ui/modal/layout/ModalHead";
import ModalContent from "@/components/admin/ui/modal/layout/ModalContent";
import { useAddAlbum } from "@/tanstack-query/useMutation/boards/useMutationAlbum";
import { useToastStore } from "@/hooks/store/useToastStore";
import FullImg from "@/components/admin/ui/full-img/FullImg";

type ErrType = "file" | "text";

export default function AlbumAddPage() {
  const toast = useToastStore();
  const { useMoveBack, useClearBodyScroll, useBeforeUnload } = useHooks();
  const { handleImgFile } = handlers();
  const { mutate } = useAddAlbum();
  const { data, isLoading } = useSelectLogginUser();
  const queryClient = useQueryClient();

  const [inputTitle, setInputTitle] = useState("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>(null);
  const [err, setErr] = useState<Record<ErrType, boolean>>();
  const [openImg, setOpenImg] = useState(false);
  const addModal = useRef<HTMLDivElement>(null);

  useClearBodyScroll(addModal);

  const handleScroll = () => {
    window.document.body.removeAttribute("style");
  };

  const allReset = () => {
    setInputTitle("");
    setInputFile(null);
    setPrevImg(null);
    setErr({ file: false, text: false });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTitle.trim() === "") {
      setErr({ text: true, file: false });
      return;
    }

    const newObj: AddAlbumPayload = {
      payload: {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        title: inputTitle,
        origin_writer: data?.id!,
      },
      imgFile: inputFile,
    };

    mutate(newObj, {
      onSuccess: (data) => {
        allReset();
        handleScroll();
        useMoveBack();
        queryClient.invalidateQueries({
          queryKey: ["albums"],
        });
      },
      onError: (error) => {
        if (error.name === "TypeError") {
          toast.error("사진을 등록해 주세요");
        }
      },
    });
  };

  return (
    <>
      <ModalLayout hasDim variant="center" modalRef={addModal}>
        <ModalHead
          fontType="admin-bodySm-b"
          title="사진등록"
          variant="wide"
          onClose={() => {
            useMoveBack();
            handleScroll();
          }}
        />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <div>
              <div className={style["form-wrap"]}>
                <div className={style["input-wrap"]}>
                  <label htmlFor="title" className={style.label}>
                    제목
                  </label>
                  <div>
                    <InputBox
                      type="text"
                      id="title"
                      variants="outline"
                      height="sm"
                      placeholder="제목을 입력해 주세요"
                      value={inputTitle}
                      onChange={(e) => setInputTitle(e.target.value)}
                    />
                    {err?.text && <InfoMessage mode="error" msg="제목을 입력해 주세요" />}
                  </div>
                </div>
                <div className={style["input-wrap"]}>
                  <label htmlFor="upload" className={style.label}>
                    사진
                  </label>
                  <ImgContainer
                    mode="default"
                    variant="image"
                    errorMode={err?.file}
                    addImg={prevImg}
                    onClickImg={() => setOpenImg(true)}
                    onReset={allReset}
                    accept="image/*"
                    onChange={(e) => {
                      const result = handleImgFile(e, setPrevImg);
                      if (result?.file) {
                        setInputFile(result?.file!);
                      }
                      if (result?.err) {
                        setErr({ file: result.err, text: false });
                      } else {
                        setErr({ file: false, text: false });
                      }
                    }}
                  />
                </div>
              </div>

              <Button type="submit" width="100%" btnName="등록" variants="primary" visual="solid" />
            </div>
          </form>
        </ModalContent>
      </ModalLayout>
      {openImg && <FullImg onClick={() => setOpenImg(false)} alt={inputFile?.name!} img={prevImg!} />}
    </>
  );
}
