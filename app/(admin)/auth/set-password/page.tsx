import SetPassword from "./(screen)/SetPassword";
import { ITokens } from "@/utils/propType";
import { NextResponse } from "next/server";

export default async function Page({ searchParams }: ITokens) {
  const { token_hash, type } = await searchParams;

  if (!token_hash && !type) {
    alert("인증메일을 다시 요청하세요. 로그인페이지로 돌아갑니다.");
    return NextResponse.redirect("/auth/login");
  }

  return <SetPassword token_hash={token_hash} type={type} />;
}
