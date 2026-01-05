import style from "./board.module.scss";

interface ICount {
  checkedLength: number;
  count: number;
}

export default function ListCount({ checkedLength, count }: ICount) {
  const number = checkedLength > 0 ? `${checkedLength} 건 선택` : `${count} 건`;
  return <p className={style.count}>총 {number}</p>;
}
