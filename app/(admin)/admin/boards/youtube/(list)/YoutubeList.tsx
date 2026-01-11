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
import { useSermonSortStore } from "@/hooks/store/useSortState";
import { request } from "@/lib/api";
import { useAddYoutubeMutation } from "@/tanstack-query/useMutation/boards/youtube/useMutationBoard";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { formatDate } from "@/utils/formatDate";
import { handlers } from "@/utils/handlers";
import { boardTapList } from "@/utils/menuList";
import { ISearchParamsInfo, YoutubeApiItem } from "@/utils/propType";
import { AddYoutubePayload, SermonRow } from "@/utils/supabase/sql";
import { useState } from "react";

const headList: tableHeadType[] = [
  { id: "thumbnail", name: "썸네일", isSort: false, width: "80px" },
  { id: "title", name: "제목", isSort: true },
  { id: "youtube_URL", name: "유튜브 링크", isSort: false },
  { id: "is_show", name: "상태", isSort: false },
  { id: "published_date", name: "업로드날짜", isSort: true },
];

export default function YoutubeList({ currPage, listNum, tab }: ISearchParamsInfo) {
  const { toggleAllChecked } = handlers();
  const { sortMap, filterName, toggleSort } = useSermonSortStore();
  const { mutate } = useAddYoutubeMutation();

  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<SermonRow>(
    "sermons",
    listNum,
    currPage,
    tab === "all" ? "all" : tab === "active" ? "show" : "noShow",
    { filter: filterName, sort: sortMap[filterName] }
  );

  const [checkedRow, setCheckedRow] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("6");

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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      title: t.snippet.title,
      video_id: t.id.videoId,
      youtube_URL: `https://www.youtube.com/watch?v=${t.id.videoId}`,
      published_date: t.snippet.publishedAt,
      thumbnail: t.snippet.thumbnails.high.url,
      description: t.snippet.description,
    }));

    mutate(
      { payload: videos },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <InnerLayout
      mode="default"
      title="말씀영상 목록"
      needBtn={true}
      btnName="유튜브 가져오기"
      iconSrc="/imgs/admin/icons/ic_refresh.svg"
      onClick={getYoutube}
    >
      {isLoading ? (
        <StateView text="로딩중" />
      ) : list.length <= 0 ? (
        <StateView text="게시글 없음" />
      ) : (
        <WhitePanel variants="board">
          <ListCount checkedLength={checkedRow.length} count={count} />
          <BoardTap list={boardTapList} size={listNum} tab={tab!} />
          <ActionField onDelete={() => console.log("삭제 클릭")} />
          <BoardLayout>
            <TableHead
              listNum={listNum}
              tab={tab!}
              onClick={toggleSort}
              sortMap={sortMap}
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
                  <TextField text={formatDate(t.published_date!)} withImg={false} />
                </TableContent>
              );
            })}
          </BoardLayout>
          <PagenationWrapper>
            <SelectPageCnt value={pageSize} onChange={setPageSize} tab={tab!} />
            <Pagenation currPage={currPage} listNum={Number(pageSize)} count={count} tab={tab} />
          </PagenationWrapper>
        </WhitePanel>
      )}
    </InnerLayout>
  );
}
