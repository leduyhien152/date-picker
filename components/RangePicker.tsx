import { useState } from 'react';
import { DateRangePickerCalendar } from 'react-nice-dates';
import {
  addMonths,
  format,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  startOfDay,
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import classNames from 'classnames';

import 'react-nice-dates/build/style.css';

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

type DateRangeFocus = 'startDate' | 'endDate';

const RangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const [monthYear, setMonthYear] = useState(new Date());
  const [focus, setFocus] = useState<DateRangeFocus>('startDate');

  const date = focus === 'startDate' ? startDate : endDate;
  const setDate = focus === 'startDate' ? setStartDate : setEndDate;

  const modifiers = {
    disabled: (date: Date) =>
      focus === 'startDate'
        ? !!endDate &&
          startOfDay(date).getTime() > startOfDay(endDate).getTime()
        : !!startDate &&
          startOfDay(date).getTime() < startOfDay(startDate).getTime(),
  };

  return (
    <div className="w-full max-w-lg border-2 border-gray-100 relative">
      <div className="border rounded-2xl m-5 px-5 py-8 bg-gray-200 relative">
        <div
          className={classNames(
            'absolute top-0 left-0 w-1/2 h-full bg-white rounded-2xl transition-all duration-200 ease-in-out transform',
            focus === 'startDate' ? 'translate-x-0' : 'translate-x-full',
          )}
        ></div>
        <div className="grid grid-cols-2 text-center items-center justify-center absolute top-0 left-0 w-full h-full cursor-pointer">
          <div onClick={() => setFocus('startDate')}>
            {startDate
              ? format(startDate, 'ccc, dd MMM HH:mm', { locale: enGB })
              : '-'}
          </div>
          <div onClick={() => setFocus('endDate')}>
            {endDate
              ? format(endDate, 'ccc, dd MMM HH:mm', { locale: enGB })
              : '-'}
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-0 z-50 w-full bg-white">
          <div className="nice-dates-navigation">
            <a
              className="nice-dates-navigation_previous p-0 pb-0"
              onClick={() => setMonthYear(addMonths(monthYear, -1))}
            />
            <div className="flex justify-center gap-x-3 col-span-2">
              <select
                name="month"
                className="w-36 h-10 text-center outline-none rounded hover:bg-gray-200"
                value={getMonth(monthYear)}
                onChange={(e) => {
                  setMonthYear(setMonth(monthYear, Number(e.target.value)));
                }}
              >
                {Array.from(Array(11).keys()).map((i) => (
                  <option value={i} key={i}>
                    {format(new Date(2000, i, 1), 'MMMM')}
                  </option>
                ))}
              </select>
              <select
                name="year"
                className="w-24 h-10 text-center outline-none rounded hover:bg-gray-200"
                value={getYear(monthYear)}
                onChange={(e) => {
                  setMonthYear(setYear(monthYear, Number(e.target.value)));
                }}
              >
                {Array.from(Array(101).keys()).map((i) => (
                  <option value={2000 + i} key={i}>
                    {2000 + i}
                  </option>
                ))}
              </select>
            </div>
            <a
              className="nice-dates-navigation_next"
              onClick={() => setMonthYear(addMonths(monthYear, 1))}
            />
          </div>
        </div>
        <DateRangePickerCalendar
          locale={enGB}
          modifiers={modifiers}
          focus={focus}
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          month={monthYear}
          onMonthChange={(date) => {
            if (date) {
              setMonthYear(date);
            }
          }}
        />
        <div className="flex justify-center items-center gap-x-3 py-4">
          <select
            name="hour"
            className="w-20 h-10 text-center outline-none rounded hover:bg-gray-200"
            value={date ? getHours(date) : 0}
            onChange={(e) => {
              if (date) {
                setDate(setHours(date, Number(e.target.value)));
              }
            }}
            disabled={!date}
          >
            {Array.from(Array(24).keys()).map((i) => (
              <option value={i} key={i}>
                {`${i}`.padStart(2, '0')}
              </option>
            ))}
          </select>
          <select
            name="minute"
            className="w-20 h-10 text-center outline-none rounded hover:bg-gray-200"
            value={date ? getMinutes(date) : 0}
            onChange={(e) => {
              if (date) {
                setDate(setMinutes(date, Number(e.target.value)));
              }
            }}
            disabled={!date}
          >
            {Array.from(Array(60).keys()).map((i) => (
              <option value={i} key={i}>
                {`${i}`.padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RangePicker;
