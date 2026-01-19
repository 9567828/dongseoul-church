import { getSearchQuerys, getTabQuery } from "@/utils/pagenation";
import YoutubeList from "./(list)/YoutubeList";
import { ISearchParams } from "@/utils/propType";
import { Suspense } from "react";

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size, tab } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 10);
  const tabStatus = getTabQuery(tab, "all");

  return (
    <Suspense>
      <YoutubeList currPage={currPage} size={listNum} tab={tabStatus} />
    </Suspense>
  );
}
