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
import { IUser, roleType, UserFormType } from "@/utils/propType";
import Button from "@/components/admin/ui/button/Button";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useState } from "react";
import InputAddr from "@/components/admin/ui/input-box/InputAddr";
import { useHooks } from "@/hooks/useHooks";
import { handlers } from "@/utils/handlers";

interface IUserForm {
  mode: UserFormType;
  userId?: string;
  userObj?: IUser;
}

export default function UserForm({ mode, userId, userObj }: IUserForm) {
  const [user] = useState(userObj);
  const { useMoveBack } = useHooks();
  const { handleCheckedRole } = handlers();
  const { usernameRule, phoneRule, emailRule, emptyRule } = formRuls();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<FormValues>();

  const [selectRole, setSelectRole] = useState<roleType | null>(mode === "readOnly" || mode === "edit" ? user?.role! : "nomal");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { username, phone } = data;
    if (mode === "add") {
      console.log("add 일 때 동작");
    } else if (mode === "edit") {
      console.log("edit 일 때 동작");
    }
    console.log(data, selectRole);
  };

  return (
    <InnerLayout mode="withFooter" title={mode === "add" ? "계정등록" : mode === "edit" ? "계정수정" : "계정상세"}>
      <FormLayout
        mode={mode}
        variants="grid"
        id="userAdd"
        userId={userId}
        onSubmit={handleSubmit(onSubmit)}
        onDelete={() => console.log("삭제")}
        onBack={useMoveBack}
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
                defaultValue={mode === "readOnly" || mode === "edit" ? user?.name : ""}
                isRequired={mode !== "readOnly"}
                placeholder="이름을 입력하세요"
              />
              <Controller
                name="phone"
                control={control}
                defaultValue={mode === "readOnly" || mode === "edit" ? user?.phone : ""}
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
                label="이메일"
                defaultValue={mode === "readOnly" || mode === "edit" ? user?.email : ""}
                isRequired={mode !== "readOnly"}
                placeholder="이메일을 입력해 주세요"
              />
              {mode === "add" ||
                (mode === "edit" && selectRole !== "nomal" && (
                  <Button type="button" height="48px" variants="primary" visual="outline" btnName="초대발송" />
                ))}
            </div>
            <div className={style.flex}>
              <LabelInput
                mode={mode}
                type="text"
                label="직책"
                defaultValue={mode === "readOnly" || mode === "edit" ? user?.position : ""}
                isRequired={mode !== "readOnly"}
                placeholder="직책을 입력해 주세요"
              />
              <LabelInput
                mode={mode}
                type="text"
                label="담당사역"
                defaultValue={mode === "readOnly" || mode === "edit" ? user?.duty : ""}
                isRequired={mode !== "readOnly"}
                placeholder="담당사역을 입력해 주세요"
              />
            </div>
          </WhitePanel>
          <WhitePanel variants="profile" title="주소">
            <InputAddr mode={mode} />
          </WhitePanel>
        </div>
        <div className={style["flex-column"]}>
          <WhitePanel variants="profile" title="이미지">
            <ImgContainer mode="default" variant="profile" />
          </WhitePanel>
          <WhitePanel variants="profile" title="계정 권한">
            <ToggleRole
              mode={mode}
              variant={mode !== "readOnly" ? "vertical" : "horizontal"}
              role={selectRole!}
              onChange={(e) => handleCheckedRole(e.target.id as roleType, setSelectRole)}
            />
          </WhitePanel>
        </div>
      </FormLayout>
    </InnerLayout>
  );
}
