import createBrowClient from "@/utils/supabase/services/browerClinet";
import { tables, tablesName } from "@/utils/supabase/sql";
import { select } from "@/utils/supabase/sql/select";
import { useQuery } from "@tanstack/react-query";
const { selectPageList, selectList, selectOne } = select();

const supabase = createBrowClient();

export const useSelectPageList = <T>(name: tablesName, limit: number, page: number, hasIsShow?: boolean) => {
  return useQuery({
    queryKey: [name, limit, page],
    queryFn: async () => {
      return await selectPageList<T>({ name, limit, page, hasIsShow, supabase });
    },
  });
};

export const useSelectList = <T>(name: tablesName, limit: number, hasIsShow?: boolean) => {
  return useQuery({
    queryKey: [name, limit],
    queryFn: async () => {
      return await selectList<T>({ name, limit, hasIsShow, supabase });
    },
  });
};

export const useSelectOne = <T extends tables>(name: tablesName, id: number | string, hasIsShow?: boolean) => {
  return useQuery({
    queryKey: [name, id],
    queryFn: async () => {
      return await selectOne<T>({ name, id, hasIsShow, supabase, defaultValue: {} as T });
    },
  });
};
