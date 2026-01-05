import { Suspense } from "react";
import UserList from "./(list)/UserList";
import { ISearchParams } from "@/utils/propType";
import { getSearchQuerys } from "@/utils/pagenation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/tanstack-query/getQueryClient";
import { fetchServer } from "@/tanstack-query/useQuerys/users/fetchSever";
import Loading from "@/app/Loading";

export default async function Page({ searchParams }: ISearchParams) {
  const { page, size } = await searchParams;
  const queryClient = getQueryClient();
  const { fetchAllUsers } = await fetchServer();

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 6);

  await queryClient.prefetchQuery(fetchAllUsers(currPage, listNum));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <UserList currPage={currPage} listNum={listNum} />
      </Suspense>
    </HydrationBoundary>
  );
}
