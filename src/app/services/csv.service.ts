/**
 * Service responsible for the mapping of a CSV output to a list of MT940 Objects
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CSVParserOptions,
  MT940,
  MT940Parser,
} from 'src/app/models/mt940.model';

@Injectable({
  providedIn: 'root',
})
export class CSVService implements MT940Parser {
  // public getMT940(data: string | ArrayBuffer): Observable<Array<MT940>> {
  //   const records = (data as string).split(/\r\n|\n/);
  //   const headers = (records[0] as string).split(',');
  //   return this.parseToList(records, headers.length);
  // }

  mapToMT940(record: Array<string>): MT940 {
    return {
      transactionReference: Number(record[0].trim()),
      accountNumber: record[1].trim(),
      description: record[2].trim(),
      startBalance: Number(record[3].trim()),
      mutation: Number(record[4].trim()),
      endBalance: Number(record[5].trim()),
    };
  }

  parseToMT940List(
    data: string,
    options: CSVParserOptions
  ): Array<MT940> {
    const records = (data as string).split(/\r\n|\n/);
    let headerLength = 0;
    let startRecord = 0;
    if (options.hasHeader && records.length > 0) {
      headerLength = (records[0] as string).split(options.delimiter).length;
      startRecord = 1;
    }
    const mt940arr: Array<MT940> = [];
    for (let i = startRecord; i < records.length; i++) {
      const splitRecords = (records[i] as string).split(options.delimiter);
      if (splitRecords.length === headerLength) {
        const mt940: MT940 = this.mapToMT940(splitRecords);
        mt940arr.push(mt940);
      }
    }
    if (mt940arr.length > 0) {
      return mt940arr;
    }
    throw new Error('Unable to parse the text/csv type');
  }
}
