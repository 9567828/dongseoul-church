"use client";

import PhotoBoard, { AlbumRow } from "@/components/layouts/board/photo-board/PhotoBoard";
import Pagenation from "@/components/ui/pagenation/Pagenation";
import { useSelectList } from "@/tanstack-query/useQuerys/useSelectQueries";

export default function ListPage() {
  const { data: { list, count } = { list: [], count: 0 } } = useSelectList("albums", 9);

  return (
    <div className="inner">
      <PhotoBoard list={list as AlbumRow[]} variant="album" />
      <Pagenation />
    </div>
  );
}
