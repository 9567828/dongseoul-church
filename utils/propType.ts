import { roleEum } from "./supabase/sql";

export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface IParams {
  params: Promise<{ id: string }>;
}

export type pageQueryProps = string | string[] | undefined;

export interface ISearchParamsInfo {
  currPage: number;
  listNum: number;
}

export type UserFormType = "add" | "edit" | "readOnly" | "list";

export const roleList = ["super", "admin"];
