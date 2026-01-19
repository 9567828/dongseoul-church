import { filterDateType, filterSortType } from "@/utils/propType";
import createBrowClient from "@/utils/supabase/services/browerClinet";
import { tablesName } from "@/utils/supabase/sql";
import { select, showStateType } from "@/utils/supabase/sql/boards/select";
import { useQuery } from "@tanstack/react-query";

const { selectPageList, selectList, selectOne, getLatestUpdateUser, searchAll, searchGetByBoard } = select();

const supabase = createBrowClient();

export const useSelectPageList = <T>(
  name: tablesName,
  limit: number,
  page: number,
  hasIsShow?: showStateType,
  filter?: filterSortType,
  dates?: filterDateType,
  search?: string,
) => {
  return useQuery({
    queryKey: [name, limit, page, hasIsShow, filter, dates, search],
    queryFn: async () => {
      return await selectPageList<T>({ name, limit, page, hasIsShow, filter, dates, supabase, search });
    },
  });
};

export const useSelectList = <T>(
  name: tablesName,
  limit: number,
  hasIsShow?: showStateType,
  order?: string,
  isAscending?: boolean,
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

export const useGetLatestUpdateUser = <T>(name: tablesName) => {
  return useQuery({
    queryKey: [name],
    queryFn: async () => {
      return await getLatestUpdateUser<T>({ name, supabase });
    },
  });
};

export const useSelectSearchAll = (keyword: string) => {
  return useQuery({
    queryKey: [keyword],
    queryFn: async () => {
      return await searchAll(supabase, keyword);
    },
  });
};

export const useSelectSearchByBoard = (name: tablesName, keyword: string, page: number, size: number) => {
  return useQuery({
    queryKey: [name, keyword, page, size],
    queryFn: async () => {
      return await searchGetByBoard({ name, supabase, search: keyword, page, limit: size });
    },
  });
};
