"use client";

import BoardDetail from "@/components/layouts/board/detail/BoardDetail";
import { useSelectOne } from "@/tanstack-query/useQuerys/useSelectQueries";
import { useParams } from "next/navigation";

export default function AlbumDetail({ id }: { id: string }) {
  // const { id } = useParams();
  // const idStr = String(id);
  const { data, error, isLoading } = useSelectOne("albums", id);

  console.log(error);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!data) {
    return <div>조회된 데이터가 없습니다</div>;
  }

  return <BoardDetail detail={data?.data} variant="album" />;
}
