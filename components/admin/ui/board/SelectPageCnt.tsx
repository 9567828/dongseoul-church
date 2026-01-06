// "use client";

import { useHooks } from "@/hooks/useHooks";
import SelectBox from "../select-box/SelectBox";
import style from "./board.module.scss";
import { handlers } from "@/utils/handlers";
import { tabStatusType } from "./BoardTab";

const pageCnt = ["6", "12", "24", "48", "100"];

interface ISelectPage {
  value: string;
  onChange: (item: string) => void;
  tab: tabStatusType;
}

export default function SelectPageCnt({ value, onChange, tab }: ISelectPage) {
  const { useRoute } = useHooks();
  const { handlePageSizeQuery } = handlers();

  return (
    <div className={style["page-cnt-wrap"]}>
      <p>표시개수:</p>
      <SelectBox
        variant="number"
        optList={pageCnt}
        value={value ? value : pageCnt[0]}
        onChange={onChange}
        onClick={(value) => {
          const query = handlePageSizeQuery("1", value, tab);
          useRoute(query);
        }}
      />
    </div>
  );
}
