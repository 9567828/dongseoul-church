import { createServClient } from "@/utils/supabase/services/serverClinet";
import { selectAccounts } from "@/utils/supabase/sql/users/select";
import { queryOptions } from "@tanstack/react-query";
const { selectLoginUser, selectUserById, selectAllUsers } = selectAccounts();

export const fetchServer = async () => {
  const supabase = await createServClient();

  const fetchLoginUser = () => {
    return queryOptions({
      queryKey: ["members", "own"],
      queryFn: async () => {
        return await selectLoginUser({ supabase });
      },
    });
  };

  const fetchUserById = (id: string) => {
    return queryOptions({
      queryKey: ["members", id],
      queryFn: async () => {
        return await selectUserById({ supabase, id });
        // try {
        //   const { data, error } = await selectUserById({ supabase, id });
        //   if (error) {
        //     console.error("supabase error: ", error);
        //     return null;
        //   }

        //   return data;
        // } catch (e) {
        //   console.error("fetch error: ", e);
        //   return null;
        // }
      },
    });
  };

  const fetchAllUsers = (page: number, limit: number) => {
    return queryOptions({
      queryKey: ["members", "all"],
      queryFn: async () => {
        return await selectAllUsers({ supabase, page, limit });
      },
    });
  };

  return { fetchLoginUser, fetchUserById, fetchAllUsers };
};
