import { parse } from 'date-fns';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const parseDate = (date: string) => {
  return parse(date, 'dd.MM.yyyy', new Date());
}
