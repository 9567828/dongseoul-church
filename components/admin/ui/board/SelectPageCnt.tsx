// "use client";

import { useHooks } from "@/hooks/useHooks";
import SelectBox from "../select-box/SelectBox";
import style from "./board.module.scss";

const pageCnt = ["6", "12", "24", "48", "100"];

interface ISelectPage {
  value: string;
  onChange: (item: string) => void;
}

export default function SelectPageCnt({ value, onChange }: ISelectPage) {
  const { useRoute } = useHooks();

  const handleChangeSize = (size: number) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("size", String(size));
    useRoute(`?${params.toString()}`);
  };

  return (
    <div className={style["page-cnt-wrap"]}>
      <p>표시개수:</p>
      <SelectBox
        variant="number"
        optList={pageCnt}
        value={value ? value : pageCnt[0]}
        onChange={onChange}
        onClick={(value) => handleChangeSize(Number(value))}
      />
    </div>
  );
}
