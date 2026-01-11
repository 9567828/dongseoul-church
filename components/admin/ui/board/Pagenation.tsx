"use client";

import { IPagenation, pageCalculate } from "@/utils/pagenation";
import style from "./board.module.scss";
import { useState } from "react";
import { useHooks } from "@/hooks/useHooks";
import PageBtn from "./PageBtn";
import { handlers } from "@/utils/handlers";

export default function Pagenation({ currPage, count, listNum, tab }: IPagenation) {
  const { useRoute } = useHooks();
  const { handlePageSizeQuery } = handlers();
  const [hover, setHover] = useState<string | null>(null);

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = totalPage <= 4 ? 4 : currPage <= 3 ? 4 : 3;

  const { startPage, endPage, pageNumbers } = pageCalculate(totalPage, currPage, pagesPerBlock);

  const handleChangePage = (page: number) => {
    const query = handlePageSizeQuery(String(page), String(listNum), tab!);
    useRoute(query);
  };
  return (
    <div className={style["pagenation-wrap"]}>
      <button type="button" className={style["arrow-btn"]} onClick={() => handleChangePage(1)} disabled={currPage === 1}>
        <img src="/imgs/admin/icons/ic_chevron-left.svg" alt="맨앞으로" />
      </button>
      {totalPage >= 5 && currPage >= 4 && (
        <button
          type="button"
          id="left"
          className={style["arrow-btn"]}
          onClick={() => handleChangePage(currPage - 2)}
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
        >
          {hover !== "left" ? <span>...</span> : <img src="/imgs/admin/icons/ic_chevron-double-left.svg" alt="앞으로" />}
        </button>
      )}
      {currPage > 4 ? (
        <div>
          <PageBtn page={currPage - 1} currPage={currPage} onClick={() => handleChangePage(currPage - 1)} />
          <PageBtn page={currPage} currPage={currPage} onClick={() => {}} />
          {currPage !== totalPage && (
            <PageBtn page={currPage + 1} currPage={currPage} onClick={() => handleChangePage(currPage + 1)} />
          )}
        </div>
      ) : (
        pageNumbers.map((p) => <PageBtn key={p} currPage={currPage} page={p} onClick={() => handleChangePage(p)} />)
      )}
      {totalPage >= 3 && endPage !== totalPage && (
        <button
          type="button"
          id="right"
          className={style["arrow-btn"]}
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => handleChangePage(currPage + 2)}
        >
          {hover !== "right" ? <span>...</span> : <img src="/imgs/admin/icons/ic_chevron-double-right.svg" alt="뒤로" />}
        </button>
      )}
      {totalPage >= 5 && endPage !== totalPage && (
        <button type="button" className={`${style["page-btn"]}`} onClick={() => handleChangePage(totalPage)}>
          <span>{totalPage}</span>
        </button>
      )}
      <button
        type="button"
        className={style["arrow-btn"]}
        onClick={() => handleChangePage(totalPage)}
        disabled={currPage === totalPage}
      >
        <img src="/imgs/admin/icons/ic_chevron-right.svg" alt="맨뒤로" />
      </button>
    </div>
  );
}
