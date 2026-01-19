import {
  drawMonth,
  drawWeeks,
  formatDateStr,
  formatTodayAm,
  getAfterDate,
  getThisEndDate,
  getThisFirstDate,
  getYesterday,
  handleNextMonth,
  handlePrevMonth,
  isBetween,
  today,
  todayStr,
} from '@/utils/drawCalendar';
import style from './filter.module.scss';
import { useEffect, useState } from 'react';
import { PeriodState } from './FilterDate';
import { format, isSameDay, parseISO } from 'date-fns';
import DatesInput from '../input-box/DatesInput';
import { filterDateType } from '@/utils/propType';

interface ICalendarProps {
  onCancelPicker: () => void;
  period: PeriodState;
  isRange: boolean;
  applyRange: filterDateType;
  onDraftRange: (range: filterDateType) => void;
  onReset: () => void;
}

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const formatMonth = (year: number, month: number) => {
  const d = new Date(year, month);

  return d
    .toLocaleDateString('en-US', {
      month: 'long',
    })
    .replace(/\s/g, '');
};

type SelectDate = { startDate: Date | null; endDate: Date | null; isOneDay: boolean };

const INITIAL_SELECT_DATE = {
  startDate: null,
  endDate: null,
  isOneDay: false,
};

export default function FilterCalendar({
  onCancelPicker,
  isRange,
  period,
  applyRange,
  onDraftRange,
  onReset,
}: ICalendarProps) {
  const [year, setYear] = useState(today().getFullYear());
  const [month, setMonth] = useState(today().getMonth());
  const [selectDate, setSelectDate] = useState<SelectDate>({
    startDate: applyRange.startDate ? parseISO(applyRange.startDate) : null,
    endDate: applyRange.endDate ? parseISO(applyRange.endDate) : null,
    isOneDay: applyRange.isOneDay,
  });

  const { allWeeks } = drawMonth(year, month);
  const { start, end, getThisWeek } = drawWeeks();

  const handleCancel = () => {
    onCancelPicker();
    setSelectDate(INITIAL_SELECT_DATE);
    onReset();
  };

  useEffect(() => {
    const startDate = selectDate.startDate;
    const endDate = selectDate.endDate;

    if (!startDate) {
      onDraftRange({ startDate: null, endDate: null, isOneDay: false });
    }

    if (startDate && !endDate) {
      onDraftRange({ startDate: startDate?.toISOString(), endDate: null, isOneDay: false });
    }

    if (startDate && endDate) {
      onDraftRange({ startDate: startDate.toISOString(), endDate: endDate.toISOString(), isOneDay: false });

      if (isSameDay(startDate, endDate)) {
        onDraftRange({
          startDate: startDate.toISOString(),
          endDate: getAfterDate(endDate).toISOString(),
          isOneDay: true,
        });
      }
    }
  }, [selectDate]);

  useEffect(() => {
    const hasActivePeriod = Object.values(period).some(Boolean);

    if (hasActivePeriod) {
      setYear(today().getFullYear());
      setMonth(today().getMonth());
    }

    if (period.today) {
      setSelectDate({ startDate: formatTodayAm(), endDate: getAfterDate(formatTodayAm()), isOneDay: true });
      onDraftRange({
        startDate: formatTodayAm().toISOString(),
        endDate: getAfterDate(formatTodayAm()).toISOString(),
        isOneDay: true,
      });
    }

    if (period.yesterDay) {
      setSelectDate({ startDate: getYesterday(), endDate: getAfterDate(getYesterday()), isOneDay: true });
      onDraftRange({
        startDate: getYesterday().toISOString(),
        endDate: getAfterDate(getYesterday()).toISOString(),
        isOneDay: true,
      });
    }

    if (period.thisWeek) {
      setSelectDate({ startDate: start, endDate: end, isOneDay: false });
    }

    if (period.thisMonth) {
      setSelectDate({ startDate: getThisFirstDate(), endDate: getThisEndDate(), isOneDay: false });
    }
  }, [period]);

  const handleClickDate = (date: Date) => {
    setSelectDate((prev) => {
      if (prev.startDate && prev.endDate) {
        return {
          startDate: date,
          endDate: null,
          isOneDay: false,
        };
      }

      if (prev.startDate && !prev.endDate) {
        const start = prev.startDate;
        const end = date;

        if (start.getTime() === end.getTime()) {
          return {
            startDate: start,
            endDate: end,
            isOneDay: true,
          };
        }

        if (end < start) {
          return {
            startDate: end,
            endDate: start,
            isOneDay: false,
          };
        }

        return {
          startDate: start,
          endDate: end,
          isOneDay: false,
        };
      }

      return {
        startDate: date,
        endDate: null,
        isOneDay: false,
      };
    });
  };

  return (
    <div>
      <DatesInput startDate={selectDate.startDate} endDate={selectDate.endDate} />
      <div className={style['cal-container']}>
        <div>
          <div className={style['date-header']}>
            <div className={style['header-meta']}>
              <p>{formatMonth(year, month)}</p>
              <p>{year}</p>
            </div>

            <div className={style['btn-wrap']}>
              <button
                type="button"
                className={style['move-btn']}
                onClick={() => {
                  const prev = handlePrevMonth(year, month);
                  setYear(prev.year);
                  setMonth(prev.month);
                }}
              >
                <img src="/imgs/admin/icons/calendar/ic_Chevron-left.svg" alt="이전달" />
              </button>
              <button
                type="button"
                className={style['move-btn']}
                onClick={() => {
                  const next = handleNextMonth(year, month);
                  setYear(next.year);
                  setMonth(next.month);
                }}
              >
                <img src="/imgs/admin/icons/calendar/ic_Chevron-right.svg" alt="다음달" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <ul className={style['date-wrap']}>
            {WEEKS.map((w) => (
              <li key={w} className={`${w === 'sun' || w === 'sat' ? style.weekend : ''}`.trim()}>
                <p>{w}</p>
              </li>
            ))}
          </ul>
          <div className={style['date-container']}>
            {allWeeks.map((w, index) => (
              <ul key={index} className={style['date-wrap']}>
                {w.map((d, i) => {
                  const date = d.getDate();
                  const weekend = d.getDay() === 0 || d.getDay() === 6;
                  const otherMonth = month !== d.getMonth();
                  const isThisMonth = formatTodayAm().getMonth() === d.getMonth();
                  const dateStr = format(d, 'yyyy-MM-dd');
                  const isToday = todayStr() === dateStr;
                  const isYester = dateStr === format(getYesterday(), 'yyyy-MM-dd');
                  const isThisWeek = getThisWeek().some((w) => formatDateStr(w) === dateStr);

                  const tday = period.today;
                  const yester = period.yesterDay;
                  const thisWeek = period.thisWeek;
                  const thisMonth = period.thisMonth;
                  const isStartM = formatDateStr(getThisFirstDate()) === dateStr;
                  const isEndM = formatDateStr(getThisEndDate()) === dateStr;
                  const isStartW = formatDateStr(start) === dateStr;
                  const isEndW = formatDateStr(end) === dateStr;

                  const isStartD = selectDate.startDate && isSameDay(d, selectDate.startDate);
                  const isEndD = selectDate.endDate && isSameDay(d, selectDate.endDate);

                  const isActive =
                    !selectDate.isOneDay &&
                    selectDate.startDate &&
                    selectDate.endDate &&
                    (isStartD || isEndD || isBetween(d, selectDate.startDate, selectDate.endDate));

                  return (
                    <li
                      key={i}
                      className={`${style.dates} ${weekend ? style.weekend : ''} ${otherMonth ? style.other : ''} ${
                        (tday && isToday) ||
                        (yester && isYester) ||
                        (selectDate.isOneDay && selectDate.startDate?.getTime() === d.getTime())
                          ? style.active
                          : ''
                      } ${(thisMonth && isThisMonth) || (thisWeek && isThisWeek) || (isActive && !selectDate.isOneDay) ? style.range : ''} ${
                        (thisMonth && isStartM) || (thisWeek && isStartW) || (isStartD && !selectDate.isOneDay)
                          ? style.rangeStart
                          : ''
                      } ${(thisMonth && isEndM) || (thisWeek && isEndW) || (isEndD && !selectDate.isOneDay) ? style.rangeEnd : ''}`.trim()}
                    >
                      <button
                        type="button"
                        id={d.toISOString()}
                        data-date={d}
                        onClick={() => handleClickDate(d)}
                        disabled={!isRange}
                        className={`${isToday ? style.today : ''}`.trim()}
                      >
                        <span>{date}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
          <div className={style['sel-btn-wrap']}>
            <button type="button" className={`${style['sel-btn']} ${style.cancel}`} onClick={handleCancel}>
              선택해제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
