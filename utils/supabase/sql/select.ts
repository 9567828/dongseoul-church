import { SupabaseClient } from "@supabase/supabase-js";
import { tablesName } from ".";

interface ISelect {
  name: tablesName;
  limit?: number;
  page?: number;
  id?: number | string;
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
  const selectPageList = async <T>({ name, limit, page, supabase }: ISelect): Promise<{ count: number; list: T[] }> => {
    const from = (page! - 1) * limit!;
    const to = from + limit! - 1;

    const { data, count, error } = await supabase
      .from(name)
      .select("*", { count: "exact" })
      .range(from, to)
      .order("id", { ascending: true });

    if (error) throw error;

    return { count: count ?? 0, list: (data as T[]) ?? [] };
  };

  const selectList = async <T>({ name, limit, supabase }: ISelect): Promise<{ list: T[] }> => {
    const { data, error } = await supabase.from(name).select("*").order("id", { ascending: true }).limit(limit!);

    if (error) throw error;

    return { list: (data as T[]) ?? [] };
  };

  const selectOne = async <T>({
    name,
    id,
    supabase,
    defaultValue,
  }: ISelect & { defaultValue: T }): Promise<{ data: WithPrevNext<T> }> => {
    const { data: table, error } = await supabase.from(name).select("*").eq("id", id).single();
    const { data: prev } = await supabase
      .from(name)
      .select("id, title")
      .lt("id", id)
      .order("id", { ascending: false })
      .limit(1)
      .single();
    const { data: next } = await supabase
      .from(name)
      .select("id, title")
      .gt("id", id)
      .order("id", {
        ascending: true,
      })
      .limit(1)
      .single();
    if (error) throw error;

    const data = {
      ...table,
      prev,
      next,
    };

    return { data: (data as WithPrevNext<T>) ?? defaultValue };
  };

  return { selectPageList, selectList, selectOne };
};
