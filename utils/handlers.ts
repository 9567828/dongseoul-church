import { Dispatch, SetStateAction } from "react";
import { roleEum } from "./supabase/sql";
import { request } from "@/lib/api";
import { tabStatusType } from "@/components/admin/ui/board/BoardTab";

export const handlers = () => {
  const handleCheckedRole = (role: roleEum, setState: Dispatch<SetStateAction<roleEum | null>>) => {
    if (role === "super") {
      setState("super");
    } else if (role === "admin") {
      setState("admin");
    } else {
      setState(null);
    }
  };

  const toggleAllChecked = (allChecked: boolean, setState: Dispatch<SetStateAction<string[]>>, list: any[]) => {
    if (allChecked) {
      setState([]);
    } else {
      setState(list.map((v) => String(v.id)));
    }
  };

  const handleAdminInvite = async (email: string, setState: () => void) => {
    const req = await request({ method: "POST", url: "/auth/invite", data: email });
    const { result, message, insertUser } = req;
    if (!result) {
      if (message.code === "email_exists") {
        return alert("이미 초대 된 이메일 입니다.");
      }
      return alert("초대발송 오류 입니다. 다시 확인해 주세요");
    } else {
      if (insertUser !== "Created") {
        console.error("created user error");
      }

      alert("발송 되었습니다. 해당 유저가 이메일 인증 시 가입이 완료 됩니다.");
      setState();
    }
  };

  const handleChangeRole = (id: string, role: roleEum, fn?: () => void) => {
    if (role) {
      console.log(id, role);
    }
    fn;
  };

  const handlePageSizeQuery = (page: string, size: string, tab: tabStatusType) => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("size", size);
    params.set("tab", tab);
    return `?${params.toString()}`;
  };

  return { handleCheckedRole, toggleAllChecked, handleAdminInvite, handleChangeRole, handlePageSizeQuery };
};
