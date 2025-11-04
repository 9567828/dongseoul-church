"use client";

import PhotoBoard from "@/components/layouts/board/photo-board/PhotoBoard";
import EmptyPage from "@/components/ui/state-view/StateView";
import Pagenation from "@/components/ui/pagenation/Pagenation";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useSearchParams } from "next/navigation";
import StateView from "@/components/ui/state-view/StateView";
import { Tables } from "@/database.types";

export default function SermonList() {
  const searchParams = useSearchParams();
  const currPage = Number(searchParams.get("page")) || 1;
  const listNum = Number(searchParams.get("size")) || 9;
  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<Tables<"sermons">>(
    "sermons",
    listNum,
    currPage
  );

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = 5;

  return (
    <div className="inner">
      {list.length < 0 && [] ? (
        <StateView text="게시물 없음" />
      ) : isLoading ? (
        <StateView text="로딩중" />
      ) : (
        <PhotoBoard list={list} variant="sermon" />
      )}
      <Pagenation currPage={currPage} pagesPerBlock={pagesPerBlock} totalPage={totalPage} listNum={listNum} />
    </div>
  );
}
