import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { filterSortType, selectAccounts } from "@/utils/supabase/sql/users/select";
import { useQuery } from "@tanstack/react-query";
const { selectLoginUser, selectUserById, selectAllUsers } = selectAccounts();

const supabase = createBrowClient();

export const useSelectLogginUser = () => {
  return useQuery({
    queryKey: ["member", "own"],
    queryFn: async () => {
      return await selectLoginUser({ supabase });
    },
  });
};

export const useSelectUserById = (id: string) => {
  return useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      return await selectUserById({ id, supabase });
    },
    enabled: !!id,
  });
};

export const useSelectAllUsers = (page: number, limit: number, tabStatus: tabStatusType, filter: filterSortType) => {
  return useQuery({
    queryKey: ["members", "all", page, limit, tabStatus, filter],
    queryFn: async () => {
      return await selectAllUsers({ supabase, page, limit, tabStatus, filter });
    },
  });
};
