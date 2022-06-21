import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TransactionField } from 'src/app/models';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent {

  @Input() transactions: Array<TransactionField> = []

}
