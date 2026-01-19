"use client";

import PhotoBoard from "@/components/main/layouts/board/photo-board/PhotoBoard";
import Pagenation from "@/components/main/ui/pagenation/Pagenation";
import StateView from "@/components/main/ui/state-view/StateView";
import { useSelectPageList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { AlbumRow } from "@/utils/supabase/sql";
import { ISearchParamsInfo } from "@/utils/propType";

export default function ListPage({ size, currPage }: ISearchParamsInfo) {
  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectPageList<AlbumRow>(
    "albums",
    size,
    currPage,
    "show",
    { filter: "id", sort: "desc" },
  );

  return (
    <div className="inner">
      {isLoading ? (
        <StateView text="로딩중" />
      ) : list.length <= 0 ? (
        <StateView text="게시물 없음" />
      ) : (
        <PhotoBoard list={list} variant="album" />
      )}
      {list.length > 0 && <Pagenation currPage={currPage} count={count} listNum={size} />}
    </div>
  );
}
