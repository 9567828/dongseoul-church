import style from "./board.module.scss";

interface IPageBtn {
  page: number;
  currPage: number;
  onClick: () => void;
}

export default function PageBtn({ page, currPage, onClick }: IPageBtn) {
  return (
    <button type="button" className={`${style["page-btn"]} ${currPage === page ? style.active : ""}`.trim()} onClick={onClick}>
      <span>{page}</span>
    </button>
  );
}
