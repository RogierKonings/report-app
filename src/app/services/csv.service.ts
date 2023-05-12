import {map, tap, throwError} from 'rxjs'
/**
 * Service responsible for the mapping of a CSV output to a list of MT940 Objects
 */
import {Injectable} from '@angular/core'
import {Observable, of} from 'rxjs'

import {CSVParserOptions, MT940, MT940Parser} from 'src/app/models/mt940.model'

@Injectable({
  providedIn: 'root',
})
export class CSVService implements MT940Parser {
  parseToMT940List(data: string, options: CSVParserOptions): Observable<MT940[]> {
    const records = data
      .split(/\r\n|\n/)
      .slice(1)
      .filter((value) => value !== '')
    return of(records.map((record) => this.mapToMT940(record.split(options.delimiter))))
  }

  mapToMT940(record: string[]): MT940 {
    return {
      transactionReference: Number(record[0]),
      accountNumber: record[1],
      description: record[2],
      startBalance: Number(record[3]),
      mutation: Number(record[4]),
      endBalance: Number(record[5]),
    }
  }
}
