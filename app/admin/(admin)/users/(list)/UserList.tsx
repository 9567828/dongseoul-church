"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import SelectBox from "@/components/admin/ui/select-box/SelectBox";
import { boardTapList } from "@/utils/menuList";
import { useState } from "react";

const headList = [
  { id: "name", name: "이름", isSort: false },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

export default function UserList() {
  const [allChecked, setAllChecked] = useState(false);

  return (
    <InnerLayout variants="board" title="유저목록" needBtn={true} btnName="계정등록" iconSrc="/imgs/admin/icons/ic_add.svg">
      <p className="admin-bodyMd-b" style={{ padding: "0 20px" }}>
        총 {"10"}건
      </p>
      <ActionField />
      <BoardLayout>
        <TableHead checkBtnId="state" headList={headList} onChange={() => setAllChecked((prev) => !prev)} checked={allChecked} />
        <div className="table-content">
          <div className="check-box">
            <CheckBox variants="main" />
          </div>
          <TextField text="이름이요" withImg={false} />
          <StateLabel text="admin" variant="green" isEdit={true} />
        </div>
      </BoardLayout>
      <SelectBox variant="number" />
    </InnerLayout>
  );
}
