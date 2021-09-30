import { useState } from 'react';
import { DateRangePickerCalendar } from 'react-nice-dates';
import {
  format,
  getHours,
  getMinutes,
  set,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import classNames from 'classnames';
import DateOverlay from './DateOverlay';
import { getDateWithoutTime } from '../utils/DateUtils';
import 'react-nice-dates/build/style.css';

interface Props {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
}

type DateRangeFocus = 'startDate' | 'endDate';
type CalendarState = 'DAY' | 'MONTH' | 'YEAR';

const RangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const today = getDateWithoutTime();
  const [monthYear, setMonthYear] = useState(today);
  const [calendarState, setCalendarState] = useState<CalendarState>('DAY');
  const [focus, setFocus] = useState<DateRangeFocus>('startDate');

  const date = focus === 'startDate' ? startDate : endDate;
  const setDate = focus === 'startDate' ? setStartDate : setEndDate;

  const isDisabledDate = (date: Date) =>
    focus === 'startDate'
      ? !!endDate && startOfDay(date).getTime() > startOfDay(endDate).getTime()
      : !!startDate &&
        startOfDay(date).getTime() < startOfDay(startDate).getTime();

  const modifiers = {
    disabled: (date: Date) => isDisabledDate(date),
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
        <div className="grid grid-cols-2 text-center items-center justify-center absolute top-0 left-0 w-full h-full">
          <div
            className="cursor-pointer flex items-center justify-center h-full"
            onClick={() => {
              setFocus('startDate');
              if (startDate) {
                setMonthYear(getDateWithoutTime(startDate));
              }
            }}
          >
            {startDate
              ? format(startDate, 'ccc, dd MMM HH:mm', { locale: enGB })
              : '-'}
          </div>
          <div
            className="cursor-pointer flex items-center justify-center h-full"
            onClick={() => {
              setFocus('endDate');
              if (endDate) {
                setMonthYear(getDateWithoutTime(endDate));
              }
            }}
          >
            {endDate
              ? format(endDate, 'ccc, dd MMM HH:mm', { locale: enGB })
              : '-'}
          </div>
        </div>
      </div>
      <div className="relative">
        <DateOverlay
          {...{
            calendarState,
            setCalendarState,
            monthYear,
            setMonthYear,
          }}
        />
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
      </div>
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
        <button
          className={classNames(
            'text-blue-500 hover:text-blue-400',
            isDisabledDate(today) ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          disabled={isDisabledDate(today)}
          onClick={() => {
            if (!isDisabledDate(today)) {
              setDate(today);
              setMonthYear(today);
            }
          }}
        >
          Today
        </button>
        <div className="flex gap-x-3">
          <select
            name="hour"
            className="w-20 h-10 text-center outline-none border rounded bg-transparent hover:bg-gray-200"
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
            className="w-20 h-10 text-center outline-none border rounded bg-transparent hover:bg-gray-200"
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
