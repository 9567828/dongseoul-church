"use client";

import InputBox from "@/components/admin/ui/input-box/InputBox";
import style from "../../_components/login.module.scss";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import Button from "@/components/admin/ui/button/Button";
import { formRuls, PasswordValues } from "@/hooks/useForm/userFormRules";
import { useHooks } from "@/hooks/useHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthLayout from "../../_components/AuthLayout";
import AuthWrapper from "../../_components/AuthWrapper";
import { tokensType } from "@/utils/propType";
import { getVerify, signOut } from "@/utils/supabase/sql/users/auth";
import { useSignOut, useSignOutForErr } from "@/tanstack-query/useQuerys/users/useSelectUser";

export default function SetPassword({ token_hash, type }: tokensType) {
  const { passwordRule, passwordConfirmRule } = formRuls();
  const { useMoveBack, useRoute } = useHooks();
  const signOut = useSignOut();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordValues>();

  const onSubmit: SubmitHandler<PasswordValues> = async ({ password }) => {
    const { result, message } = await getVerify({ token_hash, type, password });

    if (!result) {
      if (type === "recovery") {
        if (message === "same_password") {
          alert("이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.\n비밀번호 재설정을 다시 진행해 주세요");
          signOut();
          useRoute("/auth/reset-password");
          return;
        }
      }

      alert("인증이 만료되었습니다. 다시 시도해 주세요.");
      useRoute("/auth/login");
      return;
    }

    alert("비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.");
    useRoute("/auth/login");
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
