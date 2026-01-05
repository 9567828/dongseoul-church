"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import FieldLayout from "@/components/admin/ui/board/FieldLayout";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import Button from "@/components/admin/ui/button/Button";
import ModalLayout from "@/components/admin/ui/modal/ModalLayout";
import WarningModal from "@/components/admin/ui/modal/WarningModal";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useSortState } from "@/hooks/store/useSortState";
import { useTabStore } from "@/hooks/store/useTabStore";
import { useHooks } from "@/hooks/useHooks";
import { useSelectAllUsers } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { handlers } from "@/utils/handlers";
import { userTapList } from "@/utils/menuList";
import { roleEum } from "@/utils/supabase/sql";
import { useRef, useState } from "react";

const headList = [
  { id: "name", name: "이름", isSort: false },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

type actionMode = "delete" | "state" | "invite";
type changeAction = { key?: string; action: actionMode };

interface IUserList {
  currPage: number;
  listNum: number;
}

export default function UserList({ currPage, listNum }: IUserList) {
  const {
    isActive: { all, active },
  } = useTabStore();
  const { handleCheckedRole, toggleAllChecked, handleAdminInvite } = handlers();
  const { useOnClickOutSide, useRoute, useClearBodyScroll } = useHooks();
  const { sortMap, filterName } = useSortState();

  const { data } = useSelectAllUsers(currPage, listNum, all ? "all" : active ? "active" : "inActive", {
    filter: filterName,
    sort: sortMap[filterName],
  });

  const count = data?.count ?? 0;
  const list = data?.list ?? [];

  const [selected, setSelected] = useState("6");
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState<roleEum | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<changeAction | null>(null);

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = currPage >= 3 ? 3 : 4;

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(modalRef, () => setOpenEdit(""), openModal !== null);
  useClearBodyScroll(openModal);

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === list.length;

  const onChangeRole = (id: string, role: roleEum) => {
    setOpenModal({ key: id, action: "state" });
    handleCheckedRole(role, setSelectRole);
  };

  const handleChangeRole = (id: string) => {
    if (selectRole) {
      // setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: selectRole } : u)));
    }
    setOpenModal(null);
    setOpenEdit("");
  };

  const handleUserDelete = () => {
    if (allChecked) {
      // setUsers([]);
      setCheckedRow([]);
      setOpenModal(null);
      return;
    }

    const checkedIds = checkedRow.map(Number);

    // setUsers((prev) => prev.filter((u) => !checkedIds.includes(Number(u.id))));

    // setCheckedRow((prev) => prev.filter((id) => !checkedIds.includes(Number(id))));
    // setOpenModal(null);
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
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={userTapList} />
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
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, list)}
              checked={list.length <= 0 ? false : allChecked}
            />
            <div>
              {list.map((m, i) => {
                const id = m.id;
                const isChecked = checkedRow.includes(id);
                let role;
                if (!m.admin) {
                  role = "empty";
                } else if (m.admin.role === "super") {
                  role = "super";
                } else {
                  role = "admin";
                }

                return (
                  <TableContent
                    key={id}
                    allChecked={allChecked}
                    isChecked={isChecked}
                    addChecked={true}
                    id={id}
                    toggle={() => toggleCheckedRow(id)}
                  >
                    <TextField text={m.name} link={`/admin/users/${id}`} withImg={true} src={m.avatar} />
                    <TextField text={m.email} withImg={false} />
                    <TextField text={m.position!} withImg={false} />
                    <TextField text={m.duty!} withImg={false} />
                    {role === "empty" ? (
                      <FieldLayout>
                        <Button
                          btnName="관리자초대"
                          variants="small"
                          visual="outline"
                          onClick={() => setOpenModal({ key: m.email, action: "invite" })}
                        />
                      </FieldLayout>
                    ) : (
                      <div className="modal-wrap">
                        <StateLabel
                          text={role}
                          variant={role === "super" ? "orange" : "purple"}
                          isEdit={true}
                          onClick={() => setOpenEdit((prev) => (prev === id ? "" : id))}
                        />
                        {openEdit === id ? (
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
                              role={role as roleEum}
                              onChange={(e) => onChangeRole(m.id, e.target.id as roleEum)}
                            />
                          </ModalLayout>
                        ) : null}
                      </div>
                    )}
                  </TableContent>
                );
              })}
            </div>
          </BoardLayout>
          <div className="pagenation-wrap">
            <SelectPageCnt value={selected} onChange={setSelected} />
            <Pagenation currPage={currPage} listNum={listNum} pagesPerBlock={pagesPerBlock} totalPage={totalPage} />
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
          onConfirm={() => handleChangeRole(openModal.key!)}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "invite" && (
        <WarningModal
          title="관리자계정 초대"
          infoText="해당 유저를 관리자로 초대하시겠습니까?"
          addText="관리자 계정이 되면 관리자페이지로 로그인 가능합니다."
          onConfirm={() => handleAdminInvite(openModal.key!, () => setOpenModal(null))}
          onCancel={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
