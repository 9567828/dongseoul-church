import { useState } from "react";
import Button from "../button/Button";
import SearchInput from "../input-box/SearchInput";
import style from "./board.module.scss";

interface IAction {
  needDel?: boolean;
  checks?: number;
  onDelete?: () => void;
}

export default function ActionField({ needDel = true, checks, onDelete }: IAction) {
  const [hover, setHover] = useState(false);

  const handleDelete = () => {
    if (checks && onDelete) {
      if (checks < 1) {
        alert("삭제할 데이터를 선택해 주세요");
        return;
      }
      onDelete();
    }
  };

  return (
    <div className={style["action-field"]}>
      <SearchInput variants="content" />
      <div className={style["btn-wrap"]}>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variants="secondary"
          visual="outline"
          btnName="필터"
          src={`/imgs/admin/icons/ic_filter${hover ? `-main` : ""}.svg`}
        />
        {needDel && <Button variants="delete" visual="outline" btnName="삭제" onClick={handleDelete} />}
      </div>
    </div>
  );
}
