import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AlbumAddPage from "../_components/AddAlbum";
import { getQueryClient } from "@/tanstack-query/getQueryClient";
import { fetchServer } from "@/tanstack-query/useQuerys/users/fetchSever";

export default async function Page() {
  const queryClient = getQueryClient();

  const { fetchLoginUser } = await fetchServer();
  await queryClient.prefetchQuery(fetchLoginUser());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumAddPage />
    </HydrationBoundary>
  );
}
