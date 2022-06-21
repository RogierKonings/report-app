import { Observable } from "rxjs";

export interface MT940 {
  transactionReference: number;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
}

export interface MT940Parser {
  // getMT940(data: string | ArrayBuffer): Array<MT940>;
  parseToMT940List(data: string, options?: CSVParserOptions): Array<MT940>;
  // mapToMT940(record: any): MT940;
}

export interface CSVParserOptions {
  delimiter: ',' | ';';
  hasHeader: boolean;
}
