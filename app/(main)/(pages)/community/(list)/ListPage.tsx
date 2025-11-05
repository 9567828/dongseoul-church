"use client";

import PhotoBoard, { AlbumRow } from "@/components/layouts/board/photo-board/PhotoBoard";
import Pagenation from "@/components/ui/pagenation/Pagenation";
import StateView from "@/components/ui/state-view/StateView";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useSearchParams } from "next/navigation";

export default function ListPage() {
  const searchParams = useSearchParams();
  const currPage = Number(searchParams.get("page")) || 1;
  const listNum = Number(searchParams.get("size")) || 9;

  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<AlbumRow>("albums", listNum, currPage);

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = 5;

  return (
    <div className="inner">
      {list.length < 0 && [] ? (
        <StateView text="게시물 없음" />
      ) : isLoading ? (
        <StateView text="로딩중" />
      ) : (
        <PhotoBoard list={list} variant="album" />
      )}
      <Pagenation currPage={currPage} pagesPerBlock={pagesPerBlock} totalPage={totalPage} listNum={listNum} />
    </div>
  );
}
