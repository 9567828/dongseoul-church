import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { EmailOtpType } from "@supabase/supabase-js";

export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface IParams {
  params: Promise<{ id: string }>;
}

export interface tokensType {
  token_hash: string;
  type: EmailOtpType;
}

export interface ITokens {
  searchParams: Promise<tokensType>;
}

export type pageQueryProps = string | string[] | undefined;

export interface ISearchParamsInfo {
  currPage: number;
  listNum: number;
  tab: tabStatusType;
}

export type UserFormType = "add" | "edit" | "readOnly" | "list";

export const roleList = ["super", "admin"];

type actionMode = "delete" | "state" | "invite";
export type modalActType = { key?: string; action: actionMode };
