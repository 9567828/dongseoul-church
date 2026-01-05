"use client";

import InputBox from "@/components/admin/ui/input-box/InputBox";
import AuthLayout from "../_components/AuthLayout";
import AuthWrapper from "../_components/AuthWrapper";
import style from "../_components/login.module.scss";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import Button from "@/components/admin/ui/button/Button";
import { formRuls, FormValues } from "@/hooks/FormRules";
import { useHooks } from "@/hooks/useHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { request } from "@/lib/api";

export default function Page() {
  const { passwordRule, passwordConfirmRule } = formRuls();
  const { useMoveBack } = useHooks();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    const req = await request({ method: "POST", url: "/auth/set-password", data: password });

    console.log(req);
  };

  return (
    <AuthLayout>
      <AuthWrapper variant="">
        <div style={{ width: "100%" }}>
          <h1 className={style.title}>비밀번호 설정</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.reset}>
              <div>
                <InputBox
                  type="password"
                  id="password"
                  variants="login"
                  {...register("password", passwordRule)}
                  placeholder="비밀번호를 입력하세요"
                  error={errors.password !== undefined}
                />
                {errors.password !== undefined && <InfoMessage mode="error" msg={errors.password?.message!} />}
              </div>
              <div>
                <InputBox
                  type="password"
                  id="passwordConfirm"
                  variants="login"
                  {...register("confirmPw", passwordConfirmRule(getValues))}
                  placeholder="입력하신 비밀번호를 다시 입력하세요"
                  error={errors.confirmPw !== undefined}
                />
                {errors.confirmPw !== undefined && <InfoMessage mode="error" msg={errors.confirmPw?.message!} />}
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
