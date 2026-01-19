import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Button from "../button/Button";
import SearchInput from "../input-box/SearchInput";
import style from "./board.module.scss";

interface IAction {
  needDel?: boolean;
  checks?: number;
  onDelete?: () => void;
  onFilter: () => void;
  setState: Dispatch<SetStateAction<string>>;
}

export default function ActionField({ needDel = true, checks, onFilter, onDelete, setState }: IAction) {
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState("");

  const handleDelete = () => {
    if (checks! < 1) {
      alert("삭제할 데이터를 선택해 주세요");
      return;
    }
    onDelete!();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("검색어를 입력해 주세요");
      return;
    }

    setState(value);
  };

  return (
    <div className={style["action-field"]}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <SearchInput variants="content" value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      <div className={style["btn-wrap"]}>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onFilter}
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
