"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import ModalLayout from "@/components/admin/ui/modal/ModalLayout";
import WarningModal from "@/components/admin/ui/modal/WarningModal";
import RoleInfo from "@/components/admin/ui/role-info/RoleInfo";
import ToggleOption from "@/components/admin/ui/toggle-state/ToggleOption";
import ToggleState from "@/components/admin/ui/toggle-state/ToggleState";
import { useHooks } from "@/hooks/useHooks";
import { ChangeEvent, useRef, useState } from "react";

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
  { id: 4, name: "홍길동", src: "", email: "123@naver.com", position: "부목사", duty: "청년부", role: "nomal" },
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

type actionMode = "delete" | "state";
type changeAction = { id?: number; action: actionMode };

export default function UserList() {
  const { useOnClickOutSide, useRoute, useClearBodyScroll } = useHooks();
  const [users, setUsers] = useState(userList);
  const [selected, setSelected] = useState("6");
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState<"super" | "admin" | "nomal" | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<changeAction | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(modalRef, () => setOpenEdit(""), openModal !== null);
  useClearBodyScroll(openModal);

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === users.length;

  const toggleAllChecked = () => {
    if (allChecked) {
      setCheckedRow([]);
    } else {
      setCheckedRow(users.map((v) => String(v.id)));
    }
  };

  const handleCheckedRole = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setOpenModal({ id, action: "state" });
    const checkedId = e.target.id;
    console.log(checkedId);
    if (checkedId === "super") {
      setSelectRole("super");
    } else if (checkedId === "admin") {
      setSelectRole("admin");
    } else {
      setSelectRole("nomal");
    }
  };

  const handleChangeRole = (id: number) => {
    if (selectRole) {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: selectRole } : u)));
    }
    setOpenModal(null);
    setOpenEdit("");
  };

  const handleUserDelete = () => {
    if (allChecked) {
      setUsers([]);
      setCheckedRow([]);
      setOpenModal(null);
      return;
    }

    const checkedIds = checkedRow.map(Number);

    setUsers((prev) => prev.filter((u) => !checkedIds.includes(u.id)));

    setCheckedRow((prev) => prev.filter((id) => !checkedIds.includes(Number(id))));
    setOpenModal(null);
  };

  return (
    <>
      <InnerLayout
        mode="default"
        title="유저목록"
        needBtn={true}
        btnName="계정등록"
        onClick={() => useRoute(`/admin/users/add`)}
        iconSrc="/imgs/admin/icons/ic_add.svg"
      >
        <WhitePanel variants="board">
          <p className="admin-bodyMd-b" style={{ padding: "0 20px" }}>
            총 {checkedRow.length > 0 ? `${checkedRow.length} 건 선택` : `${users.length} 건`}
          </p>
          <ActionField
            onDelete={() => {
              if (checkedRow.length < 1) {
                alert("삭제할 데이터를 선택해 주세요");
                return;
              }
              setOpenModal({ action: "delete" });
            }}
          />
          <BoardLayout>
            <TableHead
              checkBtnId="state"
              headList={headList}
              onChange={toggleAllChecked}
              checked={users.length <= 0 ? false : allChecked}
            />
            <div>
              {users.map((t, i) => {
                const idStr = String(t.id);
                const isChecked = checkedRow.includes(idStr);
                const isSuper = t.role === "super";
                const isAdmin = t.role === "admin";

                return (
                  <div key={t.id} className={`table-content ${allChecked || isChecked ? "active" : ""}`.trim()}>
                    <label htmlFor={idStr} className="check-box">
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
                        variant={isSuper ? "orange" : isAdmin ? "purple" : "yellow"}
                        isEdit={true}
                        onClick={() => setOpenEdit((prev) => (prev === idStr ? "" : idStr))}
                      />
                      {openEdit === idStr ? (
                        <ModalLayout
                          modalRef={modalRef}
                          variant="edit"
                          changeHeight={i >= 5}
                          title="상태선택"
                          onClick={() => setOpenEdit("")}
                        >
                          <ToggleState>
                            <ToggleOption
                              inputName="role"
                              state="super"
                              checked={isSuper ? true : false}
                              onChange={(e) => handleCheckedRole(e, t.id)}
                            />
                            <ToggleOption
                              inputName="role"
                              state="admin"
                              checked={isAdmin ? true : false}
                              onChange={(e) => handleCheckedRole(e, t.id)}
                            />
                            <ToggleOption
                              inputName="role"
                              state="nomal"
                              checked={t.role === "nomal" ? true : false}
                              onChange={(e) => handleCheckedRole(e, t.id)}
                            />
                          </ToggleState>
                          <RoleInfo />
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
        </WhitePanel>
      </InnerLayout>
      {openModal?.action === "delete" && (
        <WarningModal
          title={`유저 ${checkedRow.length}건 삭제`}
          infoText="정말 삭제하시겠습니까?"
          addText="삭제 후 복구가 불가능 합니다."
          onConfirm={() => handleUserDelete()}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "state" && (
        <WarningModal
          title="유저 role 변경"
          infoText={`해당 유저를 ${selectRole}${selectRole === "super" ? "로" : "으로"} 변경 하시겠습니까?`}
          onConfirm={() => handleChangeRole(openModal.id!)}
          onCancel={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
