"use client";

import PhotoBoard from "@/components/layouts/board/photo-board/PhotoBoard";
import { useSelectList } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function SermonList() {
  const { data: { list, count } = { list: [], count: 0 }, isLoading } = useSelectList("sermons", 9);

  return (
    <div className="inner">
      <div>게시물 없음</div>
      {/* {list.length < 0 && [] ? (
        <div>게시물 없음</div>
      ) : isLoading ? (
        <div>로딩중</div>
      ) : (
        <PhotoBoard list={list} variant="sermon" />
      )} */}
    </div>
  );
}
