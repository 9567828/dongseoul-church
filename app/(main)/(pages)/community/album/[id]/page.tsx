import { Suspense } from "react";
import AlbumDetail from "./AlbumDetail";
import { createServClient } from "@/utils/supabase/services/serverClinet";
import { select } from "@/utils/supabase/sql/select";
const { selectOne } = select();

interface IParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: IParams) {
  const { id } = await params;
  const supabase = await createServClient();
  const { data } = await selectOne({ name: "albums", id, supabase });

  return {
    title: data.title,
  };
}

// export async function generateMetadata({ params }) {}

export default async function Page({ params }: IParams) {
  const { id } = await params;
  return (
    <Suspense>
      <AlbumDetail id={id} />
    </Suspense>
  );
}
