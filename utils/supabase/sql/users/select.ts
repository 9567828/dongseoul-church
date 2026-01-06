import { SupabaseClient } from "@supabase/supabase-js";
import { getUserId } from "./auth";
import { RoleWithMember } from "..";
import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { sortTypes } from "@/hooks/store/useSortState";

export type filterSortType = { filter: string; sort: sortTypes };

interface ISelect {
  id?: string;
  page?: number;
  limit?: number;
  tabStatus?: tabStatusType;
  filter?: filterSortType;
  supabase: SupabaseClient;
}

export const selectAccounts = () => {
  const selectLoginUser = async ({ supabase }: ISelect) => {
    const id = await getUserId(supabase);

    const { data, error } = await supabase.from("members").select(`*, admin:users(role)`).eq("admin_user", id!).single();

    if (error) throw error;
    return data;
  };

  const selectUserById = async ({ id, supabase }: ISelect): Promise<RoleWithMember> => {
    const { data, error } = await supabase.from("members").select(`*, admin:users(role)`).eq("id", id).single();

    if (error) throw error;
    return data as RoleWithMember;
  };

  const selectUserRole = async ({ supabase }: ISelect) => {
    const id = await getUserId(supabase);

    const { data, error } = await supabase.from("users").select("role").eq("id", id!).single();
    if (error) throw error;

    return data.role;
  };

  const selectAllUsers = async ({ supabase, limit, page, tabStatus, filter }: ISelect) => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    const filterName = filter?.filter || "created_at";
    const isAscending = filter?.sort === "asc";

    let query = supabase.from("members").select("*, admin:users(role)", { count: "exact" });

    if (tabStatus === "active") {
      query = supabase.from("members").select("*, admin:users!inner(role)", { count: "exact" });
    } else if (tabStatus === "inActive") {
      query = supabase.from("members").select("*", { count: "exact" }).is("admin_user", null);
    }

    const { data, count, error } = await query?.order(filterName, { ascending: isAscending }).range(from, to);

    if (error) throw error;

    return { list: data ?? [], count: count ?? 0 };
  };

  return { selectLoginUser, selectUserById, selectUserRole, selectAllUsers };
};
