import { FileTypes, MT940 } from '../models';

export const isValidEndBalance = (mt940: MT940): boolean =>
  (Math.round(mt940.startBalance * 100) + Math.round(mt940.mutation * 100)) /
    100 ===
  mt940.endBalance;

export const isUniqueValue = (value: unknown, values: MT940[]): boolean =>
  values.filter((mt940: MT940) => mt940.transactionReference === value)
    .length === 1;

export const isValidString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

export const isSupportedType = (type: string): boolean =>
  type === FileTypes.CSV || type === FileTypes.XML;

export const isNumeric = (value: unknown): boolean =>
  typeof value === 'number' ||
  value instanceof Number ||
  (isValidString(value) && !isNaN(<unknown>value as number) && !isNaN(parseFloat(value)));
