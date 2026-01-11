import { ISearchParams, ISearchParamsInfo } from "@/utils/propType";
import AlbumLists from "./(list)/AlbumLists";
import { getSearchQuerys, getTabQuery } from "@/utils/pagenation";

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size, tab } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 6);
  const tabStatus = getTabQuery(tab, "all");

  return <AlbumLists currPage={currPage} listNum={listNum} tab={tabStatus} />;
}
