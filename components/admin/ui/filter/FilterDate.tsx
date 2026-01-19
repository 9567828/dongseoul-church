'use client';

import { useEffect, useState } from 'react';
import CheckBox from '../check-box/CheckBox';
import style from './filter.module.scss';
import FilterContent from './FilterContent';
import DatesInput from '../input-box/DatesInput';
import FilterCalendar from './FilterCalendar';
import FilterHead from './FilterHead';
import { filterDateType } from '@/utils/propType';
import { tabStatusType } from '../board/BoardTab';
import { handlers } from '@/utils/handlers';
import { useHooks } from '@/hooks/useHooks';

interface IDateprops {
  onConfirm: () => void;
  onReset: () => void;
  onDraftRange: (range: filterDateType) => void;
  applyRange: filterDateType;
}

const datePeriod = [
  { id: 'today', name: '오늘' },
  { id: 'yesterDay', name: '어제' },
  { id: 'thisWeek', name: '이번주' },
  { id: 'thisMonth', name: '이번달' },
];

export type PeriodState = {
  today: boolean;
  yesterDay: boolean;
  thisWeek: boolean;
  thisMonth: boolean;
};

const INITIAL_PERIOD = {
  today: false,
  yesterDay: false,
  thisWeek: false,
  thisMonth: false,
};

export default function FilterDate({ onDraftRange, onConfirm, onReset, applyRange }: IDateprops) {
  const [period, setPeriod] = useState<PeriodState>(INITIAL_PERIOD);
  const [openRange, setOpenRange] = useState(false);

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <FilterContent onConfirm={handleConfirm}>
      <div>
        <FilterHead title="Dates" />
        <div className={style['select-period']}>
          <div className={style['period-wrap']}>
            {datePeriod.map((d, i) => {
              const active = period[d.id as keyof PeriodState];

              return (
                <button
                  key={i}
                  id={d.id}
                  className={`${style.period} ${active ? style.active : ''}`.trim()}
                  onClick={(e) => {
                    const key = d.id as keyof PeriodState;
                    if (e.currentTarget.id === d.id) {
                      setPeriod((prev) => ({
                        ...INITIAL_PERIOD,
                        [d.id]: !prev[key],
                      }));
                    }
                    setOpenRange(false);
                  }}
                >
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>
          <CheckBox
            id="range"
            variants="main"
            checked={openRange}
            onChange={(e) => {
              setOpenRange((prev) => !prev);
              setPeriod(INITIAL_PERIOD);
            }}
          >
            <label htmlFor="range" className={style.label}>
              범위지정
            </label>
          </CheckBox>
        </div>

        <FilterCalendar
          onDraftRange={onDraftRange}
          onReset={onReset}
          applyRange={applyRange}
          isRange={openRange}
          period={period}
          onCancelPicker={() => setPeriod(INITIAL_PERIOD)}
        />
      </div>
    </FilterContent>
  );
}
