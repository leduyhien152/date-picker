import { set } from 'date-fns';

export const getDateWithoutTime = (date: Date = new Date()) =>
  set(date, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
