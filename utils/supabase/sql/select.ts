import { SupabaseClient } from "@supabase/supabase-js";
import { tablesName } from ".";

export type showStateType = "all" | "show" | "noShow";

export interface ISelect {
  name: tablesName;
  limit?: number;
  page?: number;
  id?: number | string;
  hasIsShow?: showStateType;
  supabase: SupabaseClient;
}

interface PrevNext {
  id: number | string;
  title: string;
}

type WithPrevNext<T> = T & {
  prev: PrevNext | null;
  next: PrevNext | null;
};

const handleHasShow = (hasIsShow: showStateType, query: any) => {
  if (hasIsShow === "show") {
    query = query.eq("is_show", true);
  } else if (hasIsShow === "noShow") {
    query = query.eq("is_show", false);
  }
};

export const select = () => {
  const selectPageList = async <T>({
    name,
    limit,
    page,
    hasIsShow = "all",
    supabase,
  }: ISelect): Promise<{ count: number; list: T[] }> => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    let query = supabase.from(name).select("*", { count: "exact" }).range(from, to);

    handleHasShow(hasIsShow, query);

    const { data, count, error } = await query.order("id", { ascending: true });

    if (error) throw error;
    return { count: count ?? 0, list: (data as T[]) ?? [] };
  };

  const selectList = async <T>({ name, limit, supabase, hasIsShow }: ISelect): Promise<{ list: T[] }> => {
    let query = supabase.from(name).select("*");
    if (hasIsShow) {
      query = query.eq("is_show", true);
    } else if (!hasIsShow) {
      query = query.eq("is_show", false);
    }

    const { data, error } = await query.order("id", { ascending: true }).limit(limit!);

    if (error) throw error;

    return { list: (data as T[]) ?? [] };
  };

  const selectOne = async <T>({
    name,
    id,
    supabase,
    hasIsShow = "all",
    defaultValue,
  }: ISelect & { defaultValue: T }): Promise<{ data: WithPrevNext<T> }> => {
    let baseQuery = supabase.from(name).select("*");

    if (hasIsShow) {
      baseQuery = baseQuery.eq("is_show", true);
    }

    const { data: table, error } = await baseQuery.eq("id", id).single();
    if (error) throw error;

    let prevQuery = supabase.from(name).select("id, title").lt("id", id);
    let nextQuery = supabase.from(name).select("id, title").gt("id", id);

    if (hasIsShow) {
      prevQuery = prevQuery.eq("is_show", true);
      nextQuery = nextQuery.eq("is_show", true);
    }

    const { data: prev } = await prevQuery.order("id", { ascending: false }).limit(1).maybeSingle();
    const { data: next } = await nextQuery.order("id", { ascending: true }).limit(1).maybeSingle();

    const data = {
      ...table,
      prev,
      next,
    };

    return { data: (data as WithPrevNext<T>) ?? defaultValue };
  };

  return { selectPageList, selectList, selectOne };
};
