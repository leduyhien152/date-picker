import { useEffect, useState } from 'react';
import Head from 'next/head';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import DatePicker from '../components/DatePicker';
import RangePicker from '../components/RangePicker';
import { default as DatePickerV2 } from '../components/DatePickerV2';
import { default as RangePickerV2 } from '../components/RangePickerV2';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const [date, setDate] = useState(new Date());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [date2, setDate2] = useState(new Date());

  const [startDate2, setStartDate2] = useState<Date | null>(null);
  const [endDate2, setEndDate2] = useState<Date | null>(null);

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>Date picker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center py-10 gap-y-10">
        <p>
          {date2
            ? format(date2, 'ccc, dd MMM HH:mm', { locale: enGB })
            : 'none'}
        </p>
        <DatePickerV2 date={date2} setDate={setDate2} />

        <p>
          {startDate2
            ? format(startDate2, 'ccc, dd MMM HH:mm', { locale: enGB })
            : 'none'}
          {' - '}
          {endDate2
            ? format(endDate2, 'ccc, dd MMM HH:mm', { locale: enGB })
            : 'none'}
        </p>
        <RangePickerV2
          startDate={startDate2}
          setStartDate={setStartDate2}
          endDate={endDate2}
          setEndDate={setEndDate2}
        />

        <p>
          {date ? format(date, 'ccc, dd MMM HH:mm', { locale: enGB }) : 'none'}
        </p>
        <DatePicker date={date} setDate={setDate} />

        <p>
          {startDate
            ? format(startDate, 'ccc, dd MMM HH:mm', { locale: enGB })
            : 'none'}
          {' - '}
          {endDate
            ? format(endDate, 'ccc, dd MMM HH:mm', { locale: enGB })
            : 'none'}
        </p>
        <RangePicker {...{ startDate, setStartDate, endDate, setEndDate }} />
      </main>
    </div>
  );
};

export default Home;
