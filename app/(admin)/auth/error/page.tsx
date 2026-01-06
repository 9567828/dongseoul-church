import { redirect } from "next/navigation";

export default function Page() {
  if (confirm("접근이 불가능한 아이디 입니다.")) {
    return redirect("/auth/login");
  }
}
