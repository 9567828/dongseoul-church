import { SupabaseClient } from "@supabase/supabase-js";
import { tablesName } from ".";

export interface ISelect {
  name: tablesName;
  limit?: number;
  page?: number;
  id?: number | string;
  hasIsShow?: boolean;
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

export const select = () => {
  const selectPageList = async <T>({
    name,
    limit,
    page,
    hasIsShow = false,
    supabase,
  }: ISelect): Promise<{ count: number; list: T[] }> => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    let query = supabase.from(name).select("*", { count: "exact" }).range(from, to);

    if (hasIsShow) {
      query = query.eq("is_show", true);
    }

    const { data, count, error } = await query.order("id", { ascending: true });

    if (error) throw error;

    return { count: count ?? 0, list: (data as T[]) ?? [] };
  };

  const selectList = async <T>({ name, limit, supabase, hasIsShow = false }: ISelect): Promise<{ list: T[] }> => {
    let query = supabase.from(name).select("*");
    if (hasIsShow) {
      query = query.eq("is_show", true);
    }

    const { data, error } = await query.order("id", { ascending: true }).limit(limit!);

    if (error) throw error;

    return { list: (data as T[]) ?? [] };
  };

  const selectOne = async <T>({
    name,
    id,
    supabase,
    hasIsShow = false,
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
