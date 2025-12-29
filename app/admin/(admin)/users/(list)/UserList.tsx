"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import CheckBox from "@/components/admin/ui/check-box/CheckBox";
import ModalLayout from "@/components/admin/ui/modal/ModalLayout";
import WarningModal from "@/components/admin/ui/modal/WarningModal";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useHooks } from "@/hooks/useHooks";
import { handlers } from "@/utils/handlers";
import { roleType, userListArr } from "@/utils/propType";
import { useRef, useState } from "react";

const headList = [
  { id: "name", name: "이름", isSort: false },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

type actionMode = "delete" | "state";
type changeAction = { id?: number; action: actionMode };

export default function UserList() {
  const { handleCheckedRole, toggleAllChecked } = handlers();
  const { useOnClickOutSide, useRoute, useClearBodyScroll } = useHooks();
  const [users, setUsers] = useState(userListArr);
  const [selected, setSelected] = useState("6");
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState<roleType | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<changeAction | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(modalRef, () => setOpenEdit(""), openModal !== null);
  useClearBodyScroll(openModal);

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === users.length;

  const onChangeRole = (id: number, role: roleType) => {
    setOpenModal({ id, action: "state" });
    handleCheckedRole(role, setSelectRole);
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
        title="신도목록"
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
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, users)}
              checked={users.length <= 0 ? false : allChecked}
            />
            <div>
              {users.map((t, i) => {
                const idStr = String(t.id);
                const isChecked = checkedRow.includes(idStr);
                const isSuper = t.role === "super";
                const isAdmin = t.role === "admin";

                return (
                  <TableContent
                    key={t.id}
                    allChecked={allChecked}
                    isChecked={isChecked}
                    addChecked={true}
                    id={idStr}
                    toggle={() => toggleCheckedRow(idStr)}
                  >
                    <TextField text={t.name} link={`/admin/users/${t.id}`} withImg={true} src="" />
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
                          // index가 5번째 보다 크면
                          changeHeight={i >= 5}
                          title="상태선택"
                          onClick={() => setOpenEdit("")}
                        >
                          <ToggleRole
                            mode="list"
                            variant="vertical"
                            role={t.role as roleType}
                            onChange={(e) => onChangeRole(t.id, e.target.id as roleType)}
                          />
                        </ModalLayout>
                      ) : null}
                    </div>
                  </TableContent>
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
