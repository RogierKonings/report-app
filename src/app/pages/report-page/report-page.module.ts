import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportPageComponent } from './report-page.component';

import { PageWrapperModule } from 'src/app/components/page-wrapper/page-wrapper.module';
import { FileUploadModule } from 'src/app/components/file-upload/file-upload.module';
import { ReportTableModule } from 'src/app/components/report-table/report-table.module';

@NgModule({
  imports: [
    CommonModule,
    PageWrapperModule,
    FileUploadModule,
    ReportTableModule
  ],
  declarations: [ReportPageComponent],
  providers: [],
  exports: [ReportPageComponent]
})
export class ReportPageModule {}
