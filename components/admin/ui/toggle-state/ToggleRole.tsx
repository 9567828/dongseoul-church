import { roleList, UserFormType } from "@/utils/propType";
import ToggleOption from "./ToggleOption";
import ToggleState from "./ToggleState";
import RoleInfo from "../role-info/RoleInfo";
import { ChangeEvent } from "react";
import style from "./toggle.module.scss";
import Label from "../label/Label";
import { roleEum } from "@/utils/supabase/sql";

interface IRoleProps {
  mode: UserFormType;
  variant: "horizontal" | "vertical";
  role?: roleEum;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ToggleRole({ mode, variant, role, onChange }: IRoleProps) {
  return (
    <div className={`${style["role-wrap"]} ${style[variant]}`}>
      {mode !== "readOnly" || role === null ? (
        <ToggleState>
          {roleList.map((r, i) => (
            <ToggleOption key={i} inputName="role" state={r} checked={role === r} onChange={onChange} />
          ))}
        </ToggleState>
      ) : (
        <Label text={role as roleEum} variant={role === "super" ? "orange" : role === "admin" ? "purple" : "yellow"} />
      )}
      <RoleInfo variant={variant} />
    </div>
  );
}
