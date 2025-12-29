import { IParams, userListArr } from "@/utils/propType";
import UserForm from "../_component/UserForm";

export default async function Page({ params }: IParams) {
  const { id } = await params;

  const user = userListArr.find((u) => u.id === Number(id));

  return <UserForm mode="readOnly" userId={id} userObj={user} />;
}
