import { ReactElement, useEffect, useState } from 'react';
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
import { da, enGB } from 'date-fns/locale';
import classNames from 'classnames';

import 'react-nice-dates/build/style.css';

interface HeaderButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const HeaderButton = ({ children, onClick }: HeaderButtonProps) => (
  <span
    className="text-blue-500 cursor-pointer hover:text-blue-400"
    onClick={onClick}
  >
    {children}
  </span>
);

interface ContentButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const ContentButton = ({ children, onClick, selected }: ContentButtonProps) => (
  <span
    className={classNames(
      'cursor-pointer rounded-full py-2 hover:bg-blue-400',
      { 'bg-blue-500 text-white': selected },
    )}
    onClick={onClick}
  >
    {children}
  </span>
);

type CalendarState = 'DAY' | 'MONTH' | 'YEAR';

interface HeaderProps {
  calendarState: CalendarState;
  setCalendarState: (calendarState: CalendarState) => void;
  monthYear: Date;
  setMonthYear: (monthYear: Date) => void;
}

const Header = ({
  calendarState,
  setCalendarState,
  monthYear,
  setMonthYear,
}: HeaderProps) => {
  const fromYear = 1990;
  const [page, setPage] = useState(
    Math.floor((getYear(monthYear) - fromYear) / 12),
  );
  const [displayYear, setDisplayYear] = useState(getYear(monthYear));

  useEffect(() => {
    setPage(Math.floor((getYear(monthYear) - fromYear) / 12));
    setDisplayYear(getYear(monthYear));
  }, [monthYear]);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const datesNavigation = document.querySelector('.nice-dates-navigation');
    if (datesNavigation) {
      setHeaderHeight(datesNavigation.clientHeight);
    }
  }, []);

  useEffect(() => {
    const datesWeekHeader = document.querySelector('.nice-dates-week-header');
    const datesGrid = document.querySelector('.nice-dates-grid');
    if (datesWeekHeader && datesGrid) {
      setContentHeight(datesWeekHeader.clientHeight + datesGrid.clientHeight);
    }
    return () => {
      setContentHeight(0);
    };
  }, [calendarState]);

  return (
    <>
      <div
        className="absolute top-0 z-50 w-full bg-white flex items-center justify-between px-6"
        style={{ height: headerHeight }}
      >
        {
          {
            DAY: (
              <>
                <div className="flex gap-x-3">
                  <HeaderButton onClick={() => setCalendarState('MONTH')}>
                    {format(monthYear, 'MMMM')}
                  </HeaderButton>
                  <HeaderButton onClick={() => setCalendarState('YEAR')}>
                    {format(monthYear, 'yyyy')}
                  </HeaderButton>
                </div>
                <div className="flex gap-x-3">
                  <HeaderButton>{'<'}</HeaderButton>
                  <HeaderButton>{'>'}</HeaderButton>
                </div>
              </>
            ),
            MONTH: (
              <>
                <HeaderButton>{displayYear}</HeaderButton>
                <div className="flex gap-x-3">
                  <HeaderButton
                    onClick={() => {
                      setDisplayYear(Math.max(displayYear - 1, fromYear));
                    }}
                  >
                    {'<'}
                  </HeaderButton>
                  <HeaderButton
                    onClick={() => {
                      setDisplayYear(displayYear + 1);
                    }}
                  >
                    {'>'}
                  </HeaderButton>
                </div>
              </>
            ),
            YEAR: (
              <>
                <HeaderButton>{`${fromYear + page * 12} - ${
                  fromYear + page * 12 + 11
                }`}</HeaderButton>
                <div className="flex gap-x-3">
                  <HeaderButton
                    onClick={() => {
                      setPage(Math.max(page - 1, 0));
                    }}
                  >
                    {'<'}
                  </HeaderButton>
                  <HeaderButton
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  >
                    {'>'}
                  </HeaderButton>
                </div>
              </>
            ),
          }[calendarState]
        }
      </div>
      <div
        className="absolute top-0 z-50 w-full bg-white transition-all duration-200"
        style={{
          top: headerHeight,
          height: contentHeight,
          opacity: calendarState === 'DAY' ? '0.5' : '1',
          transform: calendarState === 'DAY' ? 'scale(0)' : 'scale(1)',
        }}
      >
        {
          {
            DAY: <></>,
            MONTH: (
              <div className="grid grid-cols-3 gap-x-7 px-7 w-full h-full text-center items-center">
                {Array.from(Array(12).keys()).map((i) => (
                  <ContentButton
                    key={i}
                    selected={
                      i === getMonth(monthYear) &&
                      displayYear === getYear(monthYear)
                    }
                    onClick={() => {
                      setMonthYear(
                        setYear(setMonth(monthYear, i), displayYear),
                      );
                      setCalendarState('DAY');
                    }}
                  >
                    {format(new Date(2000, i, 1), 'MMMM')}
                  </ContentButton>
                ))}
              </div>
            ),
            YEAR: (
              <div className="grid grid-cols-3 gap-x-7 px-7 w-full h-full text-center items-center">
                {Array.from(Array(12).keys()).map((i) => (
                  <ContentButton
                    key={i}
                    selected={fromYear + page * 12 + i === getYear(monthYear)}
                    onClick={() => {
                      setMonthYear(
                        setYear(monthYear, fromYear + page * 12 + i),
                      );
                      setCalendarState('DAY');
                    }}
                  >
                    {fromYear + page * 12 + i}
                  </ContentButton>
                ))}
              </div>
            ),
          }[calendarState]
        }
      </div>
    </>
  );
};

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

const DatePicker = ({ date, setDate }: Props) => {
  const [monthYear, setMonthYear] = useState(new Date());
  const [calendarState, setCalendarState] = useState<CalendarState>('DAY');

  return (
    <div className="w-full max-w-lg border-2 border-gray-100 relative">
      {/* <div className="absolute top-0 z-50 w-full bg-white"> */}
      <Header
        {...{
          calendarState,
          setCalendarState,
          monthYear,
          setMonthYear,
        }}
      />
      {/* </div> */}
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
