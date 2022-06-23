import { FileTypes, MT940 } from '../models';

export const isValidEndBalance = (
  startBalance: number,
  mutation: number,
  endBalance: number
): boolean =>
  (Math.round(startBalance * 100) + Math.round(mutation * 100)) / 100 ===
  endBalance;

export const isUniqueValue = (value: unknown, values: MT940[]): boolean =>
  values.filter((mt940: MT940) => mt940.transactionReference === value)
    .length === 1;

export const isValidString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

export const isSupportedType = (type: string): type is FileTypes =>
  type === FileTypes.CSV || type === FileTypes.XML;

export const isNumeric = (value: unknown): boolean =>
  !isNaN((<unknown>value) as number) &&
  !isNaN(parseFloat((<unknown>value) as string));
