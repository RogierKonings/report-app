import { Injectable } from '@angular/core';

import { FileTypes } from '../models';

import { CSVService } from './csv.service';
import { XMLService } from './xml.service';
import { ValidationService } from './validation.service';
import { FileService } from './file.service';
/**
 * Service responsible for creating a report of a MT940 validation
 */
import {
  filter,
  map,
  tap,
  Observable,
  ReplaySubject,
  switchMap,
  toArray,
} from 'rxjs';
import { ValidationField } from '../models';
import { isValidString } from '../utils/validate.utils';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _report: ReplaySubject<ValidationField[]> = new ReplaySubject();

  public readonly report$: Observable<ValidationField[]> =
    this._report.asObservable();

  constructor(
    private csvService: CSVService,
    private xmlService: XMLService,
    private validationService: ValidationService,
    private fileService: FileService
  ) {}

  public createReport(file: File): Observable<ValidationField[] | Error> {
    const fileContent$ = this.fileService.readFileContent(file);
    return fileContent$.pipe(
      tap(console.log),
      filter(fileContent => isValidString(fileContent?.content)),
      switchMap(({ content }) =>
        file.type === FileTypes.CSV
          ? this.csvService.parseToMT940List(content as string, {
              delimiter: ',',
            })
          : this.xmlService.parseToMT940List(content as string, {
              attrkey: 'attribute',
            })
      ),
      toArray(),
      map(this.validationService.validateMT940),
      tap(transactions => this._report.next(transactions))
    );
  }
}
