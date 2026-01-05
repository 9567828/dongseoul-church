import { IParams } from "@/utils/propType";
import UserForm from "../../_component/UserForm";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchServer } from "@/tanstack-query/useQuerys/users/fetchSever";
import { getQueryClient } from "@/tanstack-query/getQueryClient";

export default async function Page({ params }: IParams) {
  const { id } = await params;

  // const user = userListArr.find((u) => u.id === Number(id));

  const { fetchUserById } = await fetchServer();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(fetchUserById(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserForm mode="edit" userId={id} />
    </HydrationBoundary>
    // <UserForm mode="edit" userId={id} />
  );
}
