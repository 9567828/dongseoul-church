import { tablesName } from "@/utils/supabase/sql";
import { select } from "@/utils/supabase/sql/select";
import { useQuery } from "@tanstack/react-query";
const { selectList, selectOne } = select();

export const useSelectList = (tableName: tablesName, limit: number) => {
  return useQuery({
    queryKey: [tableName],
    queryFn: async () => {
      const { count, data, error } = await selectList(tableName, limit);
      if (error) throw error;

      return { count: count ?? 0, list: data ?? [] };
    },
  });
};

export const useSelectOne = (tableName: tablesName, id: number | string) => {
  return useQuery({
    queryKey: [tableName, id],
    queryFn: async () => {
      const { data, error } = await selectOne(tableName, id);
      if (error) throw error;

      console.log(data);
      return { data: data ?? "" };
    },
  });
};
