import SearchList from "@/app/(admin)/admin/search/(layout)/SearchList";
import { ISearchParams } from "@/utils/propType";
import { redirect } from "next/navigation";
import { select } from "@/utils/supabase/sql/boards/select";

export default async function Page({ searchParams }: ISearchParams) {
  const { keyword } = await searchParams;
  const { searchAll } = select();

  if (!keyword) {
    redirect("/admin/boards/albums");
  }

  return <SearchList keyword={String(keyword)} />;
}
