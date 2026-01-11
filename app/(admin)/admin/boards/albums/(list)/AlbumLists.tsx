"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import PagenationWrapper from "@/components/admin/ui/board/PageNationWrapper";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
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
import { ISearchParamsInfo } from "@/utils/propType";
import { AlbumRow, AlbumWithName } from "@/utils/supabase/sql";
import { getAlbumImgURL } from "@/utils/supabase/sql/storage/storage";
import { useState } from "react";

const headList: tableHeadType[] = [
  { id: "thumbnail", name: "썸네일", isSort: false },
  { id: "title", name: "제목", isSort: true },
  { id: "is_show", name: "상태", isSort: false },
  { id: "writer", name: "작성자", isSort: false },
  { id: "created_at", name: "등록날짜", isSort: true },
];

export default function AlbumLists({ currPage, listNum, tab }: ISearchParamsInfo) {
  const { filterName, sortMap, toggleSort } = useAlbumSortStore();
  const { toggleAllChecked, toggleCheckedRow } = handlers();
  const { useRoute } = useHooks();
  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<AlbumWithName>(
    "albums",
    listNum,
    currPage,
    tab === "all" ? "all" : tab === "active" ? "show" : "noShow",
    { filter: filterName, sort: sortMap[filterName] }
  );

  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("6");
  const allChecked = checkedRow.length === list.length;

  return (
    <InnerLayout
      mode="withFooter"
      title="앨범목록"
      needBtn={true}
      btnName="사진등록"
      iconSrc="/imgs/admin/icons/ic_plus.svg"
      onClick={() => useRoute("/admin/boards/albums/add")}
    >
      <WhitePanel variants="board">
        <ListCount checkedLength={checkedRow.length} count={count} />
        <BoardTap list={boardTapList} size={listNum} tab={tab!} />
        <ActionField onDelete={() => console.log("삭제 클릭")} />
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
            gridCol="72px 80px 1fr auto auto 150px"
          />

          {isLoading ? (
            <StateView text="로딩중" />
          ) : list.length <= 0 ? (
            <StateView text="게시글 없음" />
          ) : (
            list.map((t) => {
              const idStr = String(t.id);
              const isChecked = checkedRow.includes(idStr);
              const state = t.is_show === true ? "노출" : "비노출";

              const url = getAlbumImgURL(t.src!);

              return (
                <TableContent
                  key={t.id}
                  grid="72px 80px 1fr auto auto 150px"
                  allChecked={allChecked}
                  isChecked={isChecked}
                  addChecked={true}
                  id={idStr}
                  toggle={() => toggleCheckedRow(idStr, setCheckedRow)}
                >
                  <ThumbNail src={url} alt={t.title!} />
                  <TextField text={t.title!} withImg={false} link={`/admin/boards/albums/${t.id}`} />
                  <StateLabel text={state} variant={state === "노출" ? "green" : "red"} />
                  <TextField text={t.displayName?.name!} withImg={false} />
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
  );
}
