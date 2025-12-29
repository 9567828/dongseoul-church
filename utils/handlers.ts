import { Dispatch, SetStateAction } from "react";
import { roleType } from "./propType";

export const handlers = () => {
  const handleCheckedRole = (role: roleType, setState: Dispatch<SetStateAction<roleType | null>>) => {
    if (role === "super") {
      setState("super");
    } else if (role === "admin") {
      setState("admin");
    } else {
      setState("nomal");
    }
  };
  const toggleAllChecked = (allChecked: boolean, setState: Dispatch<SetStateAction<string[]>>, list: any[]) => {
    if (allChecked) {
      setState([]);
    } else {
      setState(list.map((v) => String(v.id)));
    }
  };

  return { handleCheckedRole, toggleAllChecked };
};
