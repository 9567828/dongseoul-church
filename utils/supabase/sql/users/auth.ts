import createBrowClient from "../../services/browerClinet";
import { tokensType } from "@/utils/propType";
import { selectAccounts } from "./select";
import { redirect } from "next/navigation";
import { createAdminClient } from "../../services/adminClient";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserId = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  const uid = user?.id;

  if (!uid) {
    return;
  } else {
    return uid;
  }
};

export const getVerify = async ({ token_hash, type, password }: tokensType & { password: string }) => {
  const supabase = createBrowClient();

  if (!token_hash && type) {
    return { result: false, message: "토큰이 없습니다." };
  }

  const {
    data: { session },
    error: verifyError,
  } = await supabase.auth.verifyOtp({
    token_hash,
    type,
  });

  if (verifyError) {
    return { result: false, message: "인증 토큰이 만료되었거나 이미 사용되었습니다" };
  }

  if (!session) {
    return { result: false, message: "session이 없습니다." };
  }

  const {
    data: { user },
    error: pwError,
  } = await supabase.auth.updateUser({ password });

  if (pwError) return { result: false, message: "비밀번호 변경 오류" };

  await supabase.auth.signOut();

  return { result: true, message: "비밀번호 설정 및 권한 변경 완료" };
};

export const checkAcceptAdmin = async () => {
  const { selectUserRole } = selectAccounts();
  const supabase = createBrowClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return { result: false, message: error };

  if (!user?.email_confirmed_at) {
    alert("인증을 다시 진행해 주세요");
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  const role = await selectUserRole({ supabase });

  if (role === "pending") {
    alert("로그인 권한이 없습니다.");
    await supabase.auth.signOut();
    redirect("/auth/login");
  }

  return { result: true };
};
