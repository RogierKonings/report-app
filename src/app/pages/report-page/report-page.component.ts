import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ReportFile } from 'src/app/models';
import { ReportService } from 'src/app/services/report.service';

// import { ValidationField } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportPageComponent {

  constructor(
    private reportService: ReportService
  ) {}

  public async openFile(file: File) {
    this.reportService.createReport(file);
  }
}
