"use client";

import { useHooks } from "@/hooks/useHooks";
import style from "./page.module.scss";
import { IPagenation } from "@/utils/pagenation";

export default function Pagenation({ count, currPage, listNum }: IPagenation) {
  const { useRoute } = useHooks();

  const totalPage = Math.ceil(count / listNum);
  const pagesPerBlock = 5;

  const currBlock = Math.ceil(currPage / pagesPerBlock);
  const startPage = (currBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPage);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("size", String(listNum));
    useRoute(`?${params.toString()}`);
  };

  return (
    <div className={style.wrapper}>
      <div className={style["btn-wrap"]}>
        <button className={style["nav-btn"]} onClick={() => handleChangePage(1)} disabled={currPage === 1}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.9999 19L6.99988 12L12.9999 5"
              stroke="#9D744C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.9998 18.9999L10.9998 11.9999L16.9998 4.99988"
              stroke="#9D744C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={style["nav-btn"]}
          onClick={() => handleChangePage(startPage - 1)}
          disabled={currPage === 1 || startPage === 1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 2.33331L5 7.90056L11 13.6666"
              stroke="#9D744C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={style["page-btn"]}>
        {pageNumbers.map((p) => (
          <button
            key={p}
            className={`${style.num} ${currPage === p ? style.active : ""}`.trim()}
            onClick={() => handleChangePage(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className={style["btn-wrap"]}>
        <button
          className={style["nav-btn"]}
          onClick={() => handleChangePage(endPage + 1)}
          disabled={currPage === totalPage || endPage === totalPage}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 2.33331L11 7.90056L5 13.6666"
              stroke={"#9D744C"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className={style["nav-btn"]} onClick={() => handleChangePage(totalPage)} disabled={currPage === totalPage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.0001 19L17.0001 12L11.0001 5"
              stroke="#9D744C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.00024 18.9999L13.0002 11.9999L7.00024 4.99988"
              stroke="#9D744C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
