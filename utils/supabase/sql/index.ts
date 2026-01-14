import { Tables, Enums } from "@/database.types";
import { showStateType } from "./boards/select";

export type tablesName = "albums" | "sermons" | "users";

export type AlbumRow = Tables<"albums">;
export type SermonRow = Tables<"sermons">;
export type UserRow = Tables<"users">;
export type MemberRow = Tables<"members">;
export type roleEum = Enums<"user_role">;

export type RoleWithMember = MemberRow & {
  admin: {
    role: roleEum;
  } | null;
  avatar_url: string | null;
};

export type AlbumWithName = AlbumRow & {
  origin: {
    name: string | null;
  };
  editor: {
    name: string | null;
  };
  imgUrl: string | null;
};

/**
 * boardTables
 */
export type boardTables = AlbumRow | SermonRow;

export type ChangeShowPayload = {
  payload: {
    updated_at: string;
    is_Show: showStateType;
    edit_writer: string;
  };
  name: tablesName;
  id: string;
};

export type MemberAddPayload = {
  payload: {
    created_at: string;
    updated_at: string;
    zonecode?: string | null;
    addr?: string | null;
    addr_detail?: string | null;
    avatar?: string | null;
    duty?: string | null;
    email: string;
    name: string;
    phone: string;
    position?: string | null;
  };
  imgFile?: File | null;
};

export type MemberEditPayload = {
  payload: {
    updated_at: string;
    zonecode?: string | null;
    addr?: string | null;
    addr_detail?: string | null;
    duty?: string | null;
    email?: string;
    name?: string;
    phone?: string;
    position?: string | null;
    avatar_url?: string | null;
  };
  role?: roleEum;
  uid: string;
  memId: string;
  imgFile?: File | null;
};

export type AddYoutubePayload = {
  created_at: string;
  updated_at: string;
  title: string;
  video_id: string;
  youtube_URL: string;
  published_date: string;
  thumbnail: string;
  description: string;
};

export type AddAlbumPayload = {
  payload: {
    created_at: string;
    updated_at: string | null;
    title: string | null;
    origin_writer: string | null;
  };
  imgFile: File | null;
};

export type EditAlbumPayload = {
  payload: {
    id: number;
    updated_at: string | null;
    title: string | null;
    edit_writer: string | null;
    is_show: boolean;
  };
  imgPath: string;
  imgFile: File | null;
};
