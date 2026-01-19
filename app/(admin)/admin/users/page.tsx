import { Suspense } from "react";
import UserList from "./(list)/UserList";
import { ISearchParams } from "@/utils/propType";
import { getSearchQuerys, getTabQuery } from "@/utils/pagenation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/tanstack-query/getQueryClient";
import { fetchServer } from "@/tanstack-query/useQuerys/users/fetchSever";
import Loading from "@/app/Loading";
import { selectAccounts } from "@/utils/supabase/sql/users/select";
import { createServClient } from "@/utils/supabase/services/serverClinet";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: ISearchParams) {
  const { selectUserRole } = selectAccounts();
  const supabase = await createServClient();
  const role = await selectUserRole({ supabase });

  if (role === "admin") {
    return redirect("/admin/boards");
  }

  const { page, size, tab } = await searchParams;
  const queryClient = getQueryClient();
  const { fetchAllUsers } = await fetchServer();

  const currPage = getSearchQuerys(page, 1);
  const listNum = getSearchQuerys(size, 10);
  const tabStatus = getTabQuery(tab, "all");

  await queryClient.prefetchQuery(fetchAllUsers(currPage, listNum, tabStatus));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <UserList currPage={currPage} size={listNum} tab={tabStatus} />
      </Suspense>
    </HydrationBoundary>
  );
}
