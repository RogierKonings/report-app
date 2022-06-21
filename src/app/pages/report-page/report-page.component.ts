import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, take } from 'rxjs';

import { ValidationField } from 'src/app/models';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportPageComponent {
  public transactions$: Observable<ValidationField[]>;

  constructor(private reportService: ReportService) {
    this.transactions$ = this.reportService.report$;
  }

  public openFile(file: File): void {
    this.reportService.createReport(file).pipe(take(1)).subscribe();
  }
}
