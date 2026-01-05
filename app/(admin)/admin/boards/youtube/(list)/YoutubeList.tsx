"use client";

import InnerLayout from "@/components/admin/layouts/inner-layout/InnerLayout";
import WhitePanel from "@/components/admin/layouts/white-panel/WhitePanel";
import ActionField from "@/components/admin/ui/board/ActionField";
import BoardLayout from "@/components/admin/ui/board/BoardLayout";
import BoardTap from "@/components/admin/ui/board/BoardTab";
import ListCount from "@/components/admin/ui/board/ListCount";
import Pagenation from "@/components/admin/ui/board/Pagenation";
import SelectPageCnt from "@/components/admin/ui/board/SelectPageCnt";
import StateLabel from "@/components/admin/ui/board/StateLabel";
import TableContent from "@/components/admin/ui/board/TableContent";
import TableHead, { tableHeadType } from "@/components/admin/ui/board/TableHead";
import TextField from "@/components/admin/ui/board/TextField";
import ThumbNail from "@/components/admin/ui/board/ThumbNail";
import StateView from "@/components/main/ui/state-view/StateView";
import { useTabStore } from "@/hooks/store/useTabStore";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDate } from "@/utils/formatDate";
import { handlers } from "@/utils/handlers";
import { boardTapList } from "@/utils/menuList";
import { ISearchParamsInfo } from "@/utils/propType";
import { SermonRow } from "@/utils/supabase/sql";
import { useEffect, useState } from "react";

const headList: tableHeadType[] = [
  { id: "thumbnail", name: "썸네일", isSort: false, width: "80px" },
  { id: "title", name: "제목", isSort: false },
  { id: "link", name: "유튜브 링크", isSort: false },
  { id: "state", name: "상태", isSort: true },
  { id: "date", name: "업로드날짜", isSort: true },
];

export default function YoutubeList({ currPage, listNum }: ISearchParamsInfo) {
  const { toggleAllChecked } = handlers();
  const {
    isActive: { all, active },
  } = useTabStore();

  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState(String(listNum));

  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<SermonRow>(
    "sermons",
    Number(pageSize),
    currPage,
    all ? "all" : active ? "show" : "noShow"
  );

  const toggleCheckedRow = (id: string) => {
    setCheckedRow((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const allChecked = checkedRow.length === list.length;

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = currPage >= 3 ? 3 : 4;

  return (
    <InnerLayout
      mode="default"
      title="말씀영상 목록"
      needBtn={true}
      btnName="유튜브 가져오기"
      iconSrc="/imgs/admin/icons/ic_refresh.svg"
    >
      {isLoading ? (
        <StateView text="로딩중" />
      ) : list.length <= 0 ? (
        <StateView text="게시글 없음" />
      ) : (
        <WhitePanel variants="board">
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={boardTapList} />
          <ActionField onDelete={() => console.log("삭제 클릭")} />
          <BoardLayout>
            <TableHead
              checkBtnId="state"
              gridCol="72px 80px 1fr 1fr auto 150px"
              headList={headList}
              onChange={() => toggleAllChecked(allChecked, setCheckedRow, list)}
              checked={list.length <= 0 ? false : allChecked}
            />
            {list.map((t) => {
              const idStr = String(t.id);
              const isChecked = checkedRow.includes(idStr);
              return (
                <TableContent
                  key={t.id}
                  grid="72px 80px 1fr 1fr auto 150px"
                  allChecked={allChecked}
                  isChecked={isChecked}
                  addChecked={true}
                  id={idStr}
                  toggle={() => toggleCheckedRow(idStr)}
                >
                  <ThumbNail src={t.thumbnail!} alt={t.title!} />
                  <TextField text={t.title!} withImg={false} />
                  <TextField text={t.youtube_URL!} withImg={false} link={t.youtube_URL!} isBlank />
                  <StateLabel text={t.is_show ? "노출" : "비노출"} variant={t.is_show ? "green" : "red"} isEdit />
                  <TextField text={formatDate(t.created_at)} withImg={false} />
                </TableContent>
              );
            })}
          </BoardLayout>
          <div className="pagenation-wrap">
            <SelectPageCnt value={pageSize} onChange={setPageSize} />
            <Pagenation currPage={currPage} listNum={Number(pageSize)} pagesPerBlock={pagesPerBlock} totalPage={totalPage} />
          </div>
        </WhitePanel>
      )}
    </InnerLayout>
  );
}
