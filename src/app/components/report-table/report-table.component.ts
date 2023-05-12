import {MatListModule} from '@angular/material/list'
import {MatTableModule} from '@angular/material/table'
import {CommonModule} from '@angular/common'
import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

import {ValidationField} from 'src/app/models'

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule],
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportTableComponent {
  @Input() transactions: ValidationField[] = []

  displayedColumns: string[] = ['transaction', 'error']
}
