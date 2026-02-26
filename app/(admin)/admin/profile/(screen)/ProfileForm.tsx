"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import AvatarWrap from "@/components/admin/ui/avatar-wrap/AvatarWrap";
import Button from "@/components/admin/ui/button/Button";
import InputAddr from "@/components/admin/ui/input-box/InputAddr";
import LabelInput from "@/components/admin/ui/input-box/LabelInput";
import style from "./profile.module.scss";
import { useHooks } from "@/hooks/useHooks";
import { useRef, useState } from "react";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";
import Loading from "@/app/Loading";
import { formRuls, userFormValues } from "@/hooks/useForm/userFormRules";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formatPhone } from "@/utils/formatPhone";
import { useEditUser } from "@/tanstack-query/useMutation/users/useMutationUser";
import { handlers } from "@/utils/handlers";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import { MemberEditPayload } from "@/utils/supabase/sql";
import { deleteUserImg } from "@/utils/supabase/sql/storage/storage";
import { useQueryClient } from "@tanstack/react-query";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { useToastStore } from "@/hooks/store/useToastStore";

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useSelectLogginUser();
  const { usernameRule, phoneRule } = formRuls();
  const { useOpenAddr, useOnClickOutSide } = useHooks();
  const { handleImgFile, handleResetPassword } = handlers();
  const { mutate } = useEditUser();
  const toast = useToastStore();

  const emptyDefaults: userFormValues = {
    username: data?.name ?? "",
    email: data?.email ?? "",
    position: data?.position ?? "",
    duty: data?.duty ?? "",
    phone: data?.phone ?? "",
    addr_detail: data?.addr_detail ?? "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<userFormValues>({ defaultValues: emptyDefaults });

  if (isLoading) return <Loading />;

  const [hover, setHover] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>("");
  const [fileErr, setFileErr] = useState(false);
  const [addr, setAddr] = useState({ address: "", zonecode: "" });

  const editRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutSide(editRef, () => setHover(false));
  useOpenAddr(setAddr);

  const onSubmit: SubmitHandler<userFormValues> = async ({ username, phone, duty, position, addr_detail }) => {
    if (!data?.id) return;

    const id = data.id;
    const newObj: MemberEditPayload = {
      payload: {
        updated_at: new Date().toISOString(),
        name: username || data?.name,
        phone: phone || data?.phone,
        duty: duty || data?.duty,
        position: position || data?.position,
        zonecode: addr.zonecode || data?.zonecode,
        addr: addr.address || data?.addr,
        addr_detail: addr_detail || data?.addr_detail,
      },
      uid: data?.admin_user!,
      memId: id,
      imgFile,
    };
    mutate(newObj, {
      onSuccess: async (data) => {
        if (data.member === undefined) {
          toast.error("저장이 실패 되었습니다.");
        } else {
          toast.success("저장이 완료 되었습니다.");
          queryClient.invalidateQueries({
            queryKey: ["member", "own"],
          });
          setImgFile(null);
          setPrevImg(null);
        }
      },
      onError: (error) => {
        toast.error("저장이 실패 되었습니다.");
        console.error(error);
      },
    });
  };

  const handleDeleteImg = async () => {
    const supabase = createBrowClient();
    if (data?.avatar !== null) {
      const result = await deleteUserImg(data?.id!, supabase);
      if (result === null) {
        toast.success("사진이 삭제 되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["member", "own"],
        });
      }
    }
    setImgFile(null);
    setFileErr(false);
    setPrevImg(null);
  };

  return (
    <>
      <InnerLayout mode="default" title="프로필 관리">
        <div className={style.container}>
          <WhitePanel title="기본정보" variants="profile">
            <div className={style["avatar-wrap"]}>
              <div>
                <AvatarWrap src={prevImg || data?.avatar_url!} size="xl" />
                <div className={style.error}>
                  {fileErr && <InfoMessage mode="error" msg="5MB 이하 파일만 저장 가능 합니다." />}
                </div>
              </div>
              <button className={`${style.position} ${style.btn}`} onMouseDown={() => setHover(true)}>
                <img src="/imgs/admin/icons/ic_dot-menu.svg" alt="수정메뉴" />
              </button>
              {hover && (
                <div className={`${style.position} ${style.space}`} ref={editRef}>
                  <div className={style["edit-wrap"]}>
                    <label htmlFor="editImg" className={`${style.btn} ${style["edit-btn"]}`}>
                      <input
                        type="file"
                        id="editImg"
                        onChange={(e) => {
                          const result = handleImgFile(e, setPrevImg);
                          setImgFile(result?.file || null);
                          setFileErr(result?.err || false);
                        }}
                        accept="image/*"
                      />
                      <img src="/imgs/admin/icons/ic_pen-edit.svg" alt="사진수정" />
                    </label>
                    <button type="button" className={style.btn} onClick={handleDeleteImg}>
                      <img src="/imgs/admin/icons/ic_circle-delete.svg" alt="사진삭제" />
                    </button>
                  </div>
                </div>
              )}

              <div style={{ padding: "10px" }}>
                <p className="admin-bodyLg-b">{data?.name}</p>
                <p className={style.text}>{data?.email}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={style["input-wrap"]}>
                <div className={style.flex}>
                  <LabelInput type="text" label="이름" mode="edit" {...register("username", usernameRule)} />
                  <Controller
                    name="phone"
                    control={control}
                    rules={phoneRule}
                    render={({ field }) => (
                      <LabelInput
                        id="phone"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        errMsg={errors.phone?.message}
                        mode={"edit"}
                        type="text"
                        label="휴대전화"
                        maxLength={13}
                        placeholder="전화번호를 입력하세요"
                      />
                    )}
                  />
                </div>
                <div className={style.flex}>
                  <LabelInput type="text" label="직책" mode="edit" {...register("position")} />
                  <LabelInput type="text" label="담당사역" mode="edit" {...register("duty")} />
                </div>
                <div>
                  <InputAddr
                    addr={data?.addr ?? addr.address}
                    code={data?.zonecode ?? addr.zonecode}
                    mode="edit"
                    {...register("addr_detail")}
                    errMode={addr.address !== ""}
                  />
                </div>
              </div>
              <div className={style["action-btn-wrap"]}>
                <Button type="submit" btnName="저장" variants="primary" visual="solid" />
                <button
                  type="button"
                  className="admin-bodyMd-m"
                  onClick={() => {
                    if (confirm("입력하신 내용을 모두 지우시겠습니까?")) {
                      reset();
                      setFileErr(false);
                      setImgFile(null);
                      setPrevImg(null);
                      setAddr({ address: "", zonecode: "" });
                    }
                  }}
                >
                  초기화
                </button>
              </div>
            </form>
          </WhitePanel>
          <WhitePanel variants="profile" title="비밀번호 재설정">
            <div>
              <Button
                type="button"
                btnName="재설정 이메일발송"
                variants="primary"
                visual="outline"
                onClick={() => {
                  if (!data?.email) return;
                  handleResetPassword(data.email);
                  alert("비밀번호 재설정 이메일을 발송했습니다.");
                }}
              />
            </div>
          </WhitePanel>
        </div>
      </InnerLayout>
      {/* {isOpen && <ToastPopup />} */}
    </>
  );
}
