import { IParams } from "@/utils/propType";
import UserForm from "../_component/UserForm";
import { getQueryClient } from "@/tanstack-query/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchServer } from "@/tanstack-query/useQuerys/users/fetchSever";

export default async function Page({ params }: IParams) {
  const { id } = await params;
  const { fetchUserById } = await fetchServer();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(fetchUserById(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserForm mode="readOnly" userId={id} />
    </HydrationBoundary>
  );
}
