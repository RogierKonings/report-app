import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTableComponent } from './report-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatTableModule, MatListModule],
  declarations: [ReportTableComponent],
  providers: [],
  exports: [ReportTableComponent],
})
export class ReportTableModule {}
