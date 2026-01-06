"use client";

import InputBox from "@/components/admin/ui/input-box/InputBox";
import style from "../../_components/login.module.scss";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import Button from "@/components/admin/ui/button/Button";
import { formRuls, FormValues } from "@/hooks/FormRules";
import { useHooks } from "@/hooks/useHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../../_components/AuthLayout";
import AuthWrapper from "../../_components/AuthWrapper";
import { tokensType } from "@/utils/propType";
import { getVerify } from "@/utils/supabase/sql/users/auth";

export default function SetPassword({ token_hash, type }: tokensType) {
  const { passwordRule, passwordConfirmRule } = formRuls();
  const { useMoveBack, useRoute } = useHooks();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ password }) => {
    const { result, message } = await getVerify({ token_hash, type, password });
    console.log(result, message);
    if (!result) {
      return alert("인증을 다시 시도해 주세요");
    } else {
      if (confirm("로그인페이지로 돌아갑니다.")) {
        useRoute("/auth/login");
      }
    }
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
