import { IParams } from "@/utils/propType";
import AlbumForm from "../../_components/AlbumForm";

export default async function Page({ params }: IParams) {
  const { id } = await params;

  return <AlbumForm mode="edit" id={String(id)} />;
}
