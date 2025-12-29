import { pageQueryProps } from "./propType";

export interface IPagenation {
  totalPage: number;
  pagesPerBlock: number;
  currPage: number;
  listNum: number;
}

export const pageCalculate = (totalPage: number, currPage: number, pagesPerBlock: number) => {
  const currBlock = Math.ceil(currPage / pagesPerBlock);
  const startPage = (currBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPage);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return { startPage, endPage, pageNumbers };
};

export const getTotalPage = (count: number, listNum: number) => {
  return Math.ceil(count / listNum);
};

export const getSearchQuerys = (params: pageQueryProps, num: number) => {
  if (Array.isArray(params)) {
    return Number(params[0]) || num;
  }
  return Number(params) || num;
};
