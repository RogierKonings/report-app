import { MT940 } from 'src/app/models/mt940.model';

export const isValidEndBalance = (mt940: MT940): boolean =>
  (Math.round(mt940.startBalance * 100) + Math.round(mt940.mutation * 100)) /
    100 ===
  mt940.endBalance;

export const isUniqueValue = (value: any, values: Array<MT940>): boolean =>
  values.filter((mt940: MT940) => mt940.transactionReference === value)
    .length === 1;

export const isValidString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' || value instanceof Number;
