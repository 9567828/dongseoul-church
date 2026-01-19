import { Suspense } from "react";
import ListPage from "./(list)/ListPage";
import { ISearchParams } from "@/utils/propType";
import { getSearchQuerys } from "@/utils/pagenation";

export const metadata = {
  title: "교회사진",
};

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size } = await searchParams;

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 9);

  return (
    <Suspense>
      <ListPage currPage={currPage} size={listNum} />
    </Suspense>
  );
}
