import SermonList from "./(list)/SermonList";
import { Suspense } from "react";
import { ISearchParams } from "@/utils/propType";
import { getSearchQuerys } from "@/utils/pagenation";

export const metadata = {
  title: "말씀영상",
};

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 9);

  return (
    <Suspense>
      <SermonList currPage={currPage} listNum={listNum} />
    </Suspense>
  );
}
