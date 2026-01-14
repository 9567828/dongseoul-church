import { SupabaseClient } from "@supabase/supabase-js";
import { tablesName } from "..";
import { filterSortType } from "@/utils/propType";

export type showStateType = "all" | "show" | "noShow";

export interface ISelect {
  name: tablesName;
  order?: string;
  isAscending?: boolean;
  limit?: number;
  page?: number;
  id?: number | string;
  filter?: filterSortType;
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
    filter,
    hasIsShow = "all",
    supabase,
  }: ISelect): Promise<{ count: number; list: T[] }> => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    let filterName = filter?.filter!;
    let isAscending = filter?.sort === "desc" ? false : true;

    let query;

    if (name === "albums") {
      query = supabase
        .from(name)
        .select("*, origin:members!albums_origin_writer_fkey(name), editor:members!albums_edit_writer_fkey(name)", {
          count: "exact",
        })
        .range(from, to);
    } else {
      query = supabase.from(name).select("*", { count: "exact" }).range(from, to);
    }

    handleHasShow(hasIsShow, query);

    const { data, count, error } = await query.order(filterName, { ascending: isAscending }).order("id", { ascending: false });
    if (error) throw error;

    return { count: count ?? 0, list: (data as T[]) ?? [] };
  };

  const selectList = async <T>({
    name,
    limit,
    supabase,
    order = "id",
    isAscending = true,
    hasIsShow,
  }: ISelect): Promise<{ list: T[] }> => {
    let query = supabase.from(name).select("*");
    if (hasIsShow) {
      query = query.eq("is_show", true);
    } else if (!hasIsShow) {
      query = query.eq("is_show", false);
    }

    const { data, error } = await query.order(order, { ascending: isAscending }).limit(limit!);

    if (error) throw error;

    return { list: (data as T[]) ?? [] };
  };

  const selectOne = async <T>({
    name,
    id,
    supabase,
    hasIsShow = "show",
    defaultValue,
  }: ISelect & { defaultValue: T }): Promise<{ data: WithPrevNext<T> }> => {
    let baseQuery;

    if (name === "albums") {
      baseQuery = supabase
        .from(name)
        .select("*, origin:members!albums_origin_writer_fkey(name), editor:members!albums_edit_writer_fkey(name)");
    } else {
      baseQuery = supabase.from(name).select("*");
    }

    if (hasIsShow === "show") {
      baseQuery = baseQuery.eq("is_show", true);
    }

    const { data: table, error } = await baseQuery.eq("id", id).single();
    if (error) throw error;

    let prevQuery = supabase.from(name).select("id, title").lt("id", id);
    let nextQuery = supabase.from(name).select("id, title").gt("id", id);

    if (hasIsShow === "show") {
      prevQuery = prevQuery.eq("is_show", true);
      nextQuery = nextQuery.eq("is_show", true);
    }

    const { data: prev } = await nextQuery.order("id", { ascending: true }).limit(1).maybeSingle();
    const { data: next } = await prevQuery.order("id", { ascending: false }).limit(1).maybeSingle();

    const data = {
      ...table,
      prev,
      next,
    };

    return { data: (data as WithPrevNext<T>) ?? defaultValue };
  };

  return { selectPageList, selectList, selectOne };
};
