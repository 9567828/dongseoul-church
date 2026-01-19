import SearchDetail from "@/app/(admin)/admin/search/(layout)/SearchDetail";
import { ISearchParams } from "@/utils/propType";
import { tablesName, viewName } from "@/utils/supabase/sql";
import { getSearchQuerys } from "@/utils/pagenation";

export default async function Page({ searchParams }: ISearchParams) {
  const { keyword, table, page, size } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const limitSize = getSearchQuerys(size, 10);

  return <SearchDetail keyword={String(keyword)} table={table as viewName} page={currPage} size={limitSize} />;
}
