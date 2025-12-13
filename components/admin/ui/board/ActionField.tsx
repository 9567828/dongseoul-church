import { useState } from "react";
import Button from "../button/Button";
import SearchInput from "../input-box/SearchInput";
import style from "./board.module.scss";

export default function ActionField() {
  const [hover, setHover] = useState(false);

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
        <Button variants="delete" visual="outline" btnName="삭제" />
      </div>
    </div>
  );
}
