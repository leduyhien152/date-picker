import { useState } from 'react';
import { DatePickerCalendar } from 'react-nice-dates';
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
} from 'date-fns';
import { enGB } from 'date-fns/locale';

import 'react-nice-dates/build/style.css';

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: Props) => {
  const [monthYear, setMonthYear] = useState(new Date());

  return (
    <div className="w-full max-w-lg border-2 border-gray-100 relative">
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
      <div className="flex justify-center items-center gap-x-3 py-4">
        <select
          name="hour"
          className="w-20 h-10 text-center outline-none rounded hover:bg-gray-200"
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
          className="w-20 h-10 text-center outline-none rounded hover:bg-gray-200"
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
  );
};

export default DatePicker;
