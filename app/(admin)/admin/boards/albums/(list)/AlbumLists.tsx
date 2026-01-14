"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import EditField from "@/components/admin/ui/board/EditField";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import PagenationWrapper from "@/components/admin/ui/board/PageNationWrapper";
import SelectPageCnt, { pageCnt } from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead, { tableHeadType } from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import ThumbNail from "@/components/admin/ui/board/ThumbNail";
import StateView from "@/components/main/ui/state-view/StateView";
import { useAlbumSortStore } from "@/hooks/store/useSortState";
import { useHooks } from "@/hooks/useHooks";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDate } from "@/utils/formatDate";
import { handlers } from "@/utils/handlers";
import { boardTapList } from "@/utils/menuList";
import { ISearchParamsInfo, modalActType } from "@/utils/propType";
import { AlbumWithName, ChangeShowPayload } from "@/utils/supabase/sql";
import { getAlbumImgURL } from "@/utils/supabase/sql/storage/storage";
import { useState } from "react";
import style from "../_components/album.module.scss";
import ChangeShowModal from "@/components/admin/ui/modal/ChangeShowModal";
import WarningChangeShow from "@/components/admin/ui/modal/WarningChangeShow";
import { showStateType } from "@/utils/supabase/sql/boards/select";
import { useEditShow } from "@/tanstack-query/useMutation/boards/useMutationShow";
import { useToastStore } from "@/hooks/store/useToastStore";
import { useQueryClient } from "@tanstack/react-query";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";
import DeleteModal from "@/components/admin/ui/modal/DeleteModal";
import { useDeleteAlbums } from "@/tanstack-query/useMutation/boards/useMutationAlbum";

const headList: tableHeadType[] = [
  { id: "thumbnail", name: "썸네일", isSort: false },
  { id: "title", name: "제목", isSort: true },
  { id: "is_show", name: "상태", isSort: false },
  { id: "origin_writer", name: "작성자", isSort: false },
  { id: "edit_writer", name: "수정자", isSort: false },
  { id: "created_at", name: "등록날짜", isSort: true },
];

export default function AlbumLists({ currPage, listNum, tab }: ISearchParamsInfo) {
  const queryClient = useQueryClient();
  const { filterName, sortMap, toggleSort } = useAlbumSortStore();
  const { toggleAllChecked, toggleCheckedRow, handleCheckedIsShow } = handlers();
  const { useRoute } = useHooks();
  const { data: member } = useSelectLogginUser();
  const { mutate: edit } = useEditShow();
  const { mutate: delAlbum } = useDeleteAlbums();
  const toast = useToastStore();

  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<AlbumWithName>(
    "albums",
    listNum,
    currPage,
    tab === "all" ? "all" : tab === "active" ? "show" : "noShow",
    { filter: filterName, sort: sortMap[filterName] }
  );

  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(pageCnt[0]);
  const [openEdit, setOpenEdit] = useState("");
  const [isShow, setIsShow] = useState<showStateType | null>(null);
  const [openModal, setOpenModal] = useState<modalActType | null>(null);

  const allChecked = checkedRow.length === list.length;

  const onChangeShow = (state: string, id: string) => {
    if (state === "show") {
      setIsShow("noShow");
    } else {
      setIsShow("show");
    }
    setOpenModal({ key: id, action: "state" });
  };

  const handleEditShow = () => {
    const newObj: ChangeShowPayload = {
      payload: {
        updated_at: new Date().toISOString(),
        is_Show: isShow!,
        edit_writer: member?.id!,
      },
      id: openModal?.key!,
      name: "albums",
    };

    edit(newObj, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("변경 완료 되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["albums"],
        });

        setOpenEdit("");
        setOpenModal(null);
      },
      onError: (err) => {
        console.error(err);
        toast.success("변경 실패 되었습니다.");
      },
    });
  };

  const handleDeleteAlbum = () => {
    delAlbum(checkedRow, {
      onSuccess: (data) => {
        toast.success("선택하신 사진이 삭제 되었습니다.");
        setOpenModal(null);
        queryClient.invalidateQueries({
          queryKey: ["albums"],
        });
      },
      onError: (error) => {
        toast.error("삭제 오류 입니다.");
      },
    });
  };

  return (
    <>
      <InnerLayout
        mode="default"
        title="앨범목록"
        needBtn={true}
        btnName="사진등록"
        iconSrc="/imgs/admin/icons/ic_plus.svg"
        onClick={() => useRoute("/admin/boards/albums/add", true)}
      >
        <WhitePanel variants="board">
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={boardTapList} size={listNum} tab={tab!} />
          <ActionField checks={checkedRow.length} onDelete={() => setOpenModal({ action: "delete" })} />
          <BoardLayout>
            <TableHead
              headList={headList}
              checkBtnId="state"
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, list)}
              checked={list.length <= 0 ? false : allChecked}
              listNum={listNum}
              tab={tab!}
              sortMap={sortMap}
              onClick={toggleSort}
              gridCol="72px 80px 1fr auto auto auto 150px"
            />

            {isLoading ? (
              <StateView text="로딩중" />
            ) : list.length <= 0 ? (
              <StateView text="게시글 없음" />
            ) : (
              list.map((t, i) => {
                const idStr = String(t.id);
                const isChecked = checkedRow.includes(idStr);
                const state = t.is_show === true ? "노출" : "비노출";
                const showType: showStateType = state === "노출" ? "show" : "noShow";
                let editor = "없음";
                if (t.edit_writer !== null) {
                  editor = t.editor.name!;
                }

                const url = getAlbumImgURL(t.src!);

                return (
                  <TableContent
                    key={t.id}
                    grid="72px 80px 1fr auto auto auto 150px"
                    allChecked={allChecked}
                    isChecked={isChecked}
                    addChecked={true}
                    id={idStr}
                    toggle={() => toggleCheckedRow(idStr, setCheckedRow)}
                  >
                    <ThumbNail src={url} alt={t.title!} />
                    <TextField text={t.title!} withImg={false} link={`/admin/boards/albums/${t.id}`} />
                    <EditField>
                      <StateLabel
                        text={state}
                        variant={state === "노출" ? "green" : "red"}
                        isEdit
                        onClick={() => setOpenEdit((prev) => (prev === idStr ? "" : idStr))}
                      />
                      {openEdit === idStr && (
                        <ChangeShowModal
                          id={showType}
                          labelText={state}
                          index={i}
                          variant={state === "노출" ? "green" : "red"}
                          onClose={() => setOpenEdit("")}
                          checked={state === "노출" ? true : false}
                          onChange={(e) =>
                            handleCheckedIsShow(e.target.id, setIsShow, () => setOpenModal({ key: idStr, action: "state" }))
                          }
                        />
                      )}
                    </EditField>
                    <TextField text={t.origin.name!} withImg={false} />
                    <TextField text={editor} withImg={false} />
                    <TextField text={formatDate(t.created_at)} withImg={false} />
                  </TableContent>
                );
              })
            )}
          </BoardLayout>
          <PagenationWrapper>
            <SelectPageCnt tab={tab!} onChange={setPageSize} value={pageSize} />
            <Pagenation currPage={currPage} listNum={listNum} count={count} tab={tab} />
          </PagenationWrapper>
        </WhitePanel>
      </InnerLayout>
      {openModal?.action === "state" && (
        <WarningChangeShow
          state={isShow}
          onConfirm={handleEditShow}
          onCancel={() => {
            setOpenEdit("");
            setOpenModal(null);
          }}
        />
      )}
      {openModal?.action === "delete" && (
        <DeleteModal
          title={`사진 ${checkedRow.length}건 삭제`}
          onConfirm={handleDeleteAlbum}
          onCancel={() => setOpenModal(null)}
        />
      )}
    </>
  );
}
