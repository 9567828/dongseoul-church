"use client";

import Loading from "@/app/Loading";
import Header from "@/components/admin/layouts/header/Header";
import SideMenu from "@/components/admin/layouts/side-menu/SideMenu";
import { useSelectLogginUser } from "@/tanstack-query/useQuerys/users/useSelectUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useSelectLogginUser();

  if (isLoading) return <Loading />;

  // const { fetchLoginUser } = await fetchServer();

  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery(fetchLoginUser());

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Suspense fallback={<Loading />}>
    //     <div className="admin-grid">
    //       {/* <SideMenu role={data?.admin?.role!} /> */}
    //       <SideMenu />
    //       <div>
    //         {/* <Header avatarSrc={data?.avatar!} /> */}
    //         <Header />
    //         <>{children}</>
    //       </div>
    //     </div>
    //   </Suspense>
    // </HydrationBoundary>
    <div className="admin-grid">
      <SideMenu role={data?.admin?.role!} />

      <div>
        <Header avatarSrc={data?.avatar!} />
        <>{children}</>
      </div>
    </div>
  );
}
