/**
 * Service responsible for the mapping of a XML output to a list of MT940 Objects
 */
import { Injectable } from '@angular/core';

import * as XmlParser from 'xml2js';

import { MT940, MT940Parser } from 'src/app/models/mt940.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XMLService implements MT940Parser {

  parseToMT940List(data: string): Array<MT940> {
    let mt940arr: Array<MT940> = [];
    XmlParser.parseString(data, {
      attrkey: 'attribute'
    }, (error, result) => {
      if (result?.records?.record) {
        result.records.record.forEach((record: any) => {
          const mt940: MT940 = this.mapToMT940(record);
          mt940arr.push(mt940);
        });

      } else {
        throw new Error('Unable to parse the text/xml type');
      }
    });
    return mt940arr;
  }

  mapToMT940(record: any): MT940 {
    const mt940: MT940 = {
      transactionReference: Number(record.attribute.reference),
      accountNumber: record.accountNumber[0],
      description: record.description[0],
      startBalance: Number(record.startBalance[0]),
      mutation: Number(record.mutation[0]),
      endBalance: Number(record.endBalance[0])
    };
    return mt940;
  }
}
