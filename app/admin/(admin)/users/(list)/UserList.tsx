"use client";

import style from "./list.module.scss";
import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import RoleToggle from "@/components/admin/ui/button/RoleToggle";
import ToggleBtn from "@/components/admin/ui/button/ToggleBtn";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import Label from "@/components/admin/ui/label/Label";
import ModalLayout from "@/components/admin/ui/modal/ModalLayout";
import { useHooks } from "@/hooks/useHooks";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

const headList = [
  { id: "name", name: "이름", isSort: false },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

const userList = [
  { id: 1, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "super" },
  { id: 2, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 3, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 4, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 5, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "super" },
  { id: 6, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 7, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 8, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  { id: 9, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 10, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 11, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 12, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 13, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 14, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 15, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 16, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 17, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 18, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 19, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 20, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 21, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 22, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 23, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 24, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 25, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 26, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 27, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 28, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 29, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 30, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 31, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
  // { id: 32, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "admin" },
];

export default function UserList() {
  const [selected, setSelected] = useState("");
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState(false);
  const [openEdit, setOpenEdit] = useState("");
  const [changeTop, setChangeTop] = useState(false);

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === userList.length;

  const toggleAllChecked = () => {
    if (allChecked) {
      setCheckedRow([]);
    } else {
      setCheckedRow(userList.map((v) => String(v.id)));
    }
  };

  const handleCheckedRole = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    console.log(e.currentTarget.checked);
  };

  return (
    <InnerLayout variants="board" title="유저목록" needBtn={true} btnName="계정등록" iconSrc="/imgs/admin/icons/ic_add.svg">
      <p className="admin-bodyMd-b" style={{ padding: "0 20px" }}>
        총 {checkedRow.length > 0 ? `${checkedRow.length} 건 선택` : `${userList.length} 건`}
      </p>
      <ActionField />
      <BoardLayout>
        <TableHead checkBtnId="state" headList={headList} onChange={toggleAllChecked} checked={allChecked} />
        <div>
          {userList.map((t, i) => {
            const idStr = String(t.id);
            const isChecked = checkedRow.includes(idStr);
            const isSuper = t.role === "super";

            return (
              <div key={t.id} id={idStr} className={`table-content ${allChecked || isChecked ? "active" : ""}`.trim()}>
                <label id={idStr} className="check-box">
                  <CheckBox
                    id={idStr}
                    variants="main"
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCheckedRow(idStr);
                    }}
                    checked={allChecked ? allChecked : isChecked}
                  />
                </label>
                <TextField text={t.name} link={"https://www.naver.com"} withImg={true} src="" />
                <TextField text={t.email} withImg={false} />
                <TextField text={t.position} withImg={false} />
                <TextField text={t.duty} withImg={false} />
                <div className="modal-wrap">
                  <StateLabel
                    text={t.role}
                    variant={isSuper ? "orange" : "purple"}
                    isEdit={true}
                    onClick={() => setOpenEdit((prev) => (prev === idStr ? "" : idStr))}
                  />
                  {openEdit === idStr ? (
                    <ModalLayout variant="edit" changeHeight={i >= 5} title="상태선택" onClick={() => setOpenEdit("")}>
                      <RoleToggle
                        id="roleCheck"
                        checked={selectRole}
                        isSuper={isSuper || selectRole}
                        onChange={(e) => handleCheckedRole(e, t.id)}
                      />

                      <div className={style["info-wrap"]}>
                        <div className={style["info-head"]}>
                          <img src="/imgs/admin/icons/ic_tool-tip.svg" alt="tool-tip" />
                          <p>role</p>
                        </div>
                        <div className={style["info-text"]}>
                          <p>super - 모든 권한 부여</p>
                          <p>admin - 게시글 관리만 가능</p>
                        </div>
                      </div>
                    </ModalLayout>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </BoardLayout>
      <div className="pagenation-wrap">
        <SelectPageCnt value={selected} onChange={setSelected} />
        <Pagenation />
      </div>
    </InnerLayout>
  );
}
