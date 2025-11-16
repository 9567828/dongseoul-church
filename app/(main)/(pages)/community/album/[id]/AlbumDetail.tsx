"use client";

import BoardDetail from "@/components/layouts/board/detail/BoardDetail";
import StateView from "@/components/ui/state-view/StateView";
import { useSelectOne } from "@/tanstack-query/useQuerys/useSelectQueries";
import { AlbumRow } from "@/utils/supabase/sql";

export default function AlbumDetail({ id }: { id: string }) {
  const { data, error, isLoading } = useSelectOne<AlbumRow>("albums", id, true);

  if (error) {
    console.error(error);
    return <StateView text="문제가 지속될 경우 관리자에게 문의해 주세요" />;
  }

  if (isLoading) {
    return <StateView text="로딩중" />;
  }

  if (!data) {
    return <StateView text="조회된 데이터가 없습니다" />;
  }

  return <BoardDetail detail={data?.data} variant="album" prev={data.data.prev!} next={data.data.next!} />;
}
