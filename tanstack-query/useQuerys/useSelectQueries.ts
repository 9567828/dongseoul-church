import { filterSortType } from "@/utils/propType";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { AlbumWithName, boardTables, tablesName } from "@/utils/supabase/sql";
import { select, showStateType } from "@/utils/supabase/sql/boards/select";
import { useQuery } from "@tanstack/react-query";
const { selectPageList, selectList, selectOne } = select();

const supabase = createBrowClient();

export const useSelectPageList = <T>(
  name: tablesName,
  limit: number,
  page: number,
  hasIsShow?: showStateType,
  filter?: filterSortType
) => {
  return useQuery({
    queryKey: [name, limit, page, hasIsShow, filter],
    queryFn: async () => {
      return await selectPageList<T>({ name, limit, page, hasIsShow, filter, supabase });
    },
  });
};

export const useSelectList = <T>(
  name: tablesName,
  limit: number,
  hasIsShow?: showStateType,
  order?: string,
  isAscending?: boolean
) => {
  return useQuery({
    queryKey: [name, limit, hasIsShow, order, isAscending],
    queryFn: async () => {
      return await selectList<T>({ name, limit, hasIsShow, supabase, order, isAscending });
    },
  });
};

export const useSelectOne = <T>(name: tablesName, id: number | string, hasIsShow?: showStateType) => {
  return useQuery({
    queryKey: [name, id],
    queryFn: async () => {
      return await selectOne<T>({ name, id, hasIsShow, supabase, defaultValue: {} as T });
    },
  });
};
