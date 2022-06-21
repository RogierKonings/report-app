import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTableComponent } from './report-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReportTableComponent],
  providers: [],
  exports: [ReportTableComponent]
})
export class ReportTableModule {}
