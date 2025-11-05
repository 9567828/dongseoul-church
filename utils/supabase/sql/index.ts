import { Tables } from "@/database.types";

export type tablesName = "albums" | "sermons" | "users";

export type AlbumRow = Tables<"albums">;
export type SermonRow = Tables<"sermons">;

export type tables = AlbumRow | SermonRow;
