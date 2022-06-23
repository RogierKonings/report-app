import { map, tap, throwError } from 'rxjs';
/**
 * Service responsible for the mapping of a CSV output to a list of MT940 Objects
 */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
      transactionReference: Number(record[0]),
      accountNumber: record[1],
      description: record[2],
      startBalance: Number(record[3]),
      mutation: Number(record[4]),
      endBalance: Number(record[5]),
    };
  }

  parseToMT940List(data: string, options: CSVParserOptions): Observable<MT940[] | Error> {
    const records = data.split(/\r\n|\n/).slice(1, -1);
    return of(records.map(record =>
      this.mapToMT940(record.split(options.delimiter))
    )).pipe(map(mt940arr => {
      if (mt940arr.every((mt940) => Object.keys(mt940).length === Object.keys(mt940arr[0]).length)) {
        return mt940arr;
      }
      return new Error('Unable to parse the text/xml type')
      // throwError(() => new Error('Unable to parse the text/xml type'))
    }))
  }
}
