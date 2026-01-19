import style from './input.module.scss';
import { formatDateStr } from '@/utils/drawCalendar';

interface IDateProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function DatesInput({ startDate, endDate }: IDateProps) {
  const text =
    startDate && !endDate
      ? `${formatDateStr(startDate)} ~ yyyy-mm-dd`
      : startDate && endDate
        ? `${formatDateStr(startDate)} ~ ${formatDateStr(endDate)}`
        : `yyyy-mm-dd ~ yyyy-mm-dd`;

  return (
    <div className={style['date-container']}>
      <div className={`${style['date-input']}`}>
        <div>
          <p>{text}</p>
        </div>
        <i className={style.label}></i>
      </div>
    </div>
  );
}
