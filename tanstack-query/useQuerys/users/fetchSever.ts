import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { createServClient } from "@/utils/supabase/services/serverClinet";
import { selectAccounts } from "@/utils/supabase/sql/users/select";
import { queryOptions } from "@tanstack/react-query";
const { selectLoginUser, selectUserById, selectAllUsers } = selectAccounts();

export const fetchServer = async () => {
  const supabase = await createServClient();

  const fetchLoginUser = () => {
    return queryOptions({
      queryKey: ["member", "own"],
      queryFn: async () => {
        return await selectLoginUser({ supabase });
      },
      staleTime: 1000 * 60 * 5,
    });
  };

  const fetchUserById = (id: string) => {
    return queryOptions({
      queryKey: ["member", id],
      queryFn: async () => {
        return await selectUserById({ supabase, id });
      },
      staleTime: 1000 * 60 * 5,
    });
  };

  const fetchAllUsers = (page: number, limit: number, tab: tabStatusType) => {
    return queryOptions({
      queryKey: ["members", "all", page, limit, tab],
      queryFn: async () => {
        return await selectAllUsers({ supabase, page, limit });
      },
      staleTime: 1000 * 60 * 5,
    });
  };

  return { fetchLoginUser, fetchUserById, fetchAllUsers };
};
