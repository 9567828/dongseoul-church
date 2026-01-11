"use client";

import style from "./user.module.scss";
import FormLayout from "@/components/admin/layouts/form-layout/FormLayout";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ImgContainer from "@/components/admin/ui/img-container/ImgContainer";
import LabelInput from "@/components/admin/ui/input-box/LabelInput";
import { formRuls, FormValues } from "@/hooks/FormRules";
import { formatPhone } from "@/utils/formatPhone";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalActType, FormType } from "@/utils/propType";
import Button from "@/components/admin/ui/button/Button";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useState } from "react";
import InputAddr from "@/components/admin/ui/input-box/InputAddr";
import { useHooks } from "@/hooks/useHooks";
import { handlers } from "@/utils/handlers";
import { MemberAddPaylod, MemberEditPaylod, roleEum } from "@/utils/supabase/sql";
import Loading from "@/app/Loading";
import { useSelectUserById } from "@/tanstack-query/useQuerys/users/useSelectUser";
import RoleInfo from "@/components/admin/ui/role-info/RoleInfo";
import { useAddUser, useEditUser } from "@/tanstack-query/useMutation/users/useMutationUser";
import Label from "@/components/admin/ui/label/Label";
import { useQueryClient } from "@tanstack/react-query";
import { saveAvatarImg, updateAvatarImg } from "@/utils/supabase/sql/storage/storage";
import InviteModal from "@/components/admin/ui/modal/InviteModal";
import ChangeRoleModal from "@/components/admin/ui/modal/ChangeRoleModal";

interface IUserForm {
  mode: FormType;
  userId: string;
}

export default function UserForm({ mode, userId }: IUserForm) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useSelectUserById(userId!);
  const { mutate: addMutate } = useAddUser();
  const { mutate: editMutate } = useEditUser();

  const emptyDefaults: FormValues = {
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
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<FormValues>({ defaultValues: emptyDefaults });

  if ((mode === "edit" || mode === "readOnly") && isLoading && !data) {
    return <Loading />;
  }

  const { useRoute, useOpenAddr } = useHooks();
  const { handleCheckedRole, handleAdminInvite, handleImgFile } = handlers();
  const { usernameRule, phoneRule, emailRule } = formRuls();

  const [selectRole, setSelectRole] = useState<roleEum | null>(data?.admin?.role || null);
  const [openModal, setOpenModal] = useState<modalActType | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [prevImg, setPrevImg] = useState<string | null>("");
  const [fileErr, setFileErr] = useState(false);
  const [addr, setAddr] = useState({ address: "", zonecode: "" });
  useOpenAddr(setAddr);

  const onSubmit: SubmitHandler<FormValues> = async ({ username, phone, email, duty, position, addr_detail }) => {
    if (mode === "add") {
      const newObj: MemberAddPaylod = {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: username,
        email,
        phone,
        duty: duty === "" ? "없음" : duty,
        position: position === "" ? "없음" : position,
        avatar: null,
        zonecode: addr.zonecode || null,
        addr: addr.address || null,
        addr_detail: addr_detail || null,
      };

      addMutate(newObj, {
        onSuccess: async (data) => {
          const newId = data;

          if (imgFile !== null) {
            const result = await saveAvatarImg(newId, imgFile);

            if (result !== undefined) {
              const data = await updateAvatarImg(newId, result.path);

              queryClient.invalidateQueries({
                queryKey: ["members", newId],
              });
              queryClient.invalidateQueries({
                queryKey: ["members"],
              });
            }
          }

          setImgFile(null);
          setPrevImg(null);
          setAddr({ address: "", zonecode: "" });
          reset();
          useRoute("/admin/users");
        },
        onError: (error) => {
          if (error.message.startsWith("duplicate key value")) {
            alert("중복이메일 입니다.");
          }
        },
      });
    } else if (mode === "edit") {
      if (!data?.name) return;
      const newObj: MemberEditPaylod = {
        payload: {
          updated_at: new Date().toISOString(),
          name: username || data?.name,
          phone: phone || data?.phone,
          duty: duty || data?.duty,
          position: position || data?.position,
          zonecode: addr.zonecode || data.zonecode,
          addr: addr.address || data.addr,
          addr_detail: addr_detail || data.addr_detail,
        },
        role: selectRole || data?.admin?.role,
        uid: data.admin_user!,
        memId: userId,
      };

      editMutate(newObj, {
        onSuccess: async (data) => {
          const user = data?.member.find((v) => v.id);
          if (imgFile !== null) {
            const result = await saveAvatarImg(userId, imgFile);

            if (result !== undefined) {
              const data = await updateAvatarImg(userId, result.path);
            }
          }

          queryClient.invalidateQueries({
            queryKey: ["members", userId],
          });
          queryClient.invalidateQueries({
            queryKey: ["members"],
          });
          reset();
          setImgFile(null);
          setPrevImg(null);
          setAddr({ address: "", zonecode: "" });
          useRoute(`/admin/users/${userId}`);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const moveBack = (mode: FormType) => {
    const target = mode === "edit" ? `/admin/users/${userId}` : "/admin/users";

    if (mode === "readOnly") return useRoute(target);

    const hasChanged = isDirty || imgFile !== null;

    if (hasChanged) {
      const ok = confirm("변경사항 저장되지 않습니다. 돌아가시겠습니까?");
      if (!ok) return;

      reset();
      setImgFile(null);
      setPrevImg(null);
      setAddr({ address: "", zonecode: "" });
    }

    useRoute(target);
  };

  return (
    <>
      <InnerLayout mode="withFooter" title={mode === "add" ? "신도등록" : mode === "edit" ? "신도수정" : "신도상세"}>
        <FormLayout
          mode={mode}
          variants="grid"
          id="userAdd"
          onSubmit={handleSubmit(onSubmit)}
          onDelete={() => console.log()}
          onBack={() => moveBack(mode)}
          onMoveEdit={() => useRoute(`/admin/users/edit/${userId}`)}
          onReset={() => {
            alert("입력하신 모든 정보가 삭제 됩니다.");
            reset();
            setAddr({ address: "", zonecode: "" });
            setImgFile(null);
            setPrevImg(null);
          }}
        >
          <div className={style["flex-column"]}>
            <WhitePanel variants="profile" title="기본정보">
              <div className={style.flex}>
                <LabelInput
                  id="username"
                  {...register("username", usernameRule)}
                  errMsg={errors.username?.message}
                  mode={mode}
                  type="text"
                  label="이름"
                  defaultValue={mode === "readOnly" || mode === "edit" ? data?.name : ""}
                  isRequired={mode !== "readOnly"}
                  placeholder="이름을 입력하세요"
                />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={mode === "readOnly" || mode === "edit" ? data?.phone : ""}
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
                      mode={mode}
                      type="text"
                      label="휴대전화"
                      isRequired={mode !== "readOnly"}
                      maxLength={13}
                      placeholder="전화번호를 입력하세요"
                    />
                  )}
                />
              </div>
              <div className={style.flex} style={{ gap: "8px", alignItems: "flex-end" }}>
                <LabelInput
                  mode={mode}
                  type="email"
                  label={`이메일 ${data?.admin_user !== null && data?.admin !== undefined ? `수정불가` : ""}`.trim()}
                  isAdmin={data?.admin_user !== null && data?.admin !== undefined}
                  {...register("email", emailRule)}
                  errMsg={errors.email?.message}
                  defaultValue={mode === "readOnly" || mode === "edit" ? data?.email : ""}
                  isRequired={(mode !== "readOnly" && data?.admin_user === null) || data?.admin === undefined}
                  placeholder="이메일을 입력해 주세요"
                />
              </div>
              <div className={style.flex}>
                <LabelInput
                  mode={mode}
                  type="text"
                  label="직책"
                  {...register("position")}
                  defaultValue={mode === "readOnly" || mode === "edit" ? data?.position! : ""}
                  placeholder="직책을 입력해 주세요"
                />
                <LabelInput
                  mode={mode}
                  type="text"
                  label="담당사역"
                  {...register("duty")}
                  defaultValue={mode === "readOnly" || mode === "edit" ? data?.duty! : ""}
                  placeholder="담당사역을 입력해 주세요"
                />
              </div>
            </WhitePanel>
            <WhitePanel variants="profile" title="주소">
              <InputAddr
                mode={mode}
                {...register("addr_detail")}
                defaultValue={mode === "readOnly" || mode === "edit" ? data?.addr_detail! : ""}
                errMode={addr.address !== ""}
                code={data?.zonecode ? data.zonecode : addr.zonecode}
                addr={data?.addr ? data.addr : addr.address}
              />
            </WhitePanel>
          </div>
          <div className={style["flex-column"]}>
            <WhitePanel variants="profile" title="이미지">
              <ImgContainer
                mode={mode === "readOnly" ? "readonly" : "default"}
                variant="profile"
                onChange={(e) => {
                  const result = handleImgFile(e, setPrevImg);
                  setImgFile(result?.file || null);
                  setFileErr(result?.err || false);
                }}
                addImg={prevImg}
                currImg={data?.avatar_url}
                errorMode={fileErr}
                onReset={() => {
                  setPrevImg("");
                  setImgFile(null);
                }}
              />
            </WhitePanel>

            {selectRole === "super" || selectRole === "admin" ? (
              <WhitePanel variants="profile" title="관리자 권한 설정">
                <ToggleRole
                  mode={mode}
                  variant={mode !== "list" ? "horizontal" : "vertical"}
                  role={selectRole!}
                  onChange={(e) => setOpenModal({ key: e.target.id as roleEum, action: "state" })}
                />
              </WhitePanel>
            ) : selectRole === "pending" ? (
              <WhitePanel title="괸리자 권한" variants="profile">
                <Label variant="green" text="초대대기중" />
              </WhitePanel>
            ) : mode !== "add" ? (
              <WhitePanel variants="profile" title="관리자 권한 등록">
                <div className={style.flex}>
                  <Button
                    type="button"
                    height="48px"
                    variants="primary"
                    visual="outline"
                    btnName="관리자초대"
                    onClick={() => setOpenModal({ action: "invite" })}
                  />
                  <RoleInfo variant="horizontal" />
                </div>
              </WhitePanel>
            ) : null}
          </div>
        </FormLayout>
      </InnerLayout>
      {openModal?.action === "invite" && (
        <InviteModal
          onConfirm={() => handleAdminInvite(data?.email!, () => setOpenModal(null))}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "state" && (
        <ChangeRoleModal
          role={openModal.key as roleEum}
          onConfirm={() => {
            handleCheckedRole(openModal.key as roleEum, setSelectRole);
            setOpenModal(null);
          }}
          onCancel={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
