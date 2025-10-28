import BoardDetail from "@/components/layouts/board/detail/BoardDetail";
import { Suspense } from "react";
import { photoList } from "../../../worship/sermon/page";

interface IParams {
  params: Promise<{ id: string }>;
}

const getDetail = (id: string) => {
  return photoList.find((v) => v.id === id);
};

export async function generateMetadata({ params }: IParams) {
  // 여기서 api 붙일 때 id가 title이 아니라 title로 들어가도록 수정해야 함
  const { id } = await params;
  return {
    title: `앨범 - ${getDetail(id)?.title}`,
  };
}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  const detail = getDetail(id);

  // 나중에 api 보낼 때 여기서 보내기
  if (!detail) return <p>검색결과가 없습니다</p>;

  return (
    <Suspense>
      <BoardDetail detail={detail} variant="album" />
    </Suspense>
  );
}
