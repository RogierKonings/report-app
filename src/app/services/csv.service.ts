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

  mapToMT940(record: string[]): MT940 {
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
  ): MT940[] {
    const records = (data as string).split(/\r\n|\n/);
    const headerLength = (records[0] as string).split(options.delimiter).length;
    const startRecord = 1;
    const mt940arr: MT940[] = [];
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
