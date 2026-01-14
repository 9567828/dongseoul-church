import { SupabaseClient } from "@supabase/supabase-js";
import { getUserId } from "./auth";
import { MemberRow, RoleWithMember } from "..";
import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { getUserImgUrl } from "../storage/storage";
import { filterSortType } from "@/utils/propType";

interface ISelect {
  id?: string;
  page?: number;
  limit?: number;
  tabStatus?: tabStatusType;
  filter?: filterSortType;
  supabase: SupabaseClient;
}

export const selectAccounts = () => {
  const selectLoginUser = async ({ supabase }: ISelect): Promise<RoleWithMember> => {
    const id = await getUserId(supabase);

    const { data: item, error } = await supabase.from("members").select(`*, admin:users(role)`).eq("admin_user", id!).single();
    if (error) throw error;

    let avatar_url: string | null = null;

    if (item.avatar) {
      const url = await getUserImgUrl(item.avatar, supabase);
      avatar_url = url ?? null;
    }

    const newObj: RoleWithMember = {
      ...item,
      avatar_url,
    };
    return newObj;
  };

  const selectDeletedUser = async ({ supabase }: ISelect) => {
    const id = await getUserId(supabase);
    const { data, error } = await supabase.from("users").select("is_deleted").eq("id", id).single();
    if (error) throw error;

    return data;
  };

  const selectUserById = async ({ id, supabase }: ISelect): Promise<RoleWithMember> => {
    const { data: item, error } = await supabase
      .from("members")
      .select(`*, admin:users(role)`)
      .eq("id", id)
      .eq("is_deleted", false)
      .single();
    if (error) throw error;

    let avatar_url: string | null = null;

    if (item.avatar) {
      const url = await getUserImgUrl(item.avatar, supabase);
      avatar_url = url ?? null;
    }

    const newObj: RoleWithMember = {
      ...item,
      avatar_url,
    };

    return newObj;
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

    const { data, count, error } = await query
      ?.order(filterName, { ascending: isAscending })
      .range(from, to)
      .eq("is_deleted", false);

    const list: RoleWithMember[] = await Promise.all(
      (data ?? []).map(async (item) => {
        if (!item.avatar) {
          return { ...item, avatar_url: null };
        }
        const { data: signed, error } = await supabase.storage.from("avatar").createSignedUrl(item.avatar, 60 * 60);
        if (error) throw error;

        return { ...item, avatar_url: signed.signedUrl ?? null };
      })
    );

    if (error) throw error;

    return { list, count: count ?? 0 };
  };

  const selectHasAdminUsers = async (ids: string[], supabase: SupabaseClient) => {
    const { data, error } = await supabase.from("members").select("*").in("id", ids).select();
    if (error) throw error;

    const row = data.map((user) => user.admin_user !== null);

    return row.some(Boolean);
  };

  return { selectLoginUser, selectUserById, selectUserRole, selectAllUsers, selectDeletedUser, selectHasAdminUsers };
};
