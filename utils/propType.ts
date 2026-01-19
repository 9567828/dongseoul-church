import { tabStatusType } from "@/components/admin/ui/board/BoardTab";
import { sortTypes } from "@/hooks/store/useSortState";
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
  size: number;
  tab?: tabStatusType;
}

export type filterSortType = { filter: string; sort: sortTypes };

export type filterDateType = { startDate: string | null; endDate: string | null; isOneDay: boolean };

export type FormType = "add" | "edit" | "readOnly" | "list";

export const roleList = ["super", "admin"];

type actionMode = "delete" | "state" | "invite" | "openImg" | "filter";
export type modalActType = { key?: string; memId?: string; action: actionMode };

type addrKey = "address" | "zonecode";
export type addrMap = Record<addrKey, string>;

export const getExtFromMime = (file: File) => {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg",
  };

  return map[file.type] ?? "png";
};

export interface YoutubeApiItem {
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    title: string;
    thumbnails: { high: { url: string } };
    description: string;
  };
}
