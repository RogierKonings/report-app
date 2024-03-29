import {MT940} from 'src/app/models/mt940.model'
import {Injectable} from '@angular/core'

import {FileTypes} from '../models'

import {CSVService} from './csv.service'
import {XMLService} from './xml.service'
import {ValidationService} from './validation.service'
import {FileService} from './file.service'
/**
 * Service responsible for creating a report of a MT940 validation
 */
import {map, tap, scan, Observable, ReplaySubject, switchMap, catchError} from 'rxjs'
import {ValidationField} from '../models'

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _report: ReplaySubject<ValidationField[]> = new ReplaySubject()

  public readonly report$: Observable<ValidationField[]> = this._report.asObservable()

  public readonly allReports$: Observable<ValidationField[][]> = this._report
    .asObservable()
    .pipe(scan((acc, value) => [...(acc as never), value as never], []))

  constructor(
    private csvService: CSVService,
    private xmlService: XMLService,
    private validationService: ValidationService,
    private fileService: FileService,
  ) {}

  public createReport(file: File): Observable<ValidationField[] | Error> {
    return this.fileService.readFileContent(file).pipe(
      switchMap(({content}) =>
        file.type === FileTypes.CSV
          ? this.csvService.parseToMT940List(content, {
              delimiter: ',',
            })
          : (this.xmlService.parseToMT940List(content, {
              attrkey: 'attribute',
            }) as Observable<MT940[]>),
      ),
      map(this.validationService.validateMT940),
      tap((transactions) => this._report.next(transactions)),
      catchError((err) => {
        this.clearReport()
        throw err
      }),
    )
  }

  private clearReport(): void {
    this._report.next([])
  }
}
