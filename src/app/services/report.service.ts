import { Injectable } from '@angular/core';

import { FileTypes } from 'src/app/models/file-types.model';
import { MT940 } from 'src/app/models/mt940.model';

import { CSVService } from 'src/app/services/csv.service';
import { XMLService } from 'src/app/services/xml.service';
import { ValidationService } from 'src/app/services/validation.service';
import { FileService } from 'src/app/services/file.service';
/**
 * Service responsible for creating a report of a MT940 validation
 */
// import { ValidationField } from 'src/app/models/transaction.model';
import {
  concatMap,
  filter,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { ReportFile, ValidationField } from '../models';
import { isValidString } from '../utils/validate.utils';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _report: ReplaySubject<Array<ValidationField>> = new ReplaySubject();

  public readonly report$: Observable<Array<ValidationField>> =
    this._report.asObservable();

  constructor(
    private csvService: CSVService,
    private xmlService: XMLService,
    private validationService: ValidationService,
    private fileService: FileService
  ) {}

  public createReport(file: File) {
    const fileContent$ = this.fileService.readFileContent(file);
    const reportFile$ = fileContent$.pipe(
      filter(reportFile => isValidString(reportFile?.fileContent)),
      switchMap(({ fileContent }) =>
        file.type === FileTypes.CSV
          ? this.csvService.parseToMT940List(fileContent as string, {
              delimiter: ',',
              hasHeader: true,
            })
          : this.xmlService.parseToMT940List(fileContent as string)
      ),
      toArray(),
      map(this.validationService.validateMT940)
    );
    const reportError$ = fileContent$.pipe(
      filter(reportFile => Boolean(reportFile?.error)),
    );

    reportFile$.subscribe(data => console.log('createReport: ', data));
    // if (!this.fileService.isSupportedType(file)) {
    //   throw new Error('Not a supported file type');
    // }
    // try {
    //   let mt940arr: Array<MT940>;
    //   const fileContent = await this.fileService.readFileContent(file);
    //   if (file.type === FileTypes.CSV) {
    //     mt940arr = this.csvService.getMT940(fileContent.target.result);
    //   }
    //   if (file.type === FileTypes.XML) {
    //     mt940arr = this.xmlService.getMT940(fileContent.target.result);
    //   }
    //   return this.validationService.validateMT940(mt940arr);
    // } catch (error) {
    //   throw new Error(`Cannot create the ${file.type} file`);
    // }
  }
}
