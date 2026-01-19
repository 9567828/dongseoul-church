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
import ChangeShowModal from "@/components/admin/ui/modal/ChangeShowModal";
import WarningChangeShow from "@/components/admin/ui/modal/WarningChangeShow";
import StateView from "@/components/main/ui/state-view/StateView";
import { useSermonSortStore } from "@/hooks/store/useSortState";
import { useToastStore } from "@/hooks/store/useToastStore";
import { useAddYoutubeMutation } from "@/tanstack-query/useMutation/boards/useMutationBoard";
import { useEditShow } from "@/tanstack-query/useMutation/boards/useMutationShow";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";
import { useGetLatestUpdateUser, useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { handlers } from "@/utils/handlers";
import { boardTapList } from "@/utils/menuList";
import { ISearchParamsInfo, modalActType, YoutubeApiItem } from "@/utils/propType";
import { AddYoutubePayload, ChangeShowPayload, SermonWithName } from "@/utils/supabase/sql";
import { showStateType } from "@/utils/supabase/sql/boards/select";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSermonDateFilter } from "@/hooks/store/useDatePickerStore";
import Filter from "@/components/admin/ui/filter/Filter";
import { useHooks } from "@/hooks/useHooks";
import { request } from "@/lib/api";

const headList: tableHeadType[] = [
  { id: "thumbnail", name: "썸네일", isSort: false, width: "80px" },
  { id: "title", name: "제목", isSort: true },
  { id: "youtube_url", name: "유튜브 링크", isSort: false },
  { id: "is_show", name: "상태", isSort: false },
  { id: "origin_writer", name: "작성", isSort: false },
  { id: "edit_writer", name: "수정", isSort: false },
  { id: "published_date", name: "업로드날짜", isSort: true },
];

export default function YoutubeList({ currPage, size, tab }: ISearchParamsInfo) {
  const GRID = "72px 80px 1fr 1fr repeat(3, auto) 150px";
  const queryClient = useQueryClient();
  const toast = useToastStore();
  const { useResetFilter, useRoute } = useHooks();
  const { toggleAllChecked, handleCheckedIsShow, handlePageSizeQuery, handleDateConfirm } = handlers();
  const { sortMap, filterName, toggleSort, resetSort } = useSermonSortStore();
  const { applyDate, resetAllDates, resetDraft, setDraftRange, applyRange, draftRange } = useSermonDateFilter();
  const { mutate: addMutate } = useAddYoutubeMutation();
  const { mutate: editShow } = useEditShow();
  const [submitSearch, setSubmitSearch] = useState("");
  const { data: mem } = useSelectLogginUser();

  const { data: user, isLoading: userLoading } = useGetLatestUpdateUser<SermonWithName>("sermons");

  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<SermonWithName>(
    "sermons",
    size,
    currPage,
    tab === "all" ? "all" : tab === "active" ? "show" : "noShow",
    { filter: filterName, sort: sortMap[filterName] },
    { startDate: applyRange.startDate, endDate: applyRange.endDate, isOneDay: applyRange.isOneDay },
    submitSearch,
  );

  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(pageCnt[0]);
  const [isShow, setIsShow] = useState<showStateType | null>(null);
  const [openEdit, setOpenEdit] = useState("");
  const [openModal, setOpenModal] = useState<modalActType | null>(null);

  useResetFilter(() => {
    resetAllDates();
    resetSort();
  });

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === list.length;

  const getYoutube = async () => {
    const req = await request({ method: "GET", url: "/getYoutube" });

    const {
      result: { items },
    } = req;

    const videos: AddYoutubePayload[] = items.map((t: YoutubeApiItem) => ({
      title: t.snippet.title,
      video_id: t.id.videoId,
      youtube_url: `https://www.youtube.com/watch?v=${t.id.videoId}`,
      published_date: t.snippet.publishedAt,
      thumbnail: t.snippet.thumbnails.high.url,
      description: t.snippet.description,
    }));

    addMutate(
      { payload: videos, memId: mem?.id! },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["sermons"],
          });
          toast.success("가져오기가 완료 되었습니다.");
        },
        onError: (error) => {
          console.error(error);
          toast.error("가져오기가 실패 되었습니다.");
        },
      },
    );
  };

  const handleEditShow = () => {
    const newObj: ChangeShowPayload = {
      payload: {
        updated_at: new Date().toISOString(),
        is_Show: isShow!,
        edit_writer: mem?.id!,
      },
      id: openModal?.key!,
      name: "sermons",
    };

    editShow(newObj, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("변경 완료 되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["sermons"],
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

  return (
    <>
      <InnerLayout
        mode="default"
        title="말씀영상 목록"
        needBtn={true}
        btnName="유튜브 가져오기"
        iconSrc="/imgs/admin/icons/ic_refresh.svg"
        onClick={getYoutube}
        sub1={`마지막 동기화: ${formatDateTime(user?.updated_at!)}`}
      >
        <WhitePanel variants="board">
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={boardTapList} size={size} tab={tab!} />
          <ActionField needDel={false} onFilter={() => setOpenModal({ action: "filter" })} setState={setSubmitSearch} />
          <BoardLayout>
            <TableHead
              listNum={size}
              tab={tab!}
              onClick={toggleSort}
              sortMap={sortMap}
              checkBtnId="state"
              gridCol={GRID}
              headList={headList}
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, list)}
              checked={list.length <= 0 ? false : allChecked}
            />
            {isLoading && userLoading ? (
              <StateView text="로딩중" />
            ) : list.length <= 0 ? (
              <StateView text="게시글 없음" />
            ) : (
              list.map((t, i) => {
                const idStr = String(t.id);
                const isChecked = checkedRow.includes(idStr);
                const state = t.is_show ? "노출" : "비노출";
                const showType: showStateType = state === "노출" ? "show" : "noShow";

                const editor = t.edit_writer !== null ? t.editor.name : "-";

                return (
                  <TableContent
                    key={t.id}
                    grid={GRID}
                    allChecked={allChecked}
                    isChecked={isChecked}
                    addChecked={true}
                    id={idStr}
                    toggle={() => toggleCheckedRow(idStr)}
                  >
                    <ThumbNail src={t.thumbnail!} alt={t.title!} />
                    <TextField text={t.title!} withImg={false} />
                    <TextField text={t.youtube_url!} withImg={false} link={t.youtube_url!} isBlank />
                    <EditField>
                      <StateLabel
                        text={t.is_show ? "노출" : "비노출"}
                        variant={t.is_show ? "green" : "red"}
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
                          checked={state === "노출"}
                          onChange={(e) =>
                            handleCheckedIsShow(e.target.id, setIsShow, () =>
                              setOpenModal({ key: idStr, action: "state" }),
                            )
                          }
                        />
                      )}
                    </EditField>
                    <TextField text={t.origin.name!} withImg={false} />
                    <TextField text={editor!} withImg={false} />
                    <TextField text={formatDate(t.published_date!)} withImg={false} />
                  </TableContent>
                );
              })
            )}
          </BoardLayout>
          <PagenationWrapper>
            <SelectPageCnt value={pageSize} onChange={setPageSize} tab={tab!} />
            <Pagenation currPage={currPage} listNum={Number(pageSize)} count={count} tab={tab} />
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
