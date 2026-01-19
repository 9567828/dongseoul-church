import { SupabaseClient } from "@supabase/supabase-js";
import { boardTables, SearchAllType, tablesName, viewName } from "..";
import { filterDateType, filterSortType } from "@/utils/propType";

export type showStateType = "all" | "show" | "noShow";

export interface ISelect {
  name: tablesName;
  order?: string;
  isAscending?: boolean;
  limit?: number;
  page?: number;
  id?: number | string;
  filter?: filterSortType;
  dates?: filterDateType;
  search?: string;
  hasIsShow?: showStateType;
  supabase: SupabaseClient;
}

export interface ISearch {
  name: viewName;
  supabase: SupabaseClient;
  search: string;
  page: number;
  limit: number;
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
    dates,
    search,
    hasIsShow = "all",
    supabase,
  }: ISelect): Promise<{ count: number; list: T[] }> => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    let filterName = filter?.filter!;
    let isAscending = filter?.sort === "desc" ? false : true;

    let query = supabase
      .from(name)
      .select(`*, origin:members!${name}_origin_writer_fkey(name), editor:members!${name}_edit_writer_fkey(name)`, {
        count: "exact",
      });

    handleHasShow(hasIsShow, query);

    let safeFrom;
    const { count: total } = await supabase.from(name).select("*", { count: "exact" });

    if (dates?.startDate && dates.endDate) {
      query = query.gte("created_at", dates.startDate).lt("created_at", dates.endDate);

      const { count } = await query;

      if (count === 0 || total! > count!) {
        safeFrom = 0;
      }
    }

    if (search !== undefined && search !== "undefined") {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);

      const { count } = await query;

      if (count === 0 && total! > count!) {
        safeFrom = 0;
      }
    }

    const completeFrom = safeFrom === 0 ? safeFrom : from;

    const { data, count, error } = await query
      .range(completeFrom, to)
      .order(filterName, { ascending: isAscending })
      .order("id", { ascending: false });
    if (error) throw error;

    return { count: count ?? 0, list: (data as T[]) ?? [] };
  };

  const selectList = async <T>({
    name,
    limit,
    supabase,
    order = "id",
    isAscending = false,
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
    let baseQuery = supabase
      .from(name)
      .select(`*, origin:members!${name}_origin_writer_fkey(name), editor:members!${name}_edit_writer_fkey(name)`);

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

  const getLatestUpdateUser = async <T>({ name, supabase }: ISelect) => {
    const { data, error } = await supabase
      .from(name)
      .select(`*`)
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();
    if (error) throw error;

    return data as boardTables;
  };

  const searchAll = async (supabase: SupabaseClient, search: string) => {
    const [album, sermon] = await Promise.all([
      supabase
        .from("album_search")
        .select("*", { count: "exact" })
        .or(`title.ilike.%${search}%,description.ilike.%${search}%,writer.ilike.%${search}%`)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("sermon_search")
        .select("*", { count: "exact" })
        .or(`title.ilike.%${search}%,description.ilike.%${search}%,writer.ilike.%${search}%`)
        .order("published_date", { ascending: false })
        .limit(5),
    ]);

    const { data: albumData, count: albumCnt, error: albumErr } = album;
    if (albumErr) throw albumErr;
    const { data: sermonData, count: sermonCnt, error: sermonErr } = sermon;
    if (sermonErr) throw sermonErr;

    const result: SearchAllType[] = [
      { table: "album_search", data: albumData, count: albumCnt ?? 0 },
      { table: "sermon_search", data: sermonData, count: sermonCnt ?? 0 },
    ];

    return {
      result,
    };
  };

  const searchGetByBoard = async ({ name, supabase, search, page, limit }: ISearch) => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    let filterName = "created_at";

    if (name === "sermon_search") {
      filterName = "published_date";
    }

    const { data, error, count } = await supabase
      .from(name)
      .select("*", { count: "exact" })
      .or(`title.ilike.%${search}%,description.ilike.%${search}%,writer.ilike.%${search}%`)
      .order(filterName, { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data,
      count,
    };
  };

  return { selectPageList, selectList, selectOne, getLatestUpdateUser, searchAll, searchGetByBoard };
};
