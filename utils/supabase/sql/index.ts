import { Tables, Enums } from "@/database.types";

export type tablesName = "albums" | "sermons" | "users";

export type AlbumRow = Tables<"albums">;
export type SermonRow = Tables<"sermons">;
export type UserRow = Tables<"users">;
export type MemberRow = Tables<"members">;
export type roleEum = Enums<"user_role">;

// export type RoleWithMember = MemberRow | adminRole;
export type RoleWithMember = MemberRow & {
  admin: {
    role: roleEum;
  } | null;
};

/**
 * boardTables
 */
export type boardTables = AlbumRow | SermonRow;

export type MemberAddPaylod = {
  created_at: string;
  updated_at: string;
  addr?: string | null;
  addr_detail?: string | null;
  avatar?: string | null;
  duty?: string | null;
  email: string;
  name: string;
  phone: string;
  position?: string | null;
};

export type MemberEditPaylod = {
  updated_at: string;
  addr?: string | null;
  addr_detail?: string | null;
  avatar?: string | null;
  duty?: string | null;
  email?: string;
  name: string;
  phone: string;
  position?: string | null;
};
