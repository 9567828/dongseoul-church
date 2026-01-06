"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap, { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import FieldLayout from "@/components/admin/ui/board/FieldLayout";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import Button from "@/components/admin/ui/button/Button";
import Label from "@/components/admin/ui/label/Label";
import ChangeRoleModal from "@/components/admin/ui/modal/ChangeRoleModal";
import DeleteUserModal from "@/components/admin/ui/modal/DeleteUserModal";
import InviteModal from "@/components/admin/ui/modal/InviteModal";
import ModalLayout from "@/components/admin/ui/modal/ModalLayout";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useSortState } from "@/hooks/store/useSortState";
import { useTabStore } from "@/hooks/store/useTabStore";
import { useHooks } from "@/hooks/useHooks";
import { useSelectAllUsers } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { handlers } from "@/utils/handlers";
import { userTapList } from "@/utils/menuList";
import { modalActType } from "@/utils/propType";
import { roleEum } from "@/utils/supabase/sql";
import { useEffect, useRef, useState } from "react";

const headList = [
  { id: "name", name: "이름", isSort: false },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

interface IUserList {
  currPage: number;
  listNum: number;
  tab: tabStatusType;
}

export default function UserList({ currPage, listNum, tab }: IUserList) {
  const { handleCheckedRole, toggleAllChecked, handleAdminInvite, handleChangeRole, handlePageSizeQuery } = handlers();
  const { useOnClickOutSide, useRoute, useClearBodyScroll } = useHooks();
  const { sortMap, filterName } = useSortState();

  const { data } = useSelectAllUsers(currPage, listNum, tab, {
    filter: filterName,
    sort: sortMap[filterName],
  });

  const count = data?.count ?? 0;
  const list = data?.list ?? [];

  const [selected, setSelected] = useState("6");
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState<roleEum | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<modalActType | null>(null);

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
          <BoardTap list={userTapList} size={listNum} tab={tab} />
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
                } else if (m.admin.role === "admin") {
                  role = "admin";
                } else {
                  role = "pending";
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
                    ) : role === "pending" ? (
                      <FieldLayout>
                        <Label variant="green" text="초대대기중" />
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
            <SelectPageCnt value={selected} onChange={setSelected} tab={tab} />
            <Pagenation currPage={currPage} listNum={listNum} pagesPerBlock={pagesPerBlock} totalPage={totalPage} tab={tab} />
          </div>
        </WhitePanel>
      </InnerLayout>
      {openModal?.action === "delete" && (
        <DeleteUserModal
          variant="list"
          nums={checkedRow.length}
          onConfirm={() => handleUserDelete()}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "state" && (
        <ChangeRoleModal
          role={selectRole!}
          onConfirm={() =>
            handleChangeRole(openModal.key!, selectRole!, () => {
              setOpenModal(null);
              setOpenEdit("");
            })
          }
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "invite" && (
        <InviteModal
          onConfirm={() => handleAdminInvite(openModal.key!, () => setOpenModal(null))}
          onCancel={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
