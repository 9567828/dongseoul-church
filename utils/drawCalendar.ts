import { format } from "date-fns";

export const today = () => new Date();
export const todayStr = () => format(today(), "yyyy-MM-dd");
export const formatDateStr = (d: Date) => format(d, "yyyy-MM-dd");
export const getYesterday = () => {
  const y = today().setDate(today().getDate() - 1);
  const date = new Date(y);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const formatTodayAm = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return new Date(d);
};

export const getThisFirstDate = () => {
  const d = new Date(formatTodayAm().getFullYear(), formatTodayAm().getMonth(), 1);

  return d;
};

export const getThisEndDate = () => {
  const d = new Date(formatTodayAm().getFullYear(), formatTodayAm().getMonth() + 1, 0);
  return d;
};

export const getAfterDate = (date: Date) => {
  const d = new Date(date);

  d.setDate(d.getDate() + 1);

  return d;
};

export const isBetween = (target: Date, start: Date, end: Date) => {
  const t = target.setHours(0, 0, 0, 0);
  const s = start.setHours(0, 0, 0, 0);
  const e = end.setHours(0, 0, 0, 0);

  return t > s && t < e;
};

export const drawWeeks = () => {
  const dayOfWeek = formatTodayAm().getDay();

  const startOfWeek = new Date(today());
  startOfWeek.setDate(today().getDate() - dayOfWeek);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const getThisWeek = () => {
    let weeks: Date[] = [];
    const newDate = new Date(startOfWeek);

    for (let i = 0; i < 7; ++i) {
      const pushDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + i);
      weeks.push(pushDate);
    }

    return weeks;
  };

  return { start: startOfWeek, end: endOfWeek, getThisWeek };
};

export const drawMonth = (year: number, month: number) => {
  const firstDate = new Date(year, month, 1);
  const startDay = new Date(firstDate);
  startDay.setDate(1 - firstDate.getDay());

  const lastDate = new Date(year, month + 1, 0);
  const lastDay = new Date(lastDate);
  lastDay.setDate(lastDate.getDate() + (6 - lastDate.getDay()));

  let curWeeks: Date[] = [];
  let allWeeks: Date[][] = [];
  const curDate = new Date(startDay);

  while (curDate <= lastDay) {
    const newDate = new Date(curDate);
    curWeeks.push(newDate);
    if (curWeeks.length === 7) {
      allWeeks.push(curWeeks);
      curWeeks = [];
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return { year, month, firstDate, lastDate, allWeeks };
};

export const handlePrevMonth = (year: number, month: number) => {
  const d = new Date(year, month - 1, 1);

  return { year: d.getFullYear(), month: d.getMonth() };
};

export const handleNextMonth = (year: number, month: number) => {
  const d = new Date(year, month + 1, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
};
