"use client";

import Button from "@/components/admin/ui/button/Button";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import { formRuls, FormValues } from "@/hooks/FormRules";
import { handlers } from "@/utils/handlers";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "../_components/login.module.scss";
import AuthLayout from "../_components/AuthLayout";
import AuthWrapper from "../_components/AuthWrapper";
import { useHooks } from "@/hooks/useHooks";

export default function Page() {
  const { handleAuthReset } = handlers();
  const { emailRule } = formRuls();
  const { useMoveBack } = useHooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ email }) => {
    await handleAuthReset(email);
  };

  return (
    <AuthLayout>
      <AuthWrapper variant="">
        <div style={{ width: "100%" }}>
          <h1 className={style.title}>비밀번호 재설정</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.reset}>
              <div>
                <InputBox
                  id="email"
                  variants="login"
                  {...register("email", emailRule)}
                  placeholder="이메일을 입력하세요"
                  error={errors.email !== undefined}
                />
                {errors.email !== undefined && <InfoMessage mode="error" msg={errors.email?.message!} />}
              </div>
              <Button type="submit" btnName="확인" variants="login" visual="solid" />
              <Button btnName="돌아가기" variants="back" visual="none" onClick={useMoveBack} />
            </div>
          </form>
        </div>
      </AuthWrapper>
    </AuthLayout>
  );
}
