import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, Observable, Subject, take } from 'rxjs';

import { ValidationField } from '../../models';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent {
  public transactions$: Observable<ValidationField[]>;

  private _error: Subject<Error> = new Subject();
  public readonly error$ = this._error.asObservable();

  constructor(private reportService: ReportService) {
    this.transactions$ = this.reportService.report$;
  }

  public openFile(file: File): void {
    this.reportService
      .createReport(file)
      .pipe(
        take(1),
        catchError((err) => {
          this._error.next(err);
          throw err;
        })
      )
      .subscribe();
  }
}
