"use client";

import Button from "@/components/admin/ui/button/Button";
import InfoMessage from "@/components/admin/ui/info-message/InfoMessage";
import InputBox from "@/components/admin/ui/input-box/InputBox";
import { formRuls, userFormValues } from "@/hooks/useForm/userFormRules";
import { handlers } from "@/utils/handlers";
import { SubmitHandler, useForm } from "react-hook-form";
import style from "../_components/login.module.scss";
import AuthLayout from "../_components/AuthLayout";
import AuthWrapper from "../_components/AuthWrapper";
import { useHooks } from "@/hooks/useHooks";
import { request } from "@/lib/api";

export default function Page() {
  const {} = handlers();
  const { emailRule } = formRuls();
  const { useRoute } = useHooks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userFormValues>();

  const onSubmit: SubmitHandler<userFormValues> = async ({ email }) => {
    if (confirm(`입력하신 이메일 주소 "${email}" 맞으신가요?`)) {
      const req = await request({ method: "POST", url: "/auth/reset-password", data: email });
      if (req) {
        confirm("입력하신 이메일로 비밀번호 재설정 안내를 발송했습니다.");
        useRoute("/auth/login");
      }
    }
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
                  placeholder="로그인 이메일 주소를 입력해 주세요"
                  error={errors.email !== undefined}
                />
                {errors.email !== undefined && <InfoMessage mode="error" msg={errors.email?.message!} />}
              </div>
              <Button type="submit" btnName="확인" variants="login" visual="solid" />
              <Button
                btnName="돌아가기"
                variants="back"
                visual="none"
                onClick={() => {
                  reset();
                  useRoute("/auth/login");
                }}
              />
            </div>
          </form>
        </div>
      </AuthWrapper>
    </AuthLayout>
  );
}
