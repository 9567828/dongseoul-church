import { getSearchQuerys } from "@/utils/pagenation";
import YoutubeList from "./(list)/YoutubeList";
import { ISearchParams } from "@/utils/propType";
import { Suspense } from "react";

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 6);

  return (
    <Suspense>
      <YoutubeList currPage={currPage} listNum={listNum} />
    </Suspense>
  );
}
