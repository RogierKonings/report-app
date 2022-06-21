import * as XmlParser from 'xml2js';

export interface MT940 {
  transactionReference: number;
  accountNumber: string;
  description: string;
  startBalance: number;
  mutation: number;
  endBalance: number;
}

export interface MT940Parser {
  parseToMT940List(data: string, options?: CSVParserOptions | XmlParser.ParserOptions): MT940[];
  mapToMT940(record: any): MT940;
}

export interface CSVParserOptions {
  delimiter: ',' | ';';
}
