import { tablesName } from ".";
import createBrowClient from "../services/browerClinet";

export const select = () => {
  const supabase = createBrowClient();

  const selectList = async (name: tablesName, limit: number) => {
    const { data, error } = await supabase
      .from(name)
      .select("*")
      .order(name === "sermons" ? "published_date" : "created_at", { ascending: false })
      .limit(limit);
    const { count } = await supabase.from(name).select("*", { count: "exact", head: true });

    return { data, error, count };
  };

  const selectOne = async (name: tablesName, id: number | string) => {
    const { data: table, error } = await supabase.from(name).select("*").eq("id", id).single();
    const { data: prev } = await supabase
      .from(name)
      .select("id")
      .lt("id", id)
      .order("id", { ascending: false })
      .limit(1)
      .single();
    const { data: next } = await supabase
      .from(name)
      .select("id")
      .gt("id", id)
      .order("id", {
        ascending: true,
      })
      .limit(1)
      .single();
    if (error) throw error;

    const data = {
      ...table,
      prev_id: prev?.id ? prev.id : null,
      next_id: next?.id ? next.id : null,
    };

    return { data, error };
  };

  return { selectList, selectOne };
};
