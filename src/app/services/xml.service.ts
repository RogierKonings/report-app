/**
 * Service responsible for the mapping of a XML output to a list of MT940 Objects
 */
import { Injectable } from '@angular/core';

import * as XmlParser from 'xml2js';

import { MT940, MT940Parser } from 'src/app/models/mt940.model';

@Injectable({
  providedIn: 'root',
})
export class XMLService implements MT940Parser {
  parseToMT940List(data: string, options: XmlParser.ParserOptions): MT940[] {
    let mt940arr: MT940[] = [];
    XmlParser.parseString(data, options, (error, result) => {
      const parsedRecords = result?.records?.record;
      if (parsedRecords) {
        mt940arr = parsedRecords.map((record: unknown) =>
          this.mapToMT940(record)
        );
      } else {
        throw new Error('Unable to parse the text/xml type');
      }
    });
    return mt940arr;
  }

  mapToMT940(record: any): MT940 {
    return {
      transactionReference: Number(record.attribute.reference),
      accountNumber: record.accountNumber[0],
      description: record.description[0],
      startBalance: Number(record.startBalance[0]),
      mutation: Number(record.mutation[0]),
      endBalance: Number(record.endBalance[0]),
    };
  }
}
