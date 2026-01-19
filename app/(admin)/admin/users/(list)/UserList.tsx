"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import EditField from "@/components/admin/ui/board/EditField";
import FieldLayout from "@/components/admin/ui/board/FieldLayout";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt, { pageCnt } from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import Button from "@/components/admin/ui/button/Button";
import Label from "@/components/admin/ui/label/Label";
import ChangeRoleModal from "@/components/admin/ui/modal/ChangeRoleModal";
import DeleteModal from "@/components/admin/ui/modal/DeleteModal";
import InviteModal from "@/components/admin/ui/modal/InviteModal";
import ModalContent from "@/components/admin/ui/modal/layout/ModalContent";
import ModalHead from "@/components/admin/ui/modal/layout/ModalHead";
import ModalLayout from "@/components/admin/ui/modal/layout/ModalLayout";
import ToggleRole from "@/components/admin/ui/toggle-state/ToggleRole";
import { useUserSortStore } from "@/hooks/store/useSortState";
import { useToastStore } from "@/hooks/store/useToastStore";
import { useHooks } from "@/hooks/useHooks";
import { useDeleteUsers, useEditUserRole } from "@/tanstack-query/useMutation/users/useMutationUser";
import { useSelectAllUsers } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { handlers } from "@/utils/handlers";
import { userTapList } from "@/utils/menuList";
import { ISearchParamsInfo, modalActType } from "@/utils/propType";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { MemberEditPayload, roleEum } from "@/utils/supabase/sql";
import { selectAccounts } from "@/utils/supabase/sql/users/select";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Filter from "@/components/admin/ui/filter/Filter";
import { useUserDateFilter } from "@/hooks/store/useDatePickerStore";
import StateView from "@/components/main/ui/state-view/StateView";

const headList = [
  { id: "name", name: "이름", isSort: true },
  { id: "email", name: "이메일", isSort: false },
  { id: "position", name: "직책", isSort: true },
  { id: "duty", name: "사역", isSort: true },
  { id: "role", name: "role", isSort: false },
];

export default function UserList({ currPage, size, tab }: ISearchParamsInfo) {
  const queryClient = useQueryClient();
  const toast = useToastStore();
  const { handleCheckedRole, toggleAllChecked, handleAdminInvite, handlePageSizeQuery, handleDateConfirm } = handlers();
  const { useOnClickOutSide, useRoute, useClearBodyScroll, useResetFilter } = useHooks();
  const { selectHasAdminUsers } = selectAccounts();
  const { sortMap, filterName, toggleSort, resetSort } = useUserSortStore();
  const { applyDate, setDraftRange, draftRange, applyRange, resetAllDates, resetDraft } = useUserDateFilter();
  const { mutate: editRole } = useEditUserRole();
  const { mutate } = useDeleteUsers();
  const [searchSubmit, setSearchSubmit] = useState("");

  const { data, isLoading } = useSelectAllUsers(
    currPage,
    size,
    tab!,
    {
      filter: filterName,
      sort: sortMap[filterName],
    },
    { startDate: applyRange.startDate, endDate: applyRange.endDate, isOneDay: applyRange.isOneDay },
    searchSubmit,
  );

  const count = data?.count ?? 0;
  const list = data?.list ?? [];

  const [selected, setSelected] = useState(pageCnt[0]);
  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [selectRole, setSelectRole] = useState<roleEum | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<modalActType | null>(null);

  useResetFilter(() => {
    resetAllDates();
    resetSort();
  });

  const modalRef = useRef<HTMLDivElement>(null);
  // useOnClickOutSide(modalRef, () => setOpenEdit(""), openModal !== null);
  useClearBodyScroll(openModal);

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === list.length;

  const onChangeRole = (id: string, role: roleEum) => {
    setOpenModal({ key: id, action: "state" });
    handleCheckedRole(role, setSelectRole);
  };

  const handleUserDelete = async () => {
    const supabase = createBrowClient();

    const result = await selectHasAdminUsers(checkedRow, supabase);

    if (result) {
      if (!confirm(`관리자 계정이 포함 되어있습니다. 삭제를 계속 진행하시겠습니까?\n삭제 시 로그인이 불가능합니다.`)) {
        return;
      }
    }

    mutate(
      { ids: checkedRow },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["members"],
          });
          setCheckedRow([]);
          setOpenModal(null);
          toast.success("유저 삭제 성공 되었습니다.");
        },
        onError: (err) => {
          toast.error("유저 삭제 실패 되었습니다.");
          console.log(err);
        },
      },
    );
  };

  return (
    <>
      <InnerLayout
        mode="default"
        title="교인목록"
        needBtn={true}
        btnName="계정등록"
        onClick={() => useRoute(`/admin/users/add`)}
        iconSrc="/imgs/admin/icons/ic_add.svg"
      >
        <WhitePanel variants="board">
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={userTapList} size={size} tab={tab!} />
          <ActionField
            onFilter={() => setOpenModal({ action: "filter" })}
            checks={checkedRow.length}
            onDelete={() => setOpenModal({ action: "delete" })}
            setState={setSearchSubmit}
          />
          <BoardLayout>
            <TableHead
              checkBtnId="state"
              headList={headList}
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, list)}
              checked={list.length <= 0 ? false : allChecked}
              listNum={size}
              tab={tab!}
              sortMap={sortMap}
              onClick={toggleSort}
            />
            <div>
              {isLoading ? (
                <StateView text="로딩중" />
              ) : list.length <= 0 ? (
                <StateView text="목록 없음" />
              ) : (
                list.map((m, i) => {
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
                      <TextField text={m.name} link={`/admin/users/${id}`} withImg={true} src={m.avatar_url} />
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
                        <EditField>
                          <StateLabel
                            text={role}
                            variant={role === "super" ? "orange" : "purple"}
                            isEdit={true}
                            onClick={() => setOpenEdit((prev) => (prev === id ? "" : id))}
                          />
                          {openEdit === id ? (
                            <ModalLayout variant="row" changeBottm={i >= 5} modalRef={modalRef} left="-100px">
                              <ModalHead title="상태선택" fontType="admin-bodySm-b" onClose={() => setOpenEdit("")} />
                              <ModalContent>
                                <ToggleRole
                                  mode="list"
                                  variant="vertical"
                                  role={role as roleEum}
                                  onChange={(e) => onChangeRole(m.admin_user!, e.target.id as roleEum)}
                                />
                              </ModalContent>
                            </ModalLayout>
                          ) : null}
                        </EditField>
                      )}
                    </TableContent>
                  );
                })
              )}
            </div>
          </BoardLayout>
          <div className="pagenation-wrap">
            <SelectPageCnt value={selected} onChange={setSelected} tab={tab!} />
            <Pagenation currPage={currPage} listNum={size} count={count} tab={tab} />
          </div>
        </WhitePanel>
      </InnerLayout>
      {openModal?.action === "delete" && (
        <DeleteModal
          title={`유저 ${checkedRow.length}건 삭제`}
          onConfirm={handleUserDelete}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "state" && (
        <ChangeRoleModal
          role={selectRole!}
          onConfirm={() => {
            const newObj: MemberEditPayload = {
              payload: {
                updated_at: new Date().toISOString(),
              },
              role: selectRole!,
              uid: openModal.key!,
              memId: "",
            };

            editRole(newObj, {
              onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries({
                  queryKey: ["member", openModal.key],
                });
                queryClient.invalidateQueries({
                  queryKey: ["members", "all"],
                });
                toast.success("변경이 완료 되었습니다.");
                setOpenModal(null);
              },
              onError: (err) => {
                toast.error("변경이 실패 되었습니다.");
                console.log(err);
              },
            });
          }}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "invite" && (
        <InviteModal
          onConfirm={() => handleAdminInvite(openModal.key!, () => setOpenModal(null))}
          onCancel={() => setOpenModal(null)}
        />
      )}
      {openModal?.action === "filter" && (
        <Filter
          onDraftRange={setDraftRange}
          applyRange={applyRange}
          onReset={resetDraft}
          onClose={() => {
            setOpenModal(null);
          }}
          onConfirm={() => {
            const query = handlePageSizeQuery("1", String(size), tab!);

            handleDateConfirm(draftRange.startDate!, draftRange.endDate!, () => {
              useRoute(query);
              applyDate();
              setOpenModal(null);
            });
          }}
        />
      )}
    </>
  );
}
