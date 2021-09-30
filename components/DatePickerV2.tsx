import { useState } from 'react';
import { DatePickerCalendar } from 'react-nice-dates';
import { getHours, getMinutes, set, setHours, setMinutes } from 'date-fns';
import { enGB } from 'date-fns/locale';
import DateOverlay from './DateOverlay';
import 'react-nice-dates/build/style.css';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

type CalendarState = 'DAY' | 'MONTH' | 'YEAR';

const DatePicker = ({ date, setDate }: Props) => {
  const today = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [monthYear, setMonthYear] = useState(today);
  const [calendarState, setCalendarState] = useState<CalendarState>('DAY');

  return (
    <div className="w-full max-w-lg border-2 border-gray-100">
      <div className="relative">
        <DateOverlay
          {...{
            calendarState,
            setCalendarState,
            monthYear,
            setMonthYear,
          }}
        />
        <DatePickerCalendar
          locale={enGB}
          date={date}
          onDateChange={(date) => {
            if (date) {
              setDate(date);
              setMonthYear(date);
            }
          }}
          month={monthYear}
          onMonthChange={(date) => {
            if (date) {
              setMonthYear(date);
            }
          }}
        />
      </div>
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
        <span
          className="text-blue-500 cursor-pointer hover:text-blue-400"
          onClick={() => {
            setDate(today);
          }}
        >
          Today
        </span>
        <div className="flex gap-x-3">
          <select
            name="hour"
            className="w-20 h-10 text-center outline-none border rounded bg-transparent hover:bg-gray-200"
            value={getHours(date)}
            onChange={(e) => {
              setDate(setHours(date, Number(e.target.value)));
            }}
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
            value={getMinutes(date)}
            onChange={(e) => {
              setDate(setMinutes(date, Number(e.target.value)));
            }}
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

export default DatePicker;
