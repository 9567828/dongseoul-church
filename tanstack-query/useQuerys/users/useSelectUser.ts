import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { filterSortType } from "@/utils/propType";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { selectAccounts } from "@/utils/supabase/sql/users/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const { selectLoginUser, selectUserById, selectAllUsers } = selectAccounts();

const supabase = createBrowClient();

export const useSelectLogginUser = () => {
  return useQuery({
    queryKey: ["member", "own"],
    queryFn: async () => {
      return await selectLoginUser({ supabase });
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSelectUserById = (id: string) => {
  return useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      return await selectUserById({ id, supabase });
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSelectAllUsers = (page: number, limit: number, tabStatus: tabStatusType, filter: filterSortType) => {
  return useQuery({
    queryKey: ["members", "all", page, limit, tabStatus, filter],
    queryFn: async () => {
      return await selectAllUsers({ supabase, page, limit, tabStatus, filter });
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    window.location.href = "/auth/login";
  };
};

export const useSignOutForErr = () => {
  const queryClient = useQueryClient();

  return async () => {
    await supabase.auth.signOut();
    queryClient.clear();
    window.location.href = "/auth/login?redirect=invalid_token";
  };
};
