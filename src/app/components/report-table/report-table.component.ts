import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ValidationField } from 'src/app/models';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportTableComponent {

  @Input() transactions: ValidationField[] = []

}
